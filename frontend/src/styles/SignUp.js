export const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '7rem',
      height: '75vh',
  
    },
    formWrapper: {
      width: '24rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: '"Marck Script", cursive',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '1.75rem',
      marginBottom: '1.75rem',
      textAlign: 'center',
      color: '#015f5f',
    },
    input: {
      width: '100%',
      fontSize: '0.875rem',
      backgroundColor: 'transparent',
      border: '1.5px solid #ddd',
      padding: '0.75rem 1.25rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    },
    inputFocused: {
      borderColor: '#00a896',
      boxShadow: '0 2px 8px rgba(0, 168, 150, 0.2)',
    },
    errorText: {
      color: '#ff0000',
      fontSize: '0.75rem',
      paddingBottom: '0.25rem',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      fontSize: '0.875rem',
      color: '#fff',
      padding: '0.75rem',
      borderRadius: '4px',
      marginTop: '0.25rem',
      background: 'linear-gradient(to right, #015f5f, #028090, #00a896)',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s, transform 0.2s',
    },
    buttonHovered: {
      background: 'linear-gradient(to right, #014f4f, #026080, #009080)',
      transform: 'translateY(-2px)',
    },
    linkText: {
      fontSize: '0.875rem',
      textAlign: 'center',
      marginTop: '1rem',
    },
    link: {
      fontWeight: '500',
      color: '#028090',
      textDecoration: 'underline',
    },
  };