import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Mutation {
    actualizarContra: {
        respActualizarContra: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type TipoActualizarContra = {
    id: number;
    password: string | null;
    passwordN: string | null;
    passwordC: string | null;
}


export const actualizarContraGQL = async (user:TipoActualizarContra) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation ActualizarContra($user: UsuarioContra) {
            actualizarContra(user: $user) {
                respActualizarContra
                usuario {
                    id
                    uuid
                    matricula
                    nombre
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
      
      return data?.actualizarContra
}