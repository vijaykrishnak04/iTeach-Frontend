import { useEffect, useRef, useState } from "react";
import socket from "../../../../Socket";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersApi } from "../../../Services/Student";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  addChatToChatList,
  addMessageToChatList,
  addYourMessageToChatList,
  fetchChatList,
} from "../../../Redux/Features/Student/ChatsSlice";

const ChatsView = () => {
  const [messages, setMessages] = useState([]);
  const [yourMessage, setYourMessage] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const studentData = useSelector((state) => state.studentData.studentData);
  const chatList = useSelector((state) => state?.studentChatData?.chatList);

  const filteredChatList = chatList.filter((user) =>
    user.teacherInfo?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp) => {
    let dateObj;

    // Check if it's a numeric timestamp
    if (typeof timestamp === "number" || /^\d+$/.test(timestamp)) {
      dateObj = new Date(Number(timestamp));
    } else {
      // Assuming it's an ISO 8601 formatted string
      dateObj = new Date(timestamp);
    }

    // Separate date and time for better formatting control
    const dateStr = dateObj.toLocaleDateString(); // default date format
    const timeStr = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // 2-digit hour and minute without seconds

    return `${dateStr} ${timeStr}`;
  };

  useEffect(() => {
    socket.emit("register", studentData._id);

    const headers = {
      Authorization: localStorage.getItem("studentToken"),
    };
    getTeachersApi(headers).then((response) => setTeachers(response.data));
    dispatch(fetchChatList(studentData._id));

    return () => {
      socket.off("recieve-message");
    };
  }, [dispatch, studentData._id]);

  useEffect(() => {
    socket.on("recieve-message", (incomingMessage) => {
      dispatch(addMessageToChatList(incomingMessage));
      if (incomingMessage.senderId === activeChat.teacherId) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }
    });
  }, [activeChat.teacherId, dispatch]);

  const handleSendMessage = () => {
    if (!activeChat || !yourMessage.trim()) return;
    const outgoingMessage = {
      recieverId: activeChat.teacherId,
      senderId: studentData._id,
      text: yourMessage,
      timestamp: Date.now(),
    };

    socket.emit("send-message", outgoingMessage);
    dispatch(addYourMessageToChatList(outgoingMessage));
    setMessages((prevMessages) => [...prevMessages, outgoingMessage]); // add to local messages
    setYourMessage(""); // clear the input field
  };

  const handleSetActiveChat = (user) => {
    const messages = user?.messages;
    setActiveChat(user);
    if (messages) setMessages(messages);
  };

  const handleNewChat = (user) => {
    dispatch(addChatToChatList(user));
    setMessages([]);
    setActiveChat(user);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTo(0, scrollHeight);
    }
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen pt-28 px-5 pb-5">
      {/* Users list */}
      <div className="w-full md:w-1/3 h-1/4 md:h-full border rounded p-4 overflow-y-auto bg-blue-50">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 rounded mb-4 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Start a new chat */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded w-full transition duration-300 shadow-md"
        >
          <FontAwesomeIcon icon={faPlus} /> Start a new chat
        </button>

        {filteredChatList.map((user) => (
          <div
            key={user.teacherId}
            onClick={() => handleSetActiveChat(user)}
            className={`cursor-pointer p-2 ${
              activeChat.teacherId === user.teacherId
                ? "bg-blue-100"
                : "hover:bg-blue-100"
            }  flex items-center transition duration-300`}
          >
            <img
              src={user.teacherInfo?.teacherImage}
              alt={user.teacherInfo?.fullName}
              className="h-10 w-10 rounded-full mr-2 shadow-sm"
            />
            {user.teacherInfo?.fullName}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="w-full md:w-2/3 h-3/4 md:h-full border rounded p-4 flex flex-col ml-0 md:ml-4 bg-blue-100">
        <div className="text-xl mb-2 flex flex-row justify-center border-b-2 border-black">
          {/* Check if there's an active chat */}
          {
            activeChat ? (
              <>
                {/* Display user's image */}
                <img
                  src={activeChat.teacherInfo?.teacherImage}
                  alt={activeChat.teacherInfo?.fullName}
                  className="h-10 w-10 rounded-full mr-2 shadow-sm"
                />
                {/* Display user's full name */}
                {activeChat.teacherInfo?.fullName}
              </>
            ) : (
              "Select a user to start chatting"
            ) /* Display message if there's no active chat */
          }
        </div>

        <div
          className="flex-1 overflow-y-scroll flex flex-col"
          ref={chatContainerRef}
        >
          {messages &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded m-2 text-black ${
                  msg.senderId === studentData._id
                    ? "bg-blue-300 ml-auto"
                    : "bg-gray-300 mr-auto"
                } transition duration-300 transform hover:scale-105`}
              >
                {msg.text}
                <div className="text-xs mt-1">{formatDate(msg.timestamp)}</div>
              </div>
            ))}
          {/* <div ref={}></div> */}
        </div>

        <div className="border-t p-2 flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded mr-2"
            value={yourMessage}
            onChange={(e) => setYourMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>

      {/* Antd Modal */}
      <Modal
        title="Select User to Start Chatting"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {teachers.map((user) => (
          <div
            key={user.teacherId}
            onClick={() => {
              handleNewChat(user);
              setIsModalOpen(false);
            }}
            className="cursor-pointer p-2 hover:bg-blue-100 flex items-center transition duration-300"
          >
            <img
              src={user.teacherInfo?.teacherImage}
              alt={user.teacherInfo?.fullName}
              className="h-10 w-10 rounded-full mr-2 shadow-sm"
            />
            {user.teacherInfo?.fullName}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default ChatsView;
