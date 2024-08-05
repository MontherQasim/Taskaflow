import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {styles} from "../../styles/LogIn"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError('');

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
          <Navbar />
          <div style={styles.container}>
      <div style={styles.formWrapper}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h4 style={styles.title}>Login</h4>

          <input
            type="text"
            placeholder="Email"
            style={{ ...styles.input, ...(isInputFocused.email && styles.inputFocused) }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsInputFocused({ ...isInputFocused, email: true })}
            onBlur={() => setIsInputFocused({ ...isInputFocused, email: false })}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsInputFocused({ ...isInputFocused, password: true })}
            onBlur={() => setIsInputFocused({ ...isInputFocused, password: false })}
          />

          {error && <p style={styles.errorText}>{error}</p>}

          <button
            type="submit"
            style={{ ...styles.button, ...(isButtonHovered && styles.buttonHovered) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Login
          </button>

          <p style={styles.linkText}>
            Not registered yet? <Link to='/signUp' style={styles.link}>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
    </>

  );
};

export default Login;