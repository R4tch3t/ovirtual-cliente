import { Dispatch } from "react"
import { TypePaso1, TypePaso2, TypePaso3, TypePaso4, TypePaso5 } from "./pasos/preregistro"

export interface TypeTramite {
    id: number,
    nombre: string|null,
    clave: string|null,
    beneficio: string|null,
    descripcion: string|null,
    necesitaValidacion: number|null,
    fechaInicialValidacion: Date|string|null,
    fechaFinalValidacion: Date|string|null
    nivelAplica: string|null,
    documentoObtiene: string|null,
    TipoTramites: [TipoTramites]|[]|null,
    //tramitesModuloAtencions: TypeModuloAtencion[]|[]|null,
    //tramitesFormatoDescargables: TypeFormatoDescargable[]|[]|null,
    //tramitesRequisitoAdicionals: TypeRequisitoAdicional[]|[]|null,
    nivelEstudio: string | null,

}


/*export type TypeRequisitoAdicional = {
    id: number,
    nombre: string,
    descripcion: string,
   // documento: string,
}

export type TypeFormatoDescargable = {
    id: number,
    nombre: string,
    descripcion: string,
   // documento: string,
}*/

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

export type TypePreregistro = {
    aspiranteId: number | null,
    planID: number,
    planElegido: string,
    nivelIngresar: number,
    tramiteId: number | null,
    localidad: string,
    paso1: TypePaso1 | null,
    paso2: TypePaso2 | null,
    paso3: TypePaso3 | null
    paso4: TypePaso4 | null,
    paso5: TypePaso5 | null
}

type HeadTramite = {
    usuarioId: number | null,
    plesXur: number,
    unidadAcademica: string,
    planElegido: string,
}

export interface TypeBajaTemporal extends HeadTramite {
    periodoLectivo: string | null,
    causaBaja: string | null,
    validoParaTramitar: boolean,
}

export interface TypeInscripcion extends HeadTramite {
    validoParaTramitar: boolean,
}

export interface TypeHomologacion extends HeadTramite {
    planIngresarId: number,
    telefono: string | null,
    validoParaTramitar: boolean,
}

export type TypeDocumento = {
    id: number|null;
    tipoDocumentoId: number;
    nombre: string | null;
    descripcion: string | null;
    clave: string | null;
    activo: number | null;
}

export type TypeProcedimiento = {
    preregistro: TypePreregistro | null,
    bajaTemporal: TypeBajaTemporal | null,
    inscripcion: TypeInscripcion | null,
    homologacion: TypeHomologacion | null,
}

type ProcesoConfirmacion = {
    bandera?: boolean,
    urlPDF?: string
}
export interface TypeTramitesState {
    procesoConfirmacionCompleto: ProcesoConfirmacion|null,
    tramites: TypeTramite[]|null,
    catTramites: TypeCatTramite[]|null,
    catSeleccionado: TypeCatTramite,
    catNivelEstudio: string|null,
    documentos: TypeDocumento[]|null,
    procedimientos: TypeProcedimiento,
    tramiteAlumnoSeleccionado: number | null,
    nombreTramiteSeleccionado: string | null
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