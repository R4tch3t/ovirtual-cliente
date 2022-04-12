import { Dispatch } from "react"

export type TypeTramite = {
    id: number,
    nombre: string,
    clave: string,
    beneficio: string,
    descripcion: string,
    necesitaValidacion: number|null,
    fechaInicialValidacion: Date|null,
    fechaFinalValidacion: Date|null
}

export type TypeCatTramite = {
    id: number,
    nombre: string
}

export type TypeTramitesAction = {
    type?: string,
    payload?: any
}



export interface TypeTramitesState {
    tramites: TypeTramite[]|null,
    catTramites: TypeCatTramite[]|null,
    catSeleccionado: TypeCatTramite
}

export interface TypeTramitesContext {
    tramitesState: TypeTramitesState,
    dispatch: Dispatch<TypeTramitesAction>
}