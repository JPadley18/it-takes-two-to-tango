class WSService {
  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/play/");

    this.ws.onopen = (arg) => {
      // connection opened
    };
    this.ws.onmessage = (e) => {
      // a message was received
    };
    this.ws.onerror = (e) => {
      // an error occurred
    };
    this.ws.onclose = this.logout; // function implemented elsewhere
  }
}
export default new WSService();
