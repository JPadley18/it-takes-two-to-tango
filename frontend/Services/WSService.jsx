import useWebSocket from "react-use-websocket";

export default function WSService(props) {
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    `${import.meta.env.VITE_WEBSOCKET_BASE}/play/${props.id}`,
    {
      onOpen: () => console.log("Connected to server"),
      onMessage: (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      },
    }
  );
}
