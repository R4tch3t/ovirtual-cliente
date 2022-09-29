import client from "..";
import { gql } from "@apollo/client";
interface Query {
    login: {
        respLogin: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

export type TipoUsuario = {
    id: number;
    uuid: string | null;
    matricula: string | null;
    avatar?: string | null;
    nombre: string | null;
    email: string;    
    online: number | null;
    activated: number | null;
    matactiva: number | null;
    lastConn: Date | null;
    alumno: TipoAlumno;
    expediente: TipoExpediente[] | null;
    vwAlumnoConPlanes: TipoVwAlumnoConPlanes[] | null
    vwAspirante: TipoVwAspirante[] | null
}

export type TipoExpediente = {
    id: number
    documentoId: number;
    validado:number
    observacionValidacion: string;
}

export type TipoDocumento = {
    id: number,
    nombre: string,
    descripcion: string
}

export type TipoAlumno = {
    cveentalu: string;
    nomentalu: string;
    apeentalu: string;
    crpentalu: string;
    mailentalu: string;
}

export type TipoVwAlumnoConPlanes = {
    PLESXUR: number,
    CVEENTESC: number,
    CVEPLNEST: number,
    VRSPLNEST: number,
    ESCUELA: string,
    PLANESTUDIOS: string,
    NIVEL: number,
    PERINIPLN: string,
    TIPOESCUELA?: number
}

export type TipoVwAspirante = {
    ID_PLAN: number,
    CLAVE_UNIDAD_ACADEMICA: number,
    CLAVE_PLAN_ESTUDIOS: number,
    VERSION_PLAN_ESTUDIOS: number,
    UA: string,
    PLANESTUDIOS: string,
    NIVEL_INGRESAR: number,
    TRAMITE_ID: number
   // PERINIPLN: string
}

export const loginGraphQL = async (email:string,password:string) => {
    const { data } = await client.query<Query>({
        variables:{email,password},
        query: gql`
          query Login($password: String!, $email: String!) {
            login(password: $password, email: $email) {
                respLogin
                msg
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
                        TIPOESCUELA
                    }
                    vwAspirante {
                        ID_PLAN
                        CLAVE_UNIDAD_ACADEMICA
                        CLAVE_PLAN_ESTUDIOS
                        VERSION_PLAN_ESTUDIOS
                        UA
                        PLANESTUDIOS
                        NIVEL_INGRESAR
                        TRAMITE_ID
                    }
                }
                token
            }
        }
        `,
      });
      
      return data.login
}