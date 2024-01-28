import { useEffect, useRef } from "react";

const useWebSocket = (socketUrl) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

    const handleOpen = () => {
      console.log("Connected to WebSocket");
    };

    const handleClose = () => {
      console.log("Disconnected from WebSocket");
    };

    const handleMessage = (event) => {
      console.log("Received message:", event.data);
    };
    const handleError = (error) => {
      console.log("Error:", error);
    };

    socketRef.current.addEventListener("open", handleOpen);
    socketRef.current.addEventListener("close", handleClose);
    socketRef.current.addEventListener("message", handleMessage);
    socketRef.current.addEventListener("error", handleError);

    // Cleanup on unmount
    return () => {
      socketRef.current.close();
    };
  }, [socketUrl]);

  const sendMessage = (message) => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
    } else {
      console.error("WebSocket not open. Cannot send message.");
    }
  };

  return { sendMessage };
};

export { useWebSocket };
