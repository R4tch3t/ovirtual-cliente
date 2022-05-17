import client from "..";
import { gql } from "@apollo/client";

interface Query {
    obtenerChat: {
        respObtenerChat: boolean,
        mensajes: TipoMensaje[]|null,
        de: number
    }
}

export type TipoMensaje = {
    id: string;
    mensaje: string | null;
    time: Date | null;
    readed: boolean | null;
    de: number;
    para: number;
}


export const obtenerChatGQL = async (id:number,de:number,skip:number,take:number) => {
    await client?.resetStore()
    const { data } = await client.query<Query>({
        variables:{id,de,skip,take},
        query: gql`
          query ObtenerChat($id: Int!,$de: Int!, $skip: Int!, $take: Int!) {
            obtenerChat(id: $id, de: $de, skip: $skip, take: $take) {
            respObtenerChat
                mensajes {
                    id
                    mensaje
                    time
                    readed
                    de
                    para
                }
                de
            }
        }
        `,
      });
      
      return data.obtenerChat
}