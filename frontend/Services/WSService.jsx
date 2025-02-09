import useWebSocket from "react-use-websocket";

export default function WSService(props) {
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "ws://132.145.20.25:4444/play/" + props.id,
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
