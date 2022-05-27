import { useQuery, gql } from "@apollo/client";
import { TypeUnidadesAcademicas } from "../../interfaces";
import { TipoLocalidades } from "./localidades";

export interface QueryPreregistro {
    preregistroPorCurp: {
        aspirante: TipoAspirante,
        aspRegistro: TipoAspRegistro,
        aspDomiciliarios: TipoAspDomiciliarios,
        aspMulticulturalidad: TipoAspMulticulturalidad,
        aspSocioEconomicos: TipoAspSocioEconomicos
    }
}
export type TipoAspirante = {
    id: number | undefined | null;
    paisId: number | null | undefined;
    curp: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    telefonoCelular: string;
    telefonoParticular: string | null;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    correoElectronico: string;
    estado: number;
    nacionalidad: string;
}

export type TipoAspRegistro = {
    id: number | undefined | null;
    aspiranteId: number | undefined | null;
    planOfertadoId: number;
    nivelIngresar: number;
    egresadoUagro: number | null;
    claveEscuelaUagro: string | null;
    nombreEscuelaProcedencia: string | null;
    matricula: string | null;
    claveUnicaRegistro: string | undefined | null;
    ciclo: number | null;
    consecutivoPlesxures: number | null;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    cancelado: number;
    folioCeneval: number | null;
    estado: number;
    referencia: string | null;
    planOfertado: TypeUnidadesAcademicas | null;
}

export type TipoAspDomiciliarios = {
    id: number;
    aspiranteIdId: number | null;
    localityId: number;
    calleActual: string;
    numExteriorActual: string;
    numInteriorActual: string | null;
    coloniaActual: string;
    codigoPostalActual: number;
    locality: TipoLocalidades;
}

export type TipoAspMulticulturalidad = {
    id: number;
    puebloOriginarioIdId: number | null;
    discapacidadIdId: number | null;
    aspiranteIdId: number | null;
    pertenecePuebloOriginario: number;
    tieneDiscapacidad: number;
    afroMexicanoGuerrerense: number;
    residenteSierraGuerrero: number;
    hijoMigranteGuerrerense: number;
}

export type TipoAspSocioEconomicos = {
    id: number;
    aspiranteIdId: number;
    tipoEmpleoMadre: number;
    tipoEmpleoPadre: number;
    promedioIngresoMensual: number;
    porcentajeIngresoGastoFam: number | null;
    porcentajeFamIngresosMens: number | null;
    gastoPersonalSemanal: number;
    trabaja: number;
}

const QUERY = gql`
    query PreregistroPorCurp($curp: String!) {
        preregistroPorCurp(curp: $curp) {
            aspirante {
                id
                paisId
                curp
                nombre
                apellidoPaterno
                apellidoMaterno
                telefonoParticular
                telefonoCelular
                fechaCreacion
                fechaActualizacion
                correoElectronico
                estado
                nacionalidad
            }
            aspRegistro {
                id
                aspiranteId
                planOfertadoId
                nivelIngresar
                egresadoUagro
                claveEscuelaUagro
                nombreEscuelaProcedencia
                matricula
                claveUnicaRegistro
                ciclo
                consecutivoPlesxures
                fechaCreacion
                fechaActualizacion
                cancelado
                folioCeneval
                estado
                referencia
                planOfertado {
                    id
                    claveUnidadAcademica
                    clavePlanEstudios
                    versionPlanEstudios
                    nombreUnidadAcademica
                    nombrePlanEstudios
                    anioPlanEstudios
                    periodoInicioPlan
                    fechaInicioPreregistro
                    fechaFinPreregistro
                    fechaInicioRegistro
                    fechaFinRegistro
                    nivelPlanEstudios
                    localidad
                    zonaEscolar
                    pdfRevisionDoctos
                    pdfAceptados
                }
            }
            aspDomiciliarios {
                id
                aspiranteIdId
                localityId
                calleActual
                numExteriorActual
                numInteriorActual
                coloniaActual
                codigoPostalActual
                locality {
                    id
                    municipioId
                    clave
                    nombre
                    claveMunicipio
                    ambito
                    claveCarta
                    claveEntidad
                    municipio {
                        id
                        entidadFederativaId
                        clave
                        nombre
                        claveCabecera
                        nombreCabecera
                        entidadFederativa {
                            id
                            nombre
                            abreviatura
                        }
                    }
                }
            }
            aspMulticulturalidad {
                id
                puebloOriginarioIdId
                discapacidadIdId
                aspiranteIdId
                pertenecePuebloOriginario
                tieneDiscapacidad
                afroMexicanoGuerrerense
                residenteSierraGuerrero
                hijoMigranteGuerrerense
            }
            aspSocioEconomicos {
                id
                aspiranteIdId
                tipoEmpleoMadre
                tipoEmpleoPadre
                promedioIngresoMensual
                porcentajeIngresoGastoFam
                porcentajeFamIngresosMens
                gastoPersonalSemanal
                trabaja
            }
    }
}
`;

const usePreregistroPorCurp = (curp:string) => {
    return useQuery<QueryPreregistro>(QUERY,{variables:{curp}});
}

export {usePreregistroPorCurp}