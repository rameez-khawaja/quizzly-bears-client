import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./style.css";
// import Picker from 'emoji-picker-react';

function Chat({ socket, username, room }) {
  // console.log(room, socket, username);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window card shadow">
      <div className="chat border-bottom border-primary text-primary">
      Chat <i className="fa-solid fa-comment-dots"></i>
            </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={Math.random()}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta d-flex">
                    <p className="mx-1" id="time">{messageContent.time}</p>
                    <p className="mx-1" id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="d-flex">

        <input
          type="text"
          value={currentMessage}
          placeholder="Chat... chat! chat...."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="w-100" />
        <button className="btn btn-primary" onClick={sendMessage}>Submit</button>
      </div>
    </div>
  );
}

export default Chat;
