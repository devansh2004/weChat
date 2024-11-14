from django.contrib.auth.models import User
from .models import Message, MessageGroup
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 
    

# class NoteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Note
#         fields = ["id","title","content","created_at","author"]
#         extra_kwarsg = {"author":{"read_only": True}}

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "message", "created_at", "author", "group"]
        extra_kwarsg = {"author":{"read_only": True},
                         "created_at": {"read_only": True},
                         "group" : {"read_only": True}
                         }
        
class MessageGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageGroup
        fields = ["id", "group_name", "members", "created_at"]
        extra_kwarsg = {"created_at": {"read_only": True}
                         }