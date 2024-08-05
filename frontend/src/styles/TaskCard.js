export const styles = {
  taskCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
  },
  taskCardHover: {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  taskCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  taskCardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  taskCardDate: {
    fontSize: '14px',
    color: '#888',
  },
  taskCardPin: {
    cursor: 'pointer',
    fontSize: '24px',
    color: '#ccc',
    transition: 'color 0.3s ease-in-out',
  },
  taskCardPinPinned: {
    color: '#007bff',
  },
  taskCardContent: {
    fontSize: '14px',
    color: '#444',
    marginTop: '10px',
    lineHeight: '1.5',
  },
  taskCardStatus: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#007bff', // Color matching status value
    border: '1px solid #007bff',
  },
  taskCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
  },
  taskCardTags: {
    fontSize: '12px',
    color: '#7d8c8d',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  taskCardActions: {
    display: 'flex',
    gap: '12px',
  },
  taskCardActionIcon: {
    fontSize: '22px',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
  },
  taskCardActionIconEdit: {
    color: '#28a745',
    ':hover': {
      color: '#218838',
    },
  },
  taskCardActionIconDelete: {
    color: '#dc3545',
    ':hover': {
      color: '#c82333',
    },
  },
};
