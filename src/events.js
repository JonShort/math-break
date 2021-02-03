const { contextBridge, ipcRenderer } = require("electron");

// render "listen" events
const RECEIVE_GAME_OVER = "receive-game-over";
const RECEIVE_LATEST_SCORE = "receive-latest-score";

const listenAllowlist = [RECEIVE_GAME_OVER, RECEIVE_LATEST_SCORE];

// render "send" events
const REQUEST_GAME_OVER = "request-game-over";
const REQUEST_LATEST_SCORE = "request-latest-score";

const sendAllowlist = [REQUEST_GAME_OVER, REQUEST_LATEST_SCORE];

const exposeIpcInMainWorld = () => {
  // Expose protected methods that allow the renderer process to use
  // the ipcRenderer without exposing the entire object
  contextBridge.exposeInMainWorld("ipc", {
    events: {
      RECEIVE_GAME_OVER,
      RECEIVE_LATEST_SCORE,
      REQUEST_GAME_OVER,
      REQUEST_LATEST_SCORE,
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
  REQUEST_GAME_OVER,
  REQUEST_LATEST_SCORE,
  exposeIpcInMainWorld,
  listenAllowlist,
  sendAllowlist,
};
