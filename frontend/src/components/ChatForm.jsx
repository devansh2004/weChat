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

    const handleChat = () => {
        
        if (ws?.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not connected or is in an invalid state:", ws);
        }
    };

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