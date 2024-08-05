import { useState } from "react";
import PropTypes from "prop-types";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { styles } from "../../styles/CreateTask";

const AddEditTask = ({ taskData, type, onClose, showToastMessage, getAllTasks }) => {
  const [title, setTitle] = useState(taskData?.title || "");
  const [content, setContent] = useState(taskData?.content || "");
  const [tags, setTags] = useState(taskData?.tags || []);
  const [status, setStatus] = useState(taskData?.status || "pending");
  const [error, setError] = useState(null);

  const handleTaskAction = async () => {
    const url = type === 'edit' ? `/edit-task/${taskData._id}` : "/add-task";
    const method = type === 'edit' ? 'put' : 'post';

    console.log("Payload:", { title, content, tags, status }); // Log the payload

    try {
      const { data } = await axiosInstance[method](url, { title, content, tags, status });
      if (data?.task) {
        showToastMessage(type === 'edit' ? "Task Updated Successfully" : "Task Added Successfully");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unexpected error. Try again.");
    }
  };

  const validateAndSubmit = () => {
    if (!title || !content) {
      setError("Please enter title and content");
      return;
    }
    setError("");
    handleTaskAction();
  };

  return (
    <div style={styles.container}>
      <button style={styles.closeButton} onClick={onClose}>
        <MdClose style={styles.closeIcon} />
      </button>
      <div style={styles.inputGroup}>
        <label style={styles.label}>TITLE</label>
        <input
          type="text"
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>CONTENT</label>
        <textarea
          style={styles.contentTextarea}
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div style={styles.tagsContainer}>
        <label style={styles.label}>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>STATUS</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="complete"
              checked={status === "complete"}
              onChange={({ target }) => setStatus(target.value)}
            />
            Complete
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="pending"
              checked={status === "pending"}
              onChange={({ target }) => setStatus(target.value)}
            />
            Pending
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="inProgress"
              checked={status === "inProgress"}
              onChange={({ target }) => setStatus(target.value)}
            />
            In Progress
          </label>
        </div>
      </div>
      {error && <p style={styles.errorText}>{error}</p>}
      <button style={styles.submitButton} onClick={validateAndSubmit}>
        {type === 'add' ? "ADD" : "UPDATE"}
      </button>
    </div>
  );
};

AddEditTask.propTypes = {
  taskData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.oneOf(['complete', 'pending', 'inProgress'])
  }),
  type: PropTypes.oneOf(['add', 'edit']).isRequired,
  onClose: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired,
};

export default AddEditTask;
