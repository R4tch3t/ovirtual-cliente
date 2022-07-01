import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    actualizarEstado: {
        respActualizarEstado: boolean,
        msg: string|null,
        urlActivar: string|null,
        linkGenerarPago: string|null,
        urlTramite: string|null,
        password: string|null,
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
                urlActivar
                linkGenerarPago
                urlTramite
                password
            }
        }
        `,
      });
      
      return data?.actualizarEstado
}