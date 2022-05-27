import client from "..";
import { gql } from "@apollo/client";

const tramitePorId = async (id:number) => {
    const { data } = await client.query({
        variables:{id},
        query: gql`
          query TramitePorID($id: Int!) {
            tramitePorID(id: $id) {
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
      
      return data.tramitePorID
}

export{tramitePorId}