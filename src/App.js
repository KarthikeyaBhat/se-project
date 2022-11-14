import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import SignupForm from "./components/Signup";
import ChomepageCard from "./components/ChomepageCard";
import Chomepage from "./components/Chomepage";
import Cart from "./components/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App(){
  return(
  <div className="App">
    <div className="App-header">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/chomepagecard" element={<ChomepageCard />} />
        <Route exact path="/chomepage" element={<Chomepage />} />
        <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </div>)
}
export default App;