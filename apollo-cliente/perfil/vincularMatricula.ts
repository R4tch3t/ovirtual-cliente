import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TypeUserO } from "../../interfaces";
interface Mutation {
    vincularMatricula: {
        respVincularMatricula: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type TipoVincularMatricula = {
    id: number;
    matricula: string | null;
    email: string | null;
    name: string | null;
}


export const vincularMatriculaGQL = async (user:TipoVincularMatricula) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation VincularMatricula($user: VincularUsuario) {
            vincularMatricula(user: $user) {
                respVincularMatricula
                usuario {
                    email
                    id
                    uuid
                    matricula
                    nombre
                    password
                    online
                    matactiva
                    activated
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
      
      return data?.vincularMatricula
}