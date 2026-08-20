import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = !emailRegex.test(email);
    if (error) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
    error = !passwordRegex.test(password);

    if (error) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    localStorage.setItem('isUser', 'true');
    navigate('/home');
  }

  return (
    <div className="bg-slate-900 w-screen h-screen flex justify-center 
      items-center">
      <div className="max-w-140 min-w-120 flex items-center flex-col 
        px-8 py-8 rounded-xl border border-gray-500/50 
        bg-slate-600/40 shadow-lg gap-8">
        <h1 className="text-3xl font-bold text-pink-400">Login</h1>
        <div className="w-full flex flex-col">
          <label className="text-gray-400">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-slate-700/70 text-white w-full px-4 py-2 rounded-md mt-2
focus:outline-2 focus:outline-offset-2
${emailError ? 'border border-rose-500 focus:outline-rose-500 ' : 'focus:outline-blue-500'}`}
            placeholder="e.g., yourexample@gmail.com"
          />
          {
            emailError &&
            <div
              className="text-rose-500 mt-1">Please enter a valid email</div>
          }
        </div>
        <div className="w-full flex flex-col">
          <label className="text-gray-400">Password</label>
          <div className={`bg-slate-700/70 text-white w-full px-4 py-2 rounded-md mt-2
            focus-within:outline-2 focus-within:outline-offset-2
            flex items-center ${passwordError ? 'border-rose-500 focus-within:outline-rose-500' : 'focus-within:outline-blue-500'}`}

          >
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}

              className="outline-none w-full"
              placeholder="Please enter password(8-16)"
            />
            <FontAwesomeIcon
              onClick={() => {
                setShow(!show);
              }}
              icon={show ? faEyeSlash : faEye} />
          </div>
          {
            passwordError && <div className="text-rose-500 mt-1">
              The password must include at least 1 uppercase,
              1 lowercase, 1 number and 1 special numbers
            </div>
          }
        </div>
        <div className="w-full">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-3 rounded-xl 
            text-white font-semibold cursor-pointer
            hover:bg-blue-400 transition-colors">Login</button>
          <button className="w-full mt-4 py-3 rounded-xl bg-gray-500
            text-white font-semibold hover:bg-gray-400 transition-colors
            cursor-pointer">
            Back
          </button>
        </div>
        <div className="text-white">
          Don't have an account? <Link to='/sign-up' className="text-blue-500">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
