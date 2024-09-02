import { useEffect, useRef } from "react";
import { Message } from "../../types";
import "./Chat.styles.css";

type ChatProps = {
  messages?: Message[];
};

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages?.length]);

  return (
    <div className="chat-container" ref={containerRef}>
      <div className="chat-content">
        {(messages || []).map((msg) => {
          return (
            <div key={msg.user + "_" + msg.sendAt} className="message-wrapper">
              <div className="message-author">{msg.user}</div>
              <div className="message-content">{msg.message}</div>
              <div className="message-time">{msg.sendAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
