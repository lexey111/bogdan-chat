import { useCallback, useState } from "react";

export type LoginProps = {
  onConfirm: (userName: string) => void;
  isBusy: boolean;
  error: string;
};

export const Login: React.FC<LoginProps> = ({ onConfirm, isBusy, error }) => {
  const [userName, setUserName] = useState("");

  const handleLogin = useCallback(() => {
    onConfirm(userName.trim());
  }, [onConfirm, userName]);

  const handleKeydown = useCallback((e: unknown) => {
    if ((e as KeyboardEvent).code !== 'Enter') {
        return
    }

    if (!userName.trim()) {
        return
    }

    onConfirm(userName.trim());
  }, [onConfirm, userName])

  return (
    <div className="login-container card">
      <h1>µChat</h1>
      <div className="input-row">
        <input
          type="text"
          id="name"
          value={userName}
          disabled={isBusy}
          placeholder="Your name"
          onKeyDown={handleKeydown}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {Boolean(error) && <div className="login-error">{error}</div>}

      <button disabled={!userName.trim() || isBusy} onClick={handleLogin}>
        Connect
      </button>
    </div>
  );
};
