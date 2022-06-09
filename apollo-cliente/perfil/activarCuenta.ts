import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Mutation {
    activarMatricula: {
        respLogin: boolean|null,
        respActivarMatricula: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type ActivarMatriculaInput = {
    token: string;
}


export const activarMatriculaGQL = async (user:ActivarMatriculaInput) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation ActivarMatricula($user: ActivarMatriculaInput) {
            activarMatricula(user: $user) {
                respLogin
                respActivarMatricula
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
      
      return data?.activarMatricula
}