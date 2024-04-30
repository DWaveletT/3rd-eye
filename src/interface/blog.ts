import type { ToolId, UserId } from "./enum";

interface User {
    id: UserId,

    name: string,
    role: number,

    avatar?: string,
}

interface Tool {
    id: ToolId,
    
    name: string,
    description: string,
    banner?: string
}

export type { User, Tool };