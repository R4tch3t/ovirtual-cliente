import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TipoMensaje } from "./obtenerChat";

interface Query extends TipoUsuario {
    obtenerUsuarios:  NewUserChat[]
}

interface NewUserChat extends TipoUsuario {
    lastMsg: TipoMensaje
}


export const obtenerUsuariosGQL = async () => {
    const { data } = await client.query<Query>({
        
        query: gql`
          query ObtenerUsuarios {
            obtenerUsuarios {
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
        `,
      });
      
      return data.obtenerUsuarios
}