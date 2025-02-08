class NewLobbyService {
  async createLobby() {
    const data = await fetch("http://localhost:8080/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    return data.json();
  }
}
export default new NewLobbyService();
