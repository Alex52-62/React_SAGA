import { put, delay } from "redux-saga/effects";
import { AUTHORS } from "../../utils/constants";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const ADD_MESSAGE_WITH_SAGA = "MESSAGES::ADD_MESSAGE_WITH_SAGA";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const ADD_MESSAGE_BOT = "MESSAGES::ADD_MESSAGE_BOT";

export const addMessage = (chatId, text, author) => ({
  type: ADD_MESSAGE,
  payload: { chatId, text, author },
});

export const addMessageBot = (chatId, text, author) => ({
  type: ADD_MESSAGE_BOT,
  payload: { chatId, text, author },
});

export const deleteMessage = (chatId, id) => ({
  type: DELETE_MESSAGE,
  payload: {
    chatId,
    id,
  },
});

export function* withAddMessageWithSaga(action) {
  yield put(addMessageBot(action));
  if (action.payload.author === AUTHORS.HUMAN) {
    yield delay(3500);
    const botMessage = "Hi! I'm SAGA bot!";
    yield put(addMessageBot(action.payload.chatId, botMessage, AUTHORS.bot));
  }
}
