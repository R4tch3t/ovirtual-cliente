import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
interface Mutation {
    matriculaPorDefecto: {
        respMatriculaPorDefecto: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

type UsuarioMatPorDef = {
    id: number;
    matricula: string | null;
}


export const matriculaPorDefectoGQL = async (user:UsuarioMatPorDef) => {
    const { data } = await client.mutate<Mutation>({
        variables:{user},
        mutation: gql`
          mutation MatriculaPorDefecto($user: UsuarioMatPorDef) {
            matriculaPorDefecto(user: $user) {
                respMatriculaPorDefecto
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
      
      return data?.matriculaPorDefecto
}