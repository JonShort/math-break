// Renderer "send" events
const REQUEST_ANSWER_CHECK = "request-answer-check";
const REQUEST_INFO = "request-info";
const REQUEST_NEW_GAME = "request-new-game";

// Renderer "listen" events
const RECEIVE_ANSWER = "receive-answer";
const RECEIVE_GAME_OVER = "receive-game-over";
const RECEIVE_INFO = "receive-info";
const RECEIVE_QUESTION = "receive-question";

module.exports = {
  RECEIVE_ANSWER,
  RECEIVE_GAME_OVER,
  RECEIVE_INFO,
  RECEIVE_QUESTION,
  REQUEST_ANSWER_CHECK,
  REQUEST_INFO,
  REQUEST_NEW_GAME,
};
