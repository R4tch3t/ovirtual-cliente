import client from "..";
import { gql } from "@apollo/client";
import { TipoNuevaNoti } from "./nuevaNotificacionMsj";

interface Mutation {
    actualizarNotificacion: boolean
}


export const actualizarNotificacionGQL = async (notiMsj: TipoNuevaNoti) => {
    await client.cache.reset()
    const { data } = await client.mutate<Mutation>({
        variables:{notiMsj},
        mutation: gql`
            mutation Mutation($notiMsj: NotiMsj) {
                actualizarNotificacionMsj(notiMsj: $notiMsj)
            }
        `,
      });
      
      return data?.actualizarNotificacion
}