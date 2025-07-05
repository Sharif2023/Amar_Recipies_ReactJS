import React, { useState } from 'react';

const ChatModal = ({ isOpen, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);

  // Function to send the message
  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      setUserInput('');

      setTimeout(() => {
        const botResponse = 'This is a response from the chatbot.';
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      }, 500);
    }
  };

  if (!isOpen) return null;  // Hide modal if not open

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div
    className="fixed bottom-4 right-4 w-90 bg-white shadow-2xl rounded-lg max-w-lg  z-50"
    id="chat-container"
  >
    <div className="p-4 border-b bg-red-500 text-white rounded-t-lg flex justify-between items-center">
      <p className="text-lg font-semibold">Admin Chat</p>
      <button
        onClick={onClose} // Use onClose to close the chat
        className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="p-4 h-80 overflow-y-auto">
      {messages.map((msg, i) => (
        <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
          <p className={`${msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg py-2 px-4 inline-block`}>
            {msg.text}
          </p>
        </div>
      ))}
    </div>

    <div className="p-4 border-t flex">
      <input
        type="text"
        placeholder="Type a message"
        value={userInput}
        onChange={handleUserInputChange}
        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleSendMessage}
        className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition duration-300"
      >
        Send
      </button>
    </div>
  </div>
  );
};

export default ChatModal;
