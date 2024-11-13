from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import views
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

# class NoteListCreate(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)

# class NoteDelete(generics.DestroyAPIView):

#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]




class UserManagement(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        User.objects.get(username = username).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
