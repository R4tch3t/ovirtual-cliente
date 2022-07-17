import { Dispatch } from "react"
import { TipoNuevaNoti } from "../apollo-cliente/notificacion"

export type TypeNotiAction = {
    type?: string,
    payload?: any
}


export interface TypeNotiState {
    msjs: TipoNuevaNoti[],
    
}

export interface TypeNotiContext {
    notiState: TypeNotiState,
    dispatch: Dispatch<TypeNotiAction>
}