import moment from "moment";
import PropTypes from "prop-types";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import { styles } from "../../styles/TaskCard";

const TaskCard = ({ title, date, content, tags, isPinned, status, onEdit, onDelete, onPinTask }) => {
  return (
    <div 
      style={styles.taskCard}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = styles.taskCardHover.boxShadow}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = styles.taskCard.boxShadow}
    >
      <div style={styles.taskCardHeader}>
        <div>
          <h6 style={styles.taskCardTitle}>{title}</h6>
          <span style={styles.taskCardDate}>
            {date ? moment(date).format('Do MMM YYYY') : '-'}
          </span>
        </div>
        <MdOutlinePushPin 
          style={{...styles.taskCardPin, ...(isPinned ? styles.taskCardPinPinned : {})}} 
          onClick={onPinTask} 
        />
      </div>

      <p style={styles.taskCardContent}>
        {content?.slice(0, 60)}
      </p>

      <div style={styles.taskCardFooter}>
        <div style={styles.taskCardTags}>
          {tags.map((item) => `#${item} `)}
        </div>
        <div style={styles.taskCardActions}>
          <MdCreate 
            style={{...styles.taskCardActionIcon, ...styles.taskCardActionIconEdit}} 
            onClick={onEdit} 
          />
          <MdDelete 
            style={{...styles.taskCardActionIcon, ...styles.taskCardActionIconDelete}} 
            onClick={onDelete} 
          />
        </div>
      </div>

      {/* Status Display */}
      <div style={styles.taskCardStatus}>
        <span style={styles.taskCardStatusValue}>{status}</span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPinTask: PropTypes.func.isRequired,
};

export default TaskCard;
