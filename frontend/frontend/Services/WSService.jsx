export default class WSService {
  constructor(id) {
    this.id = id;
    this.ws = new WebSocket("ws://localhost:8080/play/" + id);
    this.ws.onopen = () => {
      console.log("Connected to server");
    };
  }
}
