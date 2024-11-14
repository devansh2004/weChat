from django.db import models
from django.contrib.auth.models import User



# Create your models here.

# class Note(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

#     def __str__(self):
#         return self.title



class MessageGroup(models.Model):
    group_name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='MessageGroups')
    created_at = models.DateTimeField(auto_now_add=True)
    
    

    def __str__(self):
        return self.group_name



class Message(models.Model):
    message = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, related_name="author", on_delete=models.SET_NULL, null=True)
    group = models.ForeignKey(MessageGroup, related_name="author", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.message
    

