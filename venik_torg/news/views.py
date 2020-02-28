from django.shortcuts import render
from django.views.generic.dates import ArchiveIndexView
from django.views.generic.detail import DetailView
from news.models import New
from generic.mixins import CategoryListMixin, PageNumberMixin

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from generic.controllers import PageNumberView

# Create your views here.

class NewsListView(ArchiveIndexView, CategoryListMixin):
    model = New
    date_field = "posted"
    template_name = "news_index.html"
    paginate_by = 10
    allow_empty = True
    allow_future = True

class NewDetailView(DetailView, PageNumberMixin):
    model = New
    template_name = "new.html"


class NewCreate(SuccessMessageMixin, CreateView, CategoryListMixin):
    model = New
    fields = ['title', 'description', 'content', 'posted']
    template_name = "new_add.html"
    success_url = reverse_lazy("news_index")
    success_message = "Новость успешно создана"

class NewUpdate(SuccessMessageMixin, PageNumberView, UpdateView, PageNumberMixin):
    model = New
    fields = ['title', 'description', 'content', 'posted']
    template_name = "new_edit.html"
    success_url = reverse_lazy("news_index")
    success_message = "Новость успешно изменена"
    
class NewDelete(PageNumberView, DeleteView, PageNumberMixin):
    model = New
    fields = ['title', 'description', 'content', 'posted']
    template_name = "new_delete.html"
    success_url = reverse_lazy("news_index")
    def post(self, request, *args, **kwargs):
        messages.add_message(request, messages.SUCCESS, "Новость успешно удалена")
        return super(NewDelete, self).post(request, *args, **kwargs)
        