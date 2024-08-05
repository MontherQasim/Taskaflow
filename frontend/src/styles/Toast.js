const styles = {
    container: {
      position: 'absolute',
      top: '20px',
      right: '24px',
      transition: 'opacity 0.4s ease-in-out',
    },
    toast: {
      minWidth: '208px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      position: 'relative',
      padding: '8px 16px',
    },
    indicator: {
      width: '5px',
      height: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      borderRadius: '8px 0 0 8px',
    },
    iconContainer: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    icon: {
      fontSize: '24px',
    },
    message: {
      marginLeft: '12px',
      fontSize: '14px',
      color: '#333',
    },
    deleteIndicator: {
      backgroundColor: '#f44336',
    },
    successIndicator: {
      backgroundColor: '#4caf50',
    },
    deleteIconContainer: {
      backgroundColor: '#fce4ec',
    },
    successIconContainer: {
      backgroundColor: '#e8f5e9',
    },
    deleteIcon: {
      color: '#f44336',
    },
    successIcon: {
      color: '#4caf50',
    },
  };
  
  export default styles;
  