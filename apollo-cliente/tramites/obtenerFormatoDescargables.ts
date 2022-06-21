import client from "..";
import { gql } from "@apollo/client";

export type TypeFormatoDescargable = {
  id: number,
  nombre: string,
  descripcion: string,
}

type QUERY = {
  obtenerFormatoDescargables: TypeFormatoDescargable[]
}

const obtenerFormatoDescargablesGQL = async (tramiteId: number) => {
    const { data } = await client.query<QUERY>({
        variables: {tramiteId},
        query: gql`
          query ObtenerFormatoDescargables($tramiteId: Int!) {
            obtenerFormatoDescargables(tramiteId: $tramiteId) {
              id
              nombre
              descripcion
            }
          }
        `,
      });
      return data.obtenerFormatoDescargables
}

export{obtenerFormatoDescargablesGQL}