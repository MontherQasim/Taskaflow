import PropTypes from 'prop-types';
import { styles } from "../../styles/EmptyCard";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div style={styles.container}>
      <img src={imgSrc} alt="No tasks" style={styles.image} />
      <p style={styles.message}>{message}</p>
    </div>
  );
};

EmptyCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmptyCard;
