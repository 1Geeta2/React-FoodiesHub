import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import API from '../api/axios';

const Chat = ({ roomId = 'general' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Load chat history
    const loadHistory = async () => {
      try {
        const { data } = await API.get(`/chat/${roomId}`);
        setMessages(data.data);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadHistory();

    // Join room
    socket.emit('join-room', roomId);

    // Listen for new messages
    socket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    return () => {
      socket.off('receive-message');
    };
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    socket.emit('send-message', {
      room: roomId,
      sender: user.id,
      senderName: user.name,
      message: inputMessage
    });

    setInputMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>💬 Live Chat - {roomId}</h3>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div 
            key={msg.id || idx} 
            className={`message ${msg.sender === user.id ? 'own-message' : ''}`}
          >
            <strong>{msg.senderName}:</strong>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;