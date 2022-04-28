import { Dispatch } from "react"

export type TypeTramite = {
    id: number,
    nombre: string|null,
    clave: string|null,
    beneficio: string|null,
    descripcion: string|null,
    necesitaValidacion: number|null,
    fechaInicialValidacion: Date|string|null,
    fechaFinalValidacion: Date|string|null
    nivelAplica: number|null,
    documentoObtiene: string|null,
    TipoTramites: [TipoTramites]|[]|null,
    tramitesModuloAtencions: TypeModuloAtencion[]|[]|null
}

export type TypeModuloAtencion = {
    id: number,
    nombre: string,
    responsable: string,
    telefono: string,
}

export type TipoTramites = {
    id: number,
    tramiteId: number,
    tipoTramite: number,
    nivelEstudios: number
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
    catSeleccionado: TypeCatTramite,
    tta:number,
    ttb:number
}

export interface TypeTramitesContext {
    tramitesState: TypeTramitesState,
    dispatch: Dispatch<TypeTramitesAction>
}