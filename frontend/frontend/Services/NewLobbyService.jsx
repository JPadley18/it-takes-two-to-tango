class NewLobbyService {
  constructor() {
    this.url = "http://localhost:8080/start";
  }

  createLobby() {
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }
}
export default new NewLobbyService();
