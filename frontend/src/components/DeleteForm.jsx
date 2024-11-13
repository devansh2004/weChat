import { useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";



function DeleteForm({route, method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();

        try{
            
          
            const res = await api.post(route+username+"/");
            if(method === "delete"){
                
                localStorage.clear()
                navigate("/login");
            }
        }
        catch(error){
            alert(error);
        }
        finally{
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container"> 
        <h1>Delete Account</h1>
        <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        <button className="form-button" type="submit" >
            Delete
        </button>
    </form>
}

export default DeleteForm;