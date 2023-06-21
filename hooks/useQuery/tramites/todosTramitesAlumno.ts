
import { useQuery, gql } from "@apollo/client";
import { TipoRequisitos } from "../../../apollo-cliente/tramites/obtenerRequisitos";
import { TypeTramite } from "../../../interfaces";

export interface TodosTramiteAlumnoInput {
    userAlumnoId: number
}

interface Query {
    todosTramitesAlumno: TramiteAlumno[]
}

export interface TramiteAlumno {
    id: number,
    tramiteId:  number,
    plesxurRef: number,
    estadoId: number,
    fechaCreacion: Date,
    fechaEnvioRevision: Date,
    informacionAdicional:string|null,
    visto: number,
    uuid:string,
    motivoRegresoValidacion:string|null,
    datosTramite:string,
    tramite: TypeTramite,
    requisitos: TipoRequisitos[]
}

const QUERY = gql`
    query TodosTramitesAlumno($alumnoTramite: ObtenerTramiteAlumnoInput!) {
        todosTramitesAlumno(alumnoTramite: $alumnoTramite) {
            
            id
            tramiteId
            plesxurRef
            estadoId
            fechaCreacion
            fechaActualizacion
            fechaEnvioRevision
            informacionAdicional
            visto
            uuid
            motivoRegresoValidacion
            datosTramite
            tramite {
                nombre
                nombreCorto
                clave
                beneficio
                necesitaValidacion
                fechaFinalValidacion
                fechaInicialValidacion
                requiereFirmaElectronica
                publicoDirigido
                fechaCreacion
                fechaActualizacion
                documentoObtiene
                costo
                descripcion
                nivelAplica
                unidadResponsableId
                tiempoValidezDocumento
                validado
                procedimientoModulo
                procedimientoEnlinea
                tramitePublicado
                tramiteGratis
                website
                fundamentoLegal
                condiciones
                tiempoRespuesta
            }
            requisitos {
                id
                descripcion
                numeroCopias
                requiereOriginal
                activo
                documento {
                    id
                    tipoDocumentoId
                    nombre
                    descripcion
                    estadoId
                    clave
                    activo
                }
            }
        }
}
`;

const useTodosTramitesAlumno = (alumnoTramite:TodosTramiteAlumnoInput) => {
    
    return useQuery<Query>(QUERY,{variables:{alumnoTramite}});
}

export {useTodosTramitesAlumno}