import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
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
                        TIPOESCUELA
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