import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const ChatLogin = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrMsg(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Yk Chat</span>
        <span className="title">Login</span>
        {errMsg && <div className="text-red-600">{errMsg}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button>Sign in</button>
        </form>
        <p>
          If you don't have an account. <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default ChatLogin;
