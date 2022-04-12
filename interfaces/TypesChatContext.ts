import { Dispatch } from "react"

export type TypeChatAction = {
    type?: string,
    payload?: any
}

export interface TypeChatActivo {
    id: number | null,
    uuid: string | null
}

export interface TypeChatState {
    id: number,
    uuid: string | null,
    chatActivo: TypeChatActivo,
    usuarios: any[],
    mensajes: any[],
    cargando: boolean,
    topeMsjs: boolean
}

export interface TypeChatContext {
    chatState: TypeChatState,
    dispatch: Dispatch<TypeChatAction>
}