import config from "./config";
import { showFPS } from "./fpsCounter";
import { socialMenuHook } from "./friendSearch";
import matchStartHook from "./matchStartHook";
import { hookTextureLoader } from "./texturePack";

hookTextureLoader();
/* Fixes pasting in firefox. */
if (!navigator.clipboard.readText) {
  navigator.clipboard.readText = function () {
    return new Promise((res) => res(prompt("Paste text now.") || ""));
  };
}
socialMenuHook();

const roomDetails = window.location.hash.substring(1);
/* Test to make sure game is fully loaded. */
const testing = setInterval(() => {
  try {
    if (
      !app ||
      !app.menu ||
      !app.menu.joinButton ||
      app.status.updating !== false ||
      !APIClient ||
      !APIClient.postCreateGame
    )
      return;
  } catch {
    return;
  }
  clearInterval(testing);

  App.Console.log("Loading NinjaIOUtils...");
  if (app.credential.accounttype == "guest")
    alert("NinjaIOUtils works best when you are logged in!");

  showFPS();
  matchStartHook();
}, 50);
