import { Dispatch } from "react"
import { TypePaso1, TypePaso2, TypePaso3, TypePaso4, TypePaso5 } from "./pasos/homologacion"

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

export type TypeHomologacion = {
    aspiranteId: number | null,
    planID: number,
    planElegido: string,
    localidad: string,
    paso1: TypePaso1 | null,
    paso2: TypePaso2 | null,
    paso3: TypePaso3 | null
    paso4: TypePaso4 | null,
    paso5: TypePaso5 | null
}

export type TypeBajaTemporal = {
    usuarioId: number | null,
    plesXur: number,
    unidadAcademica: string,
    planElegido: string,
    periodoLectivo: string | null,
    causaBaja: string | null,
    validoParaTramitar: boolean,
}

export type TypeProcedimiento = {
    homologacion: TypeHomologacion | null,
    bajaTemporal: TypeBajaTemporal | null
}


export interface TypeTramitesState {
    tramites: TypeTramite[]|null,
    catTramites: TypeCatTramite[]|null,
    catSeleccionado: TypeCatTramite,
    tta:number,
    ttb:number,
    procedimientos: TypeProcedimiento,
    tramiteAlumnoSeleccionado: number | null
}

export interface TypeTramitesContext {
    tramitesState: TypeTramitesState,
    dispatch: Dispatch<TypeTramitesAction>
}

export interface TypeUnidadesAcademicas {
    id: number,
    claveUnidadAcademica: string,
    nombreUnidadAcademica: string,
    nombrePlanEstudios: string,
    anioPlanEstudios: number,
    nivelPlanEstudios: number,
    localidad: string,
    zonaEscolar: number,
}

export interface TypePais {
    id: number;
    abreviatura: string;
    nombrePais: string;
}