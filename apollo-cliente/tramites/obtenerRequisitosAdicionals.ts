import client from "..";
import { gql } from "@apollo/client";

export type TypeRequisitoAdicional = {
  id: number,
  nombre: string,
  descripcion: string,
}

type QUERY = {
  obtenerRequisitosAdicionals: TypeRequisitoAdicional[]
}

const obtenerRequisitosAdicionalsGQL = async (tramiteId: number) => {
    const { data } = await client.query<QUERY>({
        variables: {tramiteId},
        query: gql`
          query ObtenerRequisitosAdicionals($tramiteId: Int!) {
            obtenerRequisitosAdicionals(tramiteId: $tramiteId) {
              id
              nombre
              descripcion
            }
          }
        `,
      });
      return data.obtenerRequisitosAdicionals
}

export{obtenerRequisitosAdicionalsGQL}