import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    eliminarDocumento: {
        respEliminarDocumento: boolean,
        msg: string|null,
    }
}

type TipoExpediente = {
    id: number;
}


export const eliminarDocumentoGQL = async (expediente:TipoExpediente) => {
    const { data } = await client.mutate<Mutation>({
        variables:{expediente},
        mutation: gql`
            mutation EliminarDocumento($expediente: DelExpediente) {
                eliminarDocumento(expediente: $expediente) {
                    respEliminarDocumento
                    msg
                }
            }
        `,
      });
      
      return data?.eliminarDocumento
}