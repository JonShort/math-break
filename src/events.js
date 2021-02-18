const { contextBridge, ipcRenderer } = require("electron");

// render "listen" events
const RECEIVE_GAME_OVER = "receive-game-over";
const RECEIVE_LATEST_SCORE = "receive-latest-score";
const RECEIVE_SCORES = "receive-scores";

const listenAllowlist = [
  RECEIVE_GAME_OVER,
  RECEIVE_LATEST_SCORE,
  RECEIVE_SCORES,
];

// render "send" events
const REQUEST_GAME_OVER = "request-game-over";
const REQUEST_LATEST_SCORE = "request-latest-score";
const REQUEST_SCORES = "request-scores";

const sendAllowlist = [REQUEST_GAME_OVER, REQUEST_LATEST_SCORE, REQUEST_SCORES];

const exposeIpcInMainWorld = () => {
  // Expose protected methods that allow the renderer process to use
  // the ipcRenderer without exposing the entire object
  contextBridge.exposeInMainWorld("ipc", {
    events: {
      RECEIVE_GAME_OVER,
      RECEIVE_LATEST_SCORE,
      RECEIVE_SCORES,
      REQUEST_GAME_OVER,
      REQUEST_LATEST_SCORE,
      REQUEST_SCORES,
    },
    send: (channel, data) => {
      // only allow named channels
      let validChannels = sendAllowlist;
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, func) => {
      let validChannels = listenAllowlist;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  });
};

module.exports = {
  RECEIVE_GAME_OVER,
  RECEIVE_LATEST_SCORE,
  RECEIVE_SCORES,
  REQUEST_GAME_OVER,
  REQUEST_LATEST_SCORE,
  REQUEST_SCORES,
  exposeIpcInMainWorld,
  listenAllowlist,
  sendAllowlist,
};
