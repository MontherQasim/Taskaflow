import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import {styles} from "../../styles/SignUp";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({ name: false, email: false, password: false });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }

    } catch (error) {
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
          <form onSubmit={handleSignUp} style={styles.form}>
            <h4 style={styles.title}>Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              style={{ ...styles.input, ...(isInputFocused.name && styles.inputFocused) }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsInputFocused({ ...isInputFocused, name: true })}
              onBlur={() => setIsInputFocused({ ...isInputFocused, name: false })}
            />

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
              placeholder="Password"
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
              Create Account
            </button>

            <p style={styles.linkText}>
              Already have an account? <Link to="/login" style={styles.link}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;