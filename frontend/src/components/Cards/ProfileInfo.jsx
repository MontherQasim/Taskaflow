import PropTypes from "prop-types";
import { getInitials } from "../../utils/helper";
import { styles } from "../../styles/ProfileInfo";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) return null;

  return (
    <div style={styles.profileInfo}>
      <div style={styles.avatar}>{getInitials(userInfo.fullName)}</div>
      <div style={styles.userDetails}>
        <p style={styles.userName}>{userInfo.fullName}</p>
        <button
          style={styles.logoutLink}
          onMouseOver={(e) => {
            e.target.style.color = styles.logoutLinkHover.color;
            e.target.style.background = styles.logoutLinkHover.background;
          }}
          onMouseOut={(e) => {
            e.target.style.color = styles.logoutLink.color;
            e.target.style.background = styles.logoutLink.background;
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileInfo;
