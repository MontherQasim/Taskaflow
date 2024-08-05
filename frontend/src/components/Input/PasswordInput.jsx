import  { useState } from "react";
import PropTypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { styles } from "../../styles/Password";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div style={styles.container}>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        style={styles.input}
      />

      {isShowPassword ? (
        <FaRegEye
          style={{ ...styles.icon, ...styles.showIcon }}
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          style={{ ...styles.icon, ...styles.hideIcon }}
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default PasswordInput;
