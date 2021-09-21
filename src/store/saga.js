import { takeLatest } from "redux-saga/effects";
import { withAddMessageWithSaga } from "./messages/actions";

export function* withSaga() {
  yield takeLatest("MESSAGES::ADD_MESSAGE", withAddMessageWithSaga);
}
