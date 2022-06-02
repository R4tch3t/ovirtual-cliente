import client from "..";
import { gql } from "@apollo/client";
import { TypeDocumento } from "../../interfaces";

export interface TipoRequisitos {
  id: number,
  descripcion: string,
  numeroCopias: number,
  requiereOriginal: number;
  archivoMuestra: string;
  activo: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  documento: TypeDocumento;
}

type QUERY = {
  obtenerRequisitos: TipoRequisitos[]
}

const obtenerRequisitosGQL = async (tramiteId: number) => {
    const { data } = await client.query<QUERY>({
        variables: {tramiteId},
        query: gql`
          query ObtenerRequisitos($tramiteId: Int!) {
            obtenerRequisitos(tramiteId: $tramiteId) {
              id
              tramiteId
              descripcion
              numeroCopias
              requiereOriginal
              activo
              fechaCreacion
              fechaActualizacion
              archivoMuestra
              documento {
                id
                tipoDocumentoId
                nombre
                descripcion
                clave
                activo
                base64
              }
            }
}
        `,
      });
      return data.obtenerRequisitos
}

export{obtenerRequisitosGQL}