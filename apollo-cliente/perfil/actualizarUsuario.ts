import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TypeUserO } from "../../interfaces";
interface Mutation {
    actualizarUsuario: {
        respActualizarUsuario: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type TipoActualizarUsuario = {
    id: number;
    uuid: string;
    nombre: string | null;
    email: string | null;
    name: string | null;
    apellidos: string | null;
    newEmail: string | null;
    password: string | null;
}


export const actualizarUsuarioGQL = async (user:TipoActualizarUsuario) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation ActualizarUsuario($user: Usuario) {
            actualizarUsuario(user: $user) {
                respActualizarUsuario
                usuario {
                    id
                    uuid
                    nombre
                    matricula
                    email
                    password
                    online
                    activated
                    matactiva
                    lastConn
                    alumno {
                        cveentalu
                        nomentalu
                        apeentalu
                        crpentalu
                        mailentalu
                    }
                }
                token
                msg
            }
}
        `,
      });
      
      return data?.actualizarUsuario
}