import client from "..";
import { gql } from "@apollo/client";

const obtenerTramites = async () => {
    const { data } = await client.query({
        query: gql`
          query Tramites {
            tramites {
                id
                nombre
                nombreCorto
                clave
                beneficio
                necesitaValidacion
                fechaInicialValidacion
                fechaFinalValidacion
                publicoDirigido
                requiereFirmaElectronica
                fechaCreacion
                fechaActualizacion
                documentoObtiene
                costo
                tiempoRespuesta
                condiciones
                fundamentoLegal
                website
                tramiteGratis
                tramitePublicado
                procedimientoEnlinea
                procedimientoModulo
                validado
                tiempoValidezDocumento
                descripcion
                nivelAplica
                unidadResponsableId
            }
          }
        `,
      });
      return data.tramites
}

export{obtenerTramites}