import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TipoMensaje } from "./obtenerChat";

interface Query extends TipoUsuario {
    pageUsuarios:  {
        usuarios: NewUserChat[]
    }
}

interface NewUserChat extends TipoUsuario {
    lastMsg: TipoMensaje
}


export const pageUsuariosGQL = async (skip:number,take:number) => {
    const { data } = await client.query<Query>({
        variables:{skip,take},        
        query: gql`
          query PageUsuarios($skip: Int!, $take: Int!) {
            pageUsuarios(skip: $skip, take: $take) {
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
            }
        }
        `,
      });
      
      return data.pageUsuarios
}