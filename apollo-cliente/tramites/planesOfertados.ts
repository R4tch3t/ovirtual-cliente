import client from "..";
import { gql } from "@apollo/client";

const planesOfertados = async (nivel:number) => {
    const { data } = await client.query({
        variables:{nivel},
        query: gql`
          query PlanesOfertados($nivel: Int!) {
            planesOfertados(nivel: $nivel) {
              id
              claveUnidadAcademica
              clavePlanEstudios
              versionPlanEstudios
              nombreUnidadAcademica
              nombrePlanEstudios
              anioPlanEstudios
              periodoInicioPlan
              fechaInicioPreregistro
              fechaFinPreregistro
              fechaInicioRegistro
              fechaFinRegistro
              nivelPlanEstudios
              localidad
              zonaEscolar
              pdfRevisionDoctos
              pdfAceptados
              plestud
            }
          }
        `,
      });
      
      return data.planesOfertados
}

export{planesOfertados}