import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    actualizarEstado: {
        respActualizarEstado: boolean,
        msg: string|null,
    }
}

type AspiranteInscripcion = {
    id: number;
    celular: string | null;
    correo: string | null;
}


export const actualizarEstadoGQL = async (user:AspiranteInscripcion) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation Mutation($user: AspiranteInscripcion) {
            actualizarEstado(user: $user) {
                respActualizarEstado
                msg
            }
        }
        `,
      });
      
      return data?.actualizarEstado
}