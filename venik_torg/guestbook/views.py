from django.shortcuts import render, redirect
from django.contrib import messages
from guestbook.models import Guestbook
from guestbook.forms import GuestbookForm
from django.views.generic.dates import ArchiveIndexView
from generic.mixins import CategoryListMixin


# Create your views here.

class GuestbookView(ArchiveIndexView, CategoryListMixin):
    model = Guestbook
    date_field = "posted"
    template_name = "guestbook.html"
    paginate_by = 2
    allow_empty = True
    form = None
    def get(self, request, *args, **kwargs):
        self.form = GuestbookForm
        return super(GuestbookView, self).get(request, *args, **kwargs)
    def get_context_data(self, **kwargs):
        context = super(GuestbookView, self).get_context_data(**kwargs)
        context["form"] = self.form
        return context
    def post(self, request, *args, **kwargs):
        self.form = GuestbookForm(request.POST)
        if self.form.is_valid():
            if self.form.cleaned_data["honeypot"] == "":
                self.form.save()
                messages.add_message(request, messages.SUCCESS, "Запись успешно добавлена в гостевую книгу")
            return redirect("guestbook")
        else:
            return super(GuestbookView, self).get(request, *args, **kwargs)