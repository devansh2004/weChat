    import { useState } from "react";
    import api from "../api";
    import { Navigate, useNavigate } from "react-router-dom";
    import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";



    function HomeForm(){
        const navigate = useNavigate();

        const handleLogout = () => {
            localStorage.clear()
            navigate("/login");
        };

        const handleDeleteAccount = () => {
            navigate("/delete"); 
        };

        const handleChat = () => {
            navigate("/chat"); 
        };

        return <div> 
            <button className="form-button" onClick={handleLogout}  style={{padding: "1px 12px", fontSize: "12px"}}>
                Logout
            </button>
            <button className="form-button" onClick={handleDeleteAccount} style={{padding: "1px 16px", fontSize: "12px"}}>
                Delete Account
            </button>
            <button className="form-button" onClick={handleChat} style={{padding: "1px 16px", fontSize: "12px"}}>
                Chat
            </button>
        </div>
            
            

    }

    export default HomeForm;