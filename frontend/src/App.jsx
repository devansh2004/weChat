import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute'
import DeleteUser from './pages/DeleteUser'
import { WebSocketProvider } from './components/WebSocketContext'
import Chat from './pages/Chat'

function Logout(){
  localStorage.clear();
  return <Navigate to="/login"/>;
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {

  return (

      <BrowserRouter> 
      <WebSocketProvider>
        <Routes>
          <Route 
            path="/"
            element ={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/delete"
            element ={
              <ProtectedRoute>
                <DeleteUser />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/chat"
            element ={
              <ProtectedRoute>
                <Chat/>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element ={ <Login />}/>
          <Route path="/logout" element ={ <Logout />}/>
          <Route path="/register" element ={ <RegisterAndLogout />}/>
          <Route path="*" element ={ <NotFound />}/>

          

        </Routes>
        </WebSocketProvider>
      </BrowserRouter>

  )
}

export default App
