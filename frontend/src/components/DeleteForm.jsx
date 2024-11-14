import { useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";



function DeleteForm({route, method}){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        
        try{
            
            const res = await api.delete(route, ).then((req) => {
                if(req.status === 204){
                    alert("deleted account")
                }
                else{
                    alert("error")
                }
            });
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
        <button className="form-button" type="submit" >
            Delete
        </button>
    </form>
}

export default DeleteForm;