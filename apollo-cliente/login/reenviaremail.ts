import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Query {
    reenviaremail: {
        respReenviaremail: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type TipoResentUsuario = {
    email: string;
    matricula: string | null;
}


export const reenviaremailGraphQL = async (user:TipoResentUsuario) => {
    const { data } = await client.query<Query>({
        variables:{user},
        query: gql`
          query Reenviaremail($user: ResentUser!) {
            reenviaremail(user: $user) {
                respReenviaremail
                msg
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
            }
        }
        `,
      });
      
      return data?.reenviaremail
}