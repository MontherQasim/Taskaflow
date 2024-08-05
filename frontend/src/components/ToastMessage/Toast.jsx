import { useEffect } from "react";
import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import styles from "../../styles/Toast"; 

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div style={{ ...styles.container, opacity: isShown ? 1 : 0 }}>
      <div style={styles.toast}>
        <div style={{ ...styles.indicator, backgroundColor: type === "delete" ? styles.deleteIndicator.backgroundColor : styles.successIndicator.backgroundColor }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ ...styles.iconContainer, backgroundColor: type === "delete" ? styles.deleteIconContainer.backgroundColor : styles.successIconContainer.backgroundColor }}>
            {type === "delete" ? (
              <MdDeleteOutline style={{ ...styles.icon, color: styles.deleteIcon.color }} />
            ) : (
              <LuCheck style={{ ...styles.icon, color: styles.successIcon.color }} />
            )}
          </div>
          <p style={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['delete', 'success']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;