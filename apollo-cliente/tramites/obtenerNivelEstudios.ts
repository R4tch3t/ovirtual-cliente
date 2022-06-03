import client from "..";
import { gql } from "@apollo/client";

export interface TipoNivelEstudio {
  id: number,
  nombre: string,
  descripcion: string,
  activo: number,
  claveNivel: number
}

type QUERY = {
  obtenerNivelEstudios: TipoNivelEstudio[]
}

const obtenerNivelEstudios = async () => {
    const { data } = await client.query<QUERY>({
        query: gql`
          query ObtenerNivelEstudios {
            obtenerNivelEstudios {
              id
              nombre
              descripcion
              activo
              claveNivel
            }
        }
        `,
      });
      return data.obtenerNivelEstudios
}

export{obtenerNivelEstudios}