import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";
import { TipoMensaje } from "./obtenerChat";

interface Query {
    obtenerUsuario:  {
        usuario: TipoUsuario
    }
}




export const obtenerUsuarioGQL = async (id:number) => {
    const { data } = await client.query<Query>({
        variables:{id},        
        query: gql`
          query ObtenerUsuario($id: Int!) {
            obtenerUsuario(id: $id) {
                usuario{
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
                        
                }
            }
        }
        `,
      });
      
      return data.obtenerUsuario
}