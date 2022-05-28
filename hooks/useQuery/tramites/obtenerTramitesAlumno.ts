
import { useQuery, gql } from "@apollo/client";

export interface ObtenerTramiteAlumnoInput {
    userAlumnoId: number
    tramiteId: number
    plesxurRef: number
} 

interface Query {
    obtenerTramitesAlumno: TramiteAlumno
}

interface TramiteAlumno {
    id: number,
    estadoId: number,
    fechaCreacion: Date,
    fechaEnvioRevision: Date,
    informacionAdicional:string|null,
    visto: number,
    motivoRegresoValidacion:string|null,
    datosTramite:string
}

const QUERY = gql`
    query ObtenerTramitesAlumno($alumnoTramite: ObtenerTramiteAlumnoInput!) {
        obtenerTramitesAlumno(alumnoTramite: $alumnoTramite) {
            
            id
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

const useObtenerTramitesAlumno = (alumnoTramite:ObtenerTramiteAlumnoInput) => {
    return useQuery<Query>(QUERY,{variables:{alumnoTramite}});
}

export {useObtenerTramitesAlumno}