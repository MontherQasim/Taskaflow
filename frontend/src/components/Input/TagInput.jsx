import { useState } from "react";
import PropTypes from "prop-types";
import { MdAdd, MdClose } from "react-icons/md";
import { styles } from "../../styles/TagInput";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div style={styles.container}>
      {tags.length > 0 && (
        <div style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              # {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                style={styles.removeButton}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags"
          style={styles.input}
        />

        <button
          onClick={addNewTag}
          style={styles.addButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
        >
          <MdAdd style={styles.addButtonIcon} />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;
