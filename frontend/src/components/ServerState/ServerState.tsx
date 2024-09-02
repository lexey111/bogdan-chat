import { User } from "../../types"
import './ServerState.styles.css'

export type ServerStateProps = {
    users?: User[]
    currentUser?: string
}

export const ServerState:React.FC<ServerStateProps> = ({users, currentUser}) => {
    return <div>
        {(users || []).map(user => {
            return <div className={"user-container" + (user.name === currentUser? ' active' : '')} key={user.name}>
               <div className="user-name">{user.name}</div>
               <div className="user-connected-time">{user.connectedAt}</div>
            </div>
        })}
    </div>
}