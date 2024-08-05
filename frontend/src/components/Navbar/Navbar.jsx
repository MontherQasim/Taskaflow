import PropTypes from 'prop-types';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchBarPending from '../Filter/PendingTasks'; 
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate, Link } from 'react-router-dom';
import { styles } from '../../styles/Navbar';

const Navbar = ({ userInfo, handleClearSearch1, handleClearSearch2, handleClearSearch3, onSearchTask,onSearchTask2 }) => {
  const isToken = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchTask2(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    onSearchTask2(''); // Clear the search results when the search query is cleared
  };

  return (
    <div style={styles.navbar}>
      <Link to="/" style={styles.link}>
        <span style={styles.span}>Taskaflow</span>
      </Link>
      {isToken && (
        <div style={styles.content}>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            style={styles.searchBar} 
          />
          <SearchBarPending name="All tasks" onClearSearch={() => onSearchTask('')} />
          <SearchBarPending name="Pending Tasks" onClearSearch={handleClearSearch1} />
          <SearchBarPending name="Completed Tasks" onClearSearch={handleClearSearch2} />
          <SearchBarPending name="In Progress Tasks" onClearSearch={handleClearSearch3} />
          <ProfileInfo style={styles.profileInfo} userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object,
  onSearchTask: PropTypes.func.isRequired,
  onSearchTask2: PropTypes.func.isRequired,

  handleClearSearch1: PropTypes.func.isRequired,
  handleClearSearch2: PropTypes.func.isRequired,
  handleClearSearch3: PropTypes.func.isRequired,
};

export default Navbar;
