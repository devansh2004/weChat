from django.urls import path
from . import views

urlpatterns = [
    path("message/", views.CreateMessage.as_view(), name="create-message"),
    path("createGroup/", views.CreateGroup.as_view(), name="create-group"),
    

]