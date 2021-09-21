import { ADD_CHAT, DELETE_CHAT } from "./actions";

const initialState = {
  chats: [
    { name: "chat1", id: "chat-1" },
    { name: "Chat 2", id: "chat-2" },
  ],
};

export const chatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHAT: {
      return {
        ...state,
        chats: [...state.chats, { id: `chats-${Date.now()}`, name: payload }],
      };
    }
    case DELETE_CHAT: {
      const newChats = state.chats.filter(({ id }) => id !== payload);
      return {
        ...state,
        chats: newChats,
      };
    }
    default:
      return state;
  }
};
