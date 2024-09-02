import { useCallback, useRef } from "react";
import "./Message.styles.css";

type MessageProps = {
  onSend: (message: string) => void;
  isBusy: boolean;
};

export const Message: React.FC<MessageProps> = ({ onSend, isBusy }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(() => {
    const text = inputRef.current?.value;
    if (!text) {
      return;
    }

    onSend(text);

    if (inputRef.current) {
        inputRef.current.value = ''
    }
  }, [onSend]);

  const handleKeydown = useCallback((e: unknown) => {
    if ((e as KeyboardEvent).code !== 'Enter') {
        return
    }

    handleSend();
  }, [handleSend])

  return (
    <div className="message-container">
      <div className="message-field">
        <input type="text" placeholder="Type message..." onKeyDown={handleKeydown} ref={inputRef} />
        <button onClick={handleSend} disabled={isBusy}>
          Send
        </button>
      </div>
    </div>
  );
};
