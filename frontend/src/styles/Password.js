export const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: '1.5px solid #d1d5db', 
      borderRadius: '0.375rem', // Rounded corners
      padding: '0 1.25rem', // Padding to match px-5
      marginBottom: '0.75rem', // Margin to match mb-3
    },
    input: {
      flex: 1, // Make the input take up the remaining space
      fontSize: '0.875rem', // Font size to match text-sm
      backgroundColor: 'transparent',
      padding: '0.75rem', // Padding to match py-3
      border: 'none',
      outline: 'none',
      borderRadius: '0.375rem', // Rounded corners
      marginRight: '0.75rem', // Margin to match mr-3
    },
    icon: {
      cursor: 'pointer',
      fontSize: '1.375rem', // Font size to match size={22}
    },
    showIcon: {
      color: '#0d6efd', // Primary color for FaRegEye
    },
    hideIcon: {
      color: '#6c757d', // Slate-400 color for FaRegEyeSlash
    },
  };