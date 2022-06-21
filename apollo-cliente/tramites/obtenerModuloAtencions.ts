import client from "..";
import { gql } from "@apollo/client";

export type TypeModuloAtencion = {
  id: number,
  nombre: string,
  responsable: string,
  telefono: string,
}

type QUERY = {
  obtenerModuloAtencions: TypeModuloAtencion[]
}

const obtenerModuloAtencionsGQL = async (tramiteId: number) => {
    const { data } = await client.query<QUERY>({
        variables: {tramiteId},
        query: gql`
          query ObtenerModuloAtencions($tramiteId: Int!) {
            obtenerModuloAtencions(tramiteId: $tramiteId) {
              id
              nombre
              responsable
              telefono
            }
          }
        `,
      });
      return data.obtenerModuloAtencions
}

export{obtenerModuloAtencionsGQL}