import React, { useState } from "react";
import { ChatListView } from "./ChatListView";

export const ChatListContainer = ({ chats, onAddChat }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChat(value);
    setValue("");
  };

  return (
    <ChatListView
      chats={chats}
      value={value}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
