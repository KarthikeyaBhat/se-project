import React, { useState, setState } from 'react';
import "./Login.css";
import { Link,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/chomepage");
  }, [user, loading]);

  function ClickLogo() {
    let path = `/`;
    navigate(path);
  }
  return (
    <div className="outer">
      <h1 className="logo" onClick={ClickLogo}>Wave Delivery</h1>
      <div className="box">
        <div class="row">
          <div class="column">
            <div className="login1">
              Please enter your Email and password to login
            </div>
            <div className="phone">
              <input type="text" placeholder="Email" className="fields" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-icons1">
              <i className="fa fa-envelope icon">
              </i>
              <input className="fields"
                type="password"
                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
            </div>
            <div className="loginButton" >
              <button type="submit" className="cont1" onClick={()=>logInWithEmailAndPassword(email,password)}>
                Login
              </button>
            <div className="loginButton">
              <button className="google" onClick={signInWithGoogle}>Login with Google</button>
            </div>
            <div className='lo-link'>
              Don't have an account? <Link to="/signup">Register</Link> now.
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login