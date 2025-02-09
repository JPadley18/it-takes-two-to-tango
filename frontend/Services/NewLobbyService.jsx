class NewLobbyService {
  async createLobby() {
    const data = await fetch("http://tango.sherv.co.uk:4444/start", {
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
