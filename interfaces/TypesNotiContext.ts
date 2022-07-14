import { Dispatch } from "react"

export type TypeNotiAction = {
    type?: string,
    payload?: any
}

export interface TypeNotiState {
    id: number,
    de: number,
    para: number,
    nMsj: number,
    leida: number,
    fechaCreacion: Date | null,
}

export interface TypeNotiContext {
    notiState: TypeNotiState,
    dispatch: Dispatch<TypeNotiAction>
}