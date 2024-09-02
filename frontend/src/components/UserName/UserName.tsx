import './UserName.styles.css'

export type UserNameProps = {
  user?: string;
  onLogout: () => void;
  connectedAt?: string;
};

export const UserName: React.FC<UserNameProps> = ({
  user,
  connectedAt,
  onLogout,
}) => {
  if (!user) {
    return <div>No user</div>;
  }

  return (
    <div className="current-user-container">
      <div className="current-user-content">
        <div className="current-user-name">{user}</div>
        <div className="current-user-connected">{connectedAt}</div>
      </div>

      <div className="current-user-actions">
        <button className={'danger'} onClick={onLogout}>Exit</button>
      </div>
    </div>
  );
};
