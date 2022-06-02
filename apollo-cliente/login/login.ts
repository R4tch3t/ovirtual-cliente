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
    nombre: string | null;
    email: string;
    password: string;
    online: number | null;
    activated: number | null;
    matactiva: number | null;
    lastConn: Date | null;
    alumno: TipoAlumno;
    expediente: TipoExpediente[] | null;
    vwAlumnoConPlanes: TipoVwAlumnoConPlanes[] | null
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
    PERINIPLN: string
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
            }
        }
        `,
      });
      
      return data.login
}