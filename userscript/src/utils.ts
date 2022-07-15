import type { Socket } from "socket.io-client";

/* Small funtion to test if you are in a game. */
export const inGame = () =>
  app.matchStarted && app.client.socket && app.client.socket.readyState == WebSocket.OPEN;

/* Store your game information in the URL. */
export function setHash(id: string, name: string, pass: string) {
  window.location.hash = pass
    ? `${id}&${encodeURIComponent(name)}&${encodeURIComponent(pass)}`
    : `${id}&${encodeURIComponent(name)}`;
}

export function io(url: string) {
  return (window as any).io(url) as Socket;
}
