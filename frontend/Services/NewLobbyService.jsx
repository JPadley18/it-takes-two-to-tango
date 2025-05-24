class NewLobbyService {
  async createLobby() {
    const data = await fetch(
      "http://tango.sherv.co.uk:8080/start?creator=" + localStorage.username,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    return data.json();
  }
}
export default new NewLobbyService();
