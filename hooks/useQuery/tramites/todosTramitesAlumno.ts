
import { useQuery, gql } from "@apollo/client";
import { TipoRequisitos } from "../../../apollo-cliente/tramites/obtenerRequisitos";

interface TodosTramiteAlumnoInput {
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
    motivoRegresoValidacion:string|null,
    datosTramite:string,
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
            motivoRegresoValidacion
            datosTramite
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