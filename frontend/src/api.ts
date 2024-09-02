import { Message, User } from "./types";

const server = import.meta.env.VITE_SERVER;
const port = import.meta.env.VITE_PORT;

const loginEndpoint = `http://${server}:${port}/login`;
const logoutEndpoint = `http://${server}:${port}/logout`;

const usersEndpoint = `http://${server}:${port}/users`;

const sendMessageEndpoint = `http://${server}:${port}/message`;
const getMessagesEndpoint = `http://${server}:${port}/message`;

export const tryLoginToServer = async (name: string): Promise<{ name: string, connectedAt: string } | null> => {
    let result
    console.log('login', name);

    try {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })

        const data: User = await response.json()

        console.log('Server response', data);

        if (!data || !data.name) {
            throw new Error('Invalid data!')
        }

        result = {
            name: data.name,
            connectedAt: data.connectedAt
        }
    } catch (e) {
        console.error(e);
        result = null
    }
    return result
}

export const tryLogout = async (name?: string): Promise<void> => {
    console.log('logout', name);
    if (!name) {
        return
    }

    try {
        await fetch(logoutEndpoint, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })

    } catch (e) {
        console.error(e);
    }
}

export const getUsers = async (): Promise<User[] | null> => {
    let result

    try {
        const response = await fetch(usersEndpoint, {
            method: "GET",
        })

        const data = await response.json()

        if (!data || !data.users) {
            throw new Error('Invalid data!')
        }

        result = data.users
    } catch (e) {
        console.error(e);
        result = null
    }
    return result
}

export const sendMessage = async (name: string, message: string): Promise<boolean> => {
    let result = true

    try {
        const response: any = await fetch(sendMessageEndpoint, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name , message})
        })

        if (response.error) {
            console.log('Error:', response.error);
            result = false
        }
    } catch (e) {
        console.error(e);
        result = false
    }
    return result
}

export const getMessages = async (): Promise<Message[] | null> => {
    let result

    try {
        const response = await fetch(getMessagesEndpoint, {
            method: "GET",
        })

        const data = await response.json()

        if (!data || !data.messages) {
            throw new Error('Invalid data!')
        }

        result = data.messages
    } catch (e) {
        console.error(e);
        result = null
    }
    return result
}
