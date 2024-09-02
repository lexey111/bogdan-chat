export type User = {
    name: string
    connectedAt: string
}

export type Message = {
    user: string
    sendAt: string
    message: string
}

export type AppState = {
    currentUserName: string
    connectedAt: string

    users: User[]

    chat: Message[]
}