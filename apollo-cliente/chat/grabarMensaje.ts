import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    grabarMensaje: {
        id: string,
        mensaje: string,
        time: Date,
        readed: boolean,
        de: number,
        para: number
    }
}

export type TipoNuevoMsj = {
    de: number,
    para: number
    readed: boolean
    mensaje: string
}


export const grabarMensajeGQL = async (nuevoMsj: TipoNuevoMsj) => {
    await client?.resetStore()
    const { data } = await client.mutate<Mutation>({
        variables:{nuevoMsj},
        mutation: gql`
            mutation GrabarMensaje($nuevoMsj: NuevoMsj) {
                grabarMensaje(nuevoMsj: $nuevoMsj) {
                    id
                    mensaje
                    time
                    readed
                    de
                    para
                }
            }
        `,
      });
      
      return data?.grabarMensaje
}