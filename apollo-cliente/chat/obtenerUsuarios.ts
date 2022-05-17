import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TipoMensaje } from "./obtenerChat";

interface Query extends TipoUsuario {
    obtenerUsuarios:  NewUserChat[]
}

interface NewUserChat extends TipoUsuario {
    lastMsg: TipoMensaje
}

/*type TipoMensaje = {
    id: string;
    mensaje: string | null;
    time: Date | null;
    readed: boolean | null;
    de: number;
    para: number;
}*/


export const obtenerUsuariosGQL = async () => {
    //await client.resetStore()
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