import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Mutation {
    vincularOusuario: {
        respVincularOUsuario: boolean,
        respNewOuser: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

export type VincularOUsuarioInput = {
    emailO: string;
    name: string | null;
    matricula: string;
}


export const vincularOusuarioGQL = async (nuevoUsuario:VincularOUsuarioInput) => {
    const { data } = await client.mutate<Mutation>({
        variables:{nuevoUsuario},
        mutation: gql`
          mutation VincularOusuario($nuevoUsuario: VincularOUsuarioInput) {
            vincularOusuario(nuevoUsuario: $nuevoUsuario) {
                respVincularOUsuario
                respNewOuser
                token
                msg
            }
        }
        `,
      });
      
      return data?.vincularOusuario
}