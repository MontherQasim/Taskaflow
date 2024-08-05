import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { styles } from "../../styles/Search";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search Tasks"
        value={value}
        onChange={onChange}
        style={styles.input}
      />

      {value && (
        <IoMdClose
          style={{ ...styles.icon, ...styles.closeIcon }}
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        style={styles.icon}
        onClick={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
