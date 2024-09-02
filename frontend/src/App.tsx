import { useCallback, useEffect, useState } from "react";
import {
  getUsers,
  tryLoginToServer,
  tryLogout,
  sendMessage,
  getMessages,
} from "./api";
import "./App.css";
import { Chat, Login, Message, ServerState, UserName } from "./components";
import { AppState } from "./types";

function App() {
  const [appState, setAppState] = useState<AppState | null>(null);

  const [busy, setBusy] = useState(false);

  const [loginError, setLoginError] = useState("");

  const tryLogin = useCallback(async (userName: string) => {
    setBusy(true);
    setLoginError("");

    const response = await tryLoginToServer(userName);

    if (response) {
      setBusy(false);

      setAppState(() => {
        return {
          currentUserName: response.name,
          connectedAt: response.connectedAt,
          users: [],
          chat: [],
        };
      });
    } else {
      setBusy(false);
      setLoginError("Server error");
    }
  }, []);

  const isLoggedIn = Boolean(appState?.currentUserName);

  const updateUsers = useCallback(async () => {
    if (!appState?.currentUserName) {
      return;
    }
    const users = await getUsers();

    setAppState((state) => {
      if (
        !users ||
        users.length === 0 ||
        !users.find((u) => u.name === state?.currentUserName)
      ) {
        console.log("User not found!");
        console.log("users", users);
        console.log("current user", state?.currentUserName);

        return null;
      }

      return {
        ...state!,
        users: [...users],
      };
    });
  }, [appState?.currentUserName]);

  const updateMessages = useCallback(async () => {
    if (!appState?.currentUserName) {
      return;
    }
    const messages = await getMessages();

    setAppState((state) => {
      if (!messages) {
        return {
          ...state!,
          chat: [],
        };
      }

      return {
        ...state!,
        chat: [...messages],
      };
    });
  }, [appState?.currentUserName]);

  useEffect(() => {
    void updateUsers();
    void updateMessages();
  }, [updateMessages, updateUsers]);

  useEffect(() => {
    const int = setInterval(() => {
      void updateUsers();
      void updateMessages();
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [updateUsers, updateMessages]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      console.log(">> message", message);
      setBusy(true);

      await sendMessage(appState?.currentUserName || "", message);

      setTimeout(() => {
        setBusy(false);
      }, 200);
    },
    [appState?.currentUserName]
  );

  if (!isLoggedIn) {
    return (
      <div className="main-app-login">
        <Login onConfirm={tryLogin} isBusy={busy} error={loginError} />
      </div>
    );
  }

  return (
    <div className="main-app">
      <div className="side-panel card">
        <div className="card-content">
          <ServerState users={appState?.users} currentUser={appState?.currentUserName} />
        </div>
      </div>

      <div className="main-panel card">
        <div className="chat-wrapper">
          <UserName
            user={appState?.currentUserName}
            connectedAt={appState?.connectedAt}
            onLogout={() => void tryLogout(appState?.currentUserName)}
          />

          <Chat messages={appState?.chat} />

          <Message onSend={handleSendMessage} isBusy={busy} />
        </div>
      </div>
    </div>
  );
}

export default App;
