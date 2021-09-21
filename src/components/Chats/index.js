import { useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Message } from "../Message";
import { AUTHORS } from "../../utils/constants";
import { Form } from "../Form";
import { ChatListContainer } from "../ChatList/ChatListContainer.js";
import { addChat, deleteChat } from "../../store/chats/actions";
import { selectIfChatExists } from "../../store/chats/selectors";
import { addMessage } from "../../store/messages/actions";

export function Chats() {
  const { chatId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);
  const chats = useSelector((state) => state.chats.chats);

  const selectChatExists = useMemo(() => selectIfChatExists(chatId), [chatId]);

  const chatExists = useSelector(selectChatExists);

  const sendMessage = useCallback(
    (text, author) => {
      dispatch(addMessage(chatId, text, author));
    },
    [chatId, dispatch]
  );

  const handleAddMessage = useCallback(
    (text) => {
      sendMessage(text, AUTHORS.HUMAN);
    },
    [sendMessage]
  );

  const handleAddChat = useCallback(
    (name) => {
      dispatch(addChat(name));
    },
    [dispatch]
  );

  const handleDeleteChat = useCallback(
    (id) => {
      dispatch(deleteChat(id));

      if (chatId !== id) {
        return;
      }

      if (chats.length === 1) {
        history.push(`/chats/${chats[0].id}`);
      } else {
        history.push(`/chats`);
      }
    },
    [chatId, dispatch, chats, history]
  );

  return (
    <div className="App">
      <ChatListContainer
        chats={chats}
        onAddChat={handleAddChat}
        onDeleteChat={handleDeleteChat}
      />
      {!!chatId && chatExists && (
        <>
          {(messages[chatId] || []).map((message) => (
            <Message key={message.id} text={message.text} id={message.id} />
          ))}
          <Form onSubmit={handleAddMessage} />
        </>
      )}
    </div>
  );
}

export default Chats;
