import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
interface Mutation {
    newOuser: {
        respNewOuser: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

export type TipoNuevoUsuario = {
    email: string;
    name: string | null;
}


export const newOuserGraphQL = async (nuevoUsuario:TipoNuevoUsuario) => {
    const { data } = await client.mutate<Mutation>({
        variables:{nuevoUsuario},
        mutation: gql`
          mutation NewOuser($nuevoUsuario: NuevoOUsuario) {
            newOuser(nuevoUsuario: $nuevoUsuario) {
                respNewOuser
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
                    expediente {
                        id
                        documentoId
                        observacionValidacion
                        userAlumnoId
                        validado
                    }
                    vwAlumnoConPlanes {
                        PLESXUR
                        CVEENTESC
                        CVEPLNEST
                        VRSPLNEST
                        ESCUELA
                        PLANESTUDIOS
                        NIVEL
                        PERINIPLN
                    }
                }
                token
                msg
            }
        }
        `,
      });
      
      return data?.newOuser
}