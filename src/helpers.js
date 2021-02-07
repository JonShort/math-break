const { contextBridge } = require("electron");

const exposeHelpersInMainWorld = () => {
  contextBridge.exposeInMainWorld("helpers", {
    replaceText: (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    },
  });
};

module.exports = {
  exposeHelpersInMainWorld,
};
