import client from "..";
import { gql } from "@apollo/client";

export type TypePreguntaRespuesta = {
  id: number,
  pregunta: string,
  respuesta: string,
}

type QUERY = {
  obtenerPreguntasRespuestas: TypePreguntaRespuesta[]
}

const obtenerPreguntaRespuestasGQL = async (tramiteId: number) => {
    const { data } = await client.query<QUERY>({
        variables: {tramiteId},
        query: gql`
          query ObtenerPreguntasRespuestas($tramiteId: Int!) {
            obtenerPreguntasRespuestas(tramiteId: $tramiteId) {
              id
              pregunta
              respuesta
            }
          }
        `,
      });
      return data.obtenerPreguntasRespuestas
}

export{obtenerPreguntaRespuestasGQL}