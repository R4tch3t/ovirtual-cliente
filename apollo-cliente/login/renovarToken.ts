import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
interface Query {
    renovarToken: {
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
          query RenovarToken($tokenAnterior: String) {
            renovarToken(tokenAnterior: $tokenAnterior) {
                respRenovarToken
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
                    vwAspirante {
                        ID_PLAN
                        CLAVE_UNIDAD_ACADEMICA
                        CLAVE_PLAN_ESTUDIOS
                        VERSION_PLAN_ESTUDIOS
                        UA
                        PLANESTUDIOS
                        NIVEL_INGRESAR
                    }
                }
                uuid
                token
                msg
            }
        }
        `,
      });
      
      return data.renovarToken
}