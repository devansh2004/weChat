import { useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { WebSocketContext } from "./WebSocketContext";
import { useContext } from "react";



function ChatForm(){
    const navigate = useNavigate();
    const ws = useContext(WebSocketContext)
    const [message, setMessage] = useState("");

    const handleInputChange = (event) => {
        setMessage(event.target.value); 
    }

    const handleChat = async() => {


        try {
            const res = await api.post("/api/message/", { 'message': message, 'group': 'global' });
            
            if (res.status === 200) {
                alert("Message sent");
            } else {
                alert("Unexpected response: " + res.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("You are not authorized to send messages to this group");
            } else {
                console.error("An error occurred:", error);
                alert("Failed to send the message due to a network or server error.");
            }
    };
}

    ws.onmessage = function(e){
        let data = JSON.parse(e.data)
        console.log("data ----> ", data)
    }


    return <div> 
            Messages:
            <div id='messages'></div>
            <input type='text' placeholder='Send a message' value = {message} onChange={handleInputChange}></input>
            <button className="form-button" onClick={handleChat} style={{padding: "1px 16px", fontSize: "12px"}}>
                Chat
            </button>
         </div>
        
        

}



export default ChatForm;