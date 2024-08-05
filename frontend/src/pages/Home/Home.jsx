import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import TaskCard from "../../components/Cards/TaskCard";
import Modal from "react-modal";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddEditTasks from "./AddEditTask";
import axiosInstance from "../../utils/axiosInstance";
import { MdAdd } from "react-icons/md";
import AddTasksImg from "../../assets/images/add-tasks.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import { styles } from "../../styles/Home";

const Home = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const navigate = useNavigate();

  const handleEdit = (taskDetails) => {
    setOpenAddEditModal({ isShown: true, data: taskDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/get-all-tasks");
      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const deleteTask = async (data) => {
    const taskId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-task/${taskId}`);
      if (response.data && !response.data.error) {
        showToastMessage("Task Deleted Successfully", "delete");
        getAllTasks();
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const updateIsPinned = async (taskData) => {
    const taskId = taskData._id;
    try {
      const response = await axiosInstance.put(`/update-task-pinned/${taskId}`, {
        isPinned: !taskData.isPinned,
      });
      if (response.data && response.data.task) {
        showToastMessage("Task Pinned/Unpinned Successfully", "update");
        getAllTasks();
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const updateStatus = async (taskData, newStatus) => {
    const taskId = taskData._id;
    try {
      const response = await axiosInstance.put(`/update-task-status/${taskId}`, {
        status: newStatus,
      });
      if (response.data && response.data.task) {
        showToastMessage("Task Status Updated Successfully", "update");
        getAllTasks();
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearSearch1 = async () => {
    setIsSearch(false);
    try {
      const response = await axiosInstance.get("/fetch-tasks-by-status", {
        params: { status: "pending" },
      });
      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearSearch2 = async () => {
    setIsSearch(false);
    try {
      const response = await axiosInstance.get("/fetch-tasks-by-status", {
        params: { status: "complete" },
      });
      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearSearch3 = async () => {
    setIsSearch(false);
    try {
      const response = await axiosInstance.get("/fetch-tasks-by-status", {
        params: { status: "inProgress" },
      });
      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };
  const onSearchTask = async (query) => {
    try {
      const response = await axiosInstance.get("/search-tasks", {
        params: { query },
      });
      if (response.data && response.data.tasks) {
        setIsSearch(true);
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getAllTasks();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchTask={getAllTasks}
        onSearchTask2={onSearchTask}
        handleClearSearch1={handleClearSearch1}
        handleClearSearch2={handleClearSearch2}
        handleClearSearch3={handleClearSearch3}
      />

      <div style={styles.container}>
        {isSearch && <h3 style={styles.heading}>Search Results</h3>}
        {allTasks.length > 0 ? (
          <div style={styles.grid}>
            {allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                content={item.content}
                date={item.createdOn}
                tags={item.tags}
                status={item.status}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteTask(item)}
                onPinTask={() => updateIsPinned(item)}
                onUpdateStatus={(newStatus) => updateStatus(item, newStatus)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddTasksImg}
            message={
              isSearch
                ? `Oops! No tasks found matching your search.`
                : `Start creating your first task! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
      </div>
      <button
        style={styles.button}
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{ overlay: styles.modalOverlay, content: styles.modalContent }}
        contentLabel="Add/Edit Task Modal"
      >
        <AddEditTasks
          type={openAddEditModal.type}
          taskData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          showToastMessage={showToastMessage}
          getAllTasks={getAllTasks}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
