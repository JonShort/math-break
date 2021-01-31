const { contextBridge, ipcRenderer } = require("electron");
const {
  RECEIVE_ANSWER,
  RECEIVE_GAME_OVER,
  RECEIVE_INFO,
  RECEIVE_QUESTION,
  REQUEST_ANSWER_CHECK,
  REQUEST_INFO,
  REQUEST_NEW_GAME,
} = require("./constants/events");

contextBridge.exposeInMainWorld("events", {
  RECEIVE_ANSWER,
  RECEIVE_GAME_OVER,
  RECEIVE_INFO,
  RECEIVE_QUESTION,
  REQUEST_ANSWER_CHECK,
  REQUEST_INFO,
  REQUEST_NEW_GAME,
});

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipc", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      "request-new-game",
      "request-answer-check",
      "request-info",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, func) => {
    let validChannels = [
      "receive-answer",
      "receive-game-over",
      "receive-info",
      "receive-question",
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
