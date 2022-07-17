import client from "..";
import { gql } from "@apollo/client";

interface Query {
    obtenerNotificaciones: {
        respObtenerNotis: boolean,
        notiMensajes: TipoNotificacion[],        
    }
}

export type TipoNotificacion = {
    id: string;
    de: number;
    para: number;
    count: number;
    readed: number;
    titulo: string;
    mensaje: string;
    time: Date;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}


export const obtenerNotisGQL = async (de:number,para:number) => {
    await client.cache.reset()
    const { data } = await client.query<Query>({
        variables:{de,para},
        query: gql`
          query ObtenerNotificaciones($de: Int!, $para: Int!) {
            obtenerNotificaciones(de: $de, para: $para) {
                respObtenerNotis
                notiMensajes {
                    id
                    de
                    para
                    count
                    readed
                    titulo
                    mensaje
                    time
                    fechaCreacion
                    fechaActualizacion
                }
            }
        }
        `,
      });
      
      return data?.obtenerNotificaciones
}