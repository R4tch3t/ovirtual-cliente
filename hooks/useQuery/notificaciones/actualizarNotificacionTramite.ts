
import { useQuery, gql } from "@apollo/client";

export interface NotiTramiteIn {
    idUser: number
    idTramite: number | null
} 

interface Query {
    actualizarNotificacionTramite: [NewNotiTramite]
}

export interface NewNotiTramite {
    id: number
    idUser: number
    idTramite: number
    readed: number
    estado: number
    titulo: string
    mensaje: string
    uuid: string
    fechaCreacion: Date
    fechaActualizacion: Date
}


const QUERY = gql`
    query ActualizarNotificacionTramite($notiTramite: NotiTramiteIn) {
        actualizarNotificacionTramite(notiTramite: $notiTramite) {
            id
            idUser
            idTramite
            readed
            estado
            titulo
            mensaje
            uuid
            fechaCreacion
            fechaActualizacion
        }
    }
`;

const useActualizarNotificacionTramite = (notiTramite:NotiTramiteIn) => {
    return useQuery<Query>(QUERY,{variables:{notiTramite}});
}

export {useActualizarNotificacionTramite}