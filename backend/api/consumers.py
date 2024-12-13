import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print("client connected")
        self.room_group_name = "global"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name 
        )


        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        pass
    def receive(self, text_data):
        # user = self.scope["user"]  
        # if user.is_authenticated:
        #     print(f"User {user.username} connected!")
        # print(json.loads(text_data))

        text_data_json = json.loads(text_data)
        message = text_data_json

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                'type' : "chatMessage",
                'message' : message

            }
        )

    def chatMessage(self, event):
        
        message = event['message']

        self.send(json.dumps({
        'type' : "chat",
        'message' : message

        }))
