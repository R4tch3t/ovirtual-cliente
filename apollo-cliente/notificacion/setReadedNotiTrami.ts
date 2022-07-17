import client from "..";
import { gql } from "@apollo/client";
import { NotiTramiteIn } from "../../hooks/useQuery/notificaciones";

interface Mutation {
    setReadedNotiTrami: boolean
}


export const setReadedNotiTramiGQL = async (notiTramite: NotiTramiteIn) => {
   // await client.cache.reset()
    const { data } = await client.mutate<Mutation>({
        variables:{notiTramite},
        mutation: gql`
            mutation SetReadedNotiTrami($notiTramite: NotiTramiteIn) {
                setReadedNotiTrami(notiTramite: $notiTramite)
            }
        `,
      });
      
      return data?.setReadedNotiTrami
}