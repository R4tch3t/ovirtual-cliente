import client from "..";
import { gql } from "@apollo/client";
interface Query {
    login: {
        ok: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

export type TipoUsuario = {
    id: number;
    uuid: string | null;
    matricula: string | null;
    nombre: string | null;
    password: string;
    online: number | null;
    activated: number | null;
    matactiva: number | null;
    lastConn: Date | null;
}

export const loginGraphQL = async (email:string,password:string) => {
    const { data } = await client.query<Query>({
        variables:{email,password},
        query: gql`
          query Login($password: String!, $email: String!) {
            login(password: $password, email: $email) {
                ok
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
      
      return data.login
}