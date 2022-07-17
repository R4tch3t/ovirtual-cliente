import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    nuevaNotificacion: number
}

export type TipoNuevaNoti = {
    id: string
    de: number,
    para: number
    count: number
    readed: number
    titulo: string
    mensaje: string
    time: Date | null

}


export const nuevaNotificacionGQL = async (notiMsj: TipoNuevaNoti) => {
    await client.cache.reset()
    const { data } = await client.mutate<Mutation>({
        variables:{notiMsj},
        mutation: gql`
            mutation Mutation($notiMsj: NotiMsj) {
                nuevaNotificacionMsj(notiMsj: $notiMsj)
            }
        `,
      });
      
      return data?.nuevaNotificacion
}