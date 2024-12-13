from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import views
from .serializers import UserSerializer, MessageSerializer, MessageGroupSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from .models import Message, MessageGroup
from django.contrib.auth import authenticate

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




class DeleteUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        print("request-----> " , request)
        User.objects.get(id = request.user.id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CreateMessage(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        data = request.data
       # print('feilds ---->', MessageGroup._meta.get_fields())
        if(data['group'] not in list(MessageGroup.objects.values_list('group_name', flat=True))):
            return Response(status=status.HTTP_204_NO_CONTENT)

        groupId = MessageGroup.objects.get(group_name = data['group']).id
        if(request.user in MessageGroup.objects.get(id = groupId).members.all()):


            Message.objects.create(
            message= data['message'],
            author = request.user,
            group= MessageGroup.objects.get(id = groupId)
            )
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CreateGroup(generics.CreateAPIView):
    queryset = MessageGroup.objects.all()
    serializer_class = MessageGroupSerializer
    permission_classes = [AllowAny]
