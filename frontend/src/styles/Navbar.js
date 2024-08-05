export const styles = {
  navbar: {
    background: 'linear-gradient(to right, rgba(1, 95, 95, 0.8), rgba(2, 128, 144, 0.8), rgba(0, 168, 150, 0.8))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    color: 'white',
    fontFamily: "'Open Sans', sans-serif",
    borderBottom: '2px solid rgba(255, 255, 255, 0.8)', // Added semi-transparent border
  },
  link: {
    fontFamily: "Marck Script",
    letterSpacing: "2px",
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#fff',
    textDecoration: 'none',
    margin: '0 1rem',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#00a896',
      transform: 'scale(1.05)',
    },
  },
  span: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '2px groove rgba(255, 255, 255, 0.8)', // Semi-transparent border
    background: 'linear-gradient(to right, rgba(1, 95, 95, 0.8), rgba(2, 128, 144, 0.8), rgba(0, 168, 150, 0.8))',
    color: 'white',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  searchBar: {
    marginRight: '2rem',
    flexGrow: 1,
    minWidth: '350px',
    borderRadius: '0.5rem',
    border: '1px solid rgba(204, 204, 204, 0.6)', // Semi-transparent border
    padding: '0.5rem',
  },
  profileInfo: {
    marginLeft: '2rem',
  },
  button: {
    backgroundColor: '#fff',
    color: '#015f5f',
    border: '2px solid #015f5f',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: '#015f5f',
      color: '#fff',
    },
  },
};