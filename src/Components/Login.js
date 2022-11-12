import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useNavigate();
  const submitHandler= (e) =>{
    e.preventDefault();
    console.log(email);
    console.log(password);
    axios.post("http://localhost:8080/login",{
        email: email,
        password: password
      }).then((res) =>{
        console.log(res);
        console.log(res.data);
        if(res.data === ""){
          toast("Please enter valid email or password");
          console.log("please enter valid email")
        }
        else{
          history("/dashboard");
        }
      })
  }
  return (
    <>
        <div className=" mt-3 w-50 p-3 badge bg-dark text-wrap position-absolute top-0 start-50 translate-middle-x">
          <h2 class="fw-bolder">Admin Login</h2>
          <form className="form-control">
        <div className="mb-4">
          <label>
            Username
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) =>{setemail(e.target.value)}}
            
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>{setpassword(e.target.value)}}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitHandler}>
          Submit
        </button>
      </form>
        </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </>
  );
};
export default Login;
