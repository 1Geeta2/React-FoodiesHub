import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import API from "../api/axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const roomId = "support-room"; // Default support room

  useEffect(() => {
    if (!user) return;

    // Connect socket
    socket.connect();
    setIsConnected(true);

    // Load chat history
    loadChatHistory();

    // Join room
    socket.emit("join-room", roomId);

    // Listen for new messages
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    // Cleanup
    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, []);

  const loadChatHistory = async () => {
    try {
      const { data } = await API.get(`/chat/${roomId}`);
      setMessages(data.data);
      scrollToBottom();
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    socket.emit("send-message", {
      room: roomId,
      sender: user.id,
      senderName: user.name,
      message: inputMessage,
    });

    setInputMessage("");
  };

  if (!user) {
    return (
      <div className="chat-page">
        <h2>Please login to use chat</h2>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>💬 Customer Support Chat</h2>
          <span className={isConnected ? "status-online" : "status-offline"}>
            {isConnected ? "● Online" : "○ Offline"}
          </span>
        </div>

        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div
              key={msg.id || idx}
              className={`message ${msg.sender === user.id ? "own-message" : "other-message"}`}
            >
              <div className="message-header">
                <strong>{msg.senderName}</strong>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-content">{msg.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="message-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send 📤
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;