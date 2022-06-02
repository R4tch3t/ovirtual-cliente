import client from "..";
import { gql } from "@apollo/client";

const obtenerCatDocumentos = async () => {
    const { data } = await client.query({
        query: gql`
          query ObtenerCatDocumentos {
            obtenerCatDocumentos {
              id
              tipoDocumentoId
              nombre
              descripcion
              clave
              activo
            }
        }
        `,
      });
      return data.obtenerCatDocumentos
}

export{obtenerCatDocumentos}