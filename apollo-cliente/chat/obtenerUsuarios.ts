import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TipoMensaje } from "./obtenerChat";

interface Query extends TipoUsuario {
    obtenerUsuarios:  {
        usuarios: NewUserChat[]
        total: number
        totalConectados: number
    }
}

interface NewUserChat extends TipoUsuario {
    lastMsg: TipoMensaje
}


export const obtenerUsuariosGQL = async (skip:number,take:number) => {
    const { data } = await client.query<Query>({
        variables:{skip,take},        
        query: gql`
          query ObtenerUsuarios($skip: Int!, $take: Int!) {
            obtenerUsuarios(skip: $skip, take: $take) {
                usuarios{
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
                        lastMsg {
                            id
                            mensaje
                            time
                            readed
                            de
                            para
                        }
                }
                total
                totalConectados
            }
        }
        `,
      });
      
      return data.obtenerUsuarios
}