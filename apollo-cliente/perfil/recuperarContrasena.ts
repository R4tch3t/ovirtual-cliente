import client from "..";
import { gql } from "@apollo/client";
interface Mutation {
    recuperarContrasena: {
        respRecuperarContrasena: boolean,
        msg: string|null,
    }
}

type TipoRecuperarContrasena = {
    email: string | null;
}


export const recuperarContrasenaGQL = async (user:TipoRecuperarContrasena) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
            mutation RecuperarContrasena($user: recuperarUsuario) {
                recuperarContrasena(user: $user) {
                    respRecuperarContrasena
                    msg
                }
            }
        `,
      });
      
      return data?.recuperarContrasena
}