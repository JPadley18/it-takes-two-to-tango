class NewLobbyService {
  async createLobby() {
    const data = await fetch("http://132.145.20.25:4444/start", {
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
