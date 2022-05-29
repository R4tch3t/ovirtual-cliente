
import { useQuery, gql } from "@apollo/client";

interface TodosTramiteAlumnoInput {
    userAlumnoId: number
}

interface Query {
    todosTramitesAlumno: TramiteAlumno[]
}

interface TramiteAlumno {
    id: number,
    tramiteId:  number,
    plesxurRef: number,
    estadoId: number,
    fechaCreacion: Date,
    fechaEnvioRevision: Date,
    informacionAdicional:string|null,
    visto: number,
    motivoRegresoValidacion:string|null,
    datosTramite:string
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
            
        }
    }
`;

const useTodosTramitesAlumno = (alumnoTramite:TodosTramiteAlumnoInput) => {
    return useQuery<Query>(QUERY,{variables:{alumnoTramite}});
}

export {useTodosTramitesAlumno}