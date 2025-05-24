class NewLobbyService {
  async createLobby() {
    const data = await fetch(
      `${import.meta.env.VITE_API_BASE}/start?creator=${localStorage.username}`,
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
