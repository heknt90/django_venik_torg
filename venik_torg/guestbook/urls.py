from guestbook.views import GuestbookView
from django.urls import path


urlpatterns = [
    path('', GuestbookView.as_view(), name = "guestbook"),
]