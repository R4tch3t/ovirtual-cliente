import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Mutation {
    newUser: {
        respNewUser: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type TipoNuevoUsuario = {
    email: string;
    matricula: string | null;
}


export const newUserGraphQL = async (nuevoUsuario:TipoNuevoUsuario) => {
    const { data } = await client.mutate<Mutation>({
        variables:{nuevoUsuario},
        mutation: gql`
          mutation NewUser($nuevoUsuario: NuevoUsuario) {
            newUser(nuevoUsuario: $nuevoUsuario) {
                respNewUser
                usuario {
                    id
                    uuid
                    matricula
                    nombre
                    email                    
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
                    expediente {
                        id
                        documentoId
                        observacionValidacion
                        userAlumnoId
                        validado
                    }
                }
                token
                msg
            }
        }
        `,
      });
      
      return data?.newUser
}