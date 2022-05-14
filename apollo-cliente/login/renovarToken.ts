import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
interface Query {
    revonarToken: {
        respRenovarToken: boolean;
        usuario:TipoUsuario|null;
        uuid: string;
        token: string;
        msg: string;
    }
}

export type TipoRenovarUsuario = {
    id: number;
    uuid: string | null;
    email: string;
}

export const renovarTokenGraphQL = async (tokenAnterior:string) => {
    const { data } = await client.query<Query>({
        variables:{tokenAnterior},
        query: gql`
          query RevonarToken($tokenAnterior: String) {
            revonarToken(tokenAnterior: $tokenAnterior) {
                respRenovarToken
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
                uuid
                token
                msg
            }
        }
        `,
      });
      
      return data.revonarToken
}