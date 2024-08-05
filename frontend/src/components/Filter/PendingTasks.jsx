import PropTypes from 'prop-types';
import { styles } from '../../styles/Filter';

const SearchBarPending = ({ name, onClearSearch }) => {
  return (
    <button
      style={styles.button}
      onClick={onClearSearch}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
        e.currentTarget.style.transform = styles.buttonHover.transform;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {name}
    </button>
  );
};

SearchBarPending.propTypes = {
  name: PropTypes.string.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBarPending;
