
import { useQuery, gql } from "@apollo/client";
import { TypeUnidadesAcademicas } from "../../interfaces";
interface Query {
    planesOfertados: TypeUnidadesAcademicas[]
}

const QUERY = gql`
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
`;

const usePlanesOfertados = (nivel:number) => {
    return useQuery<Query>(QUERY,{variables:{nivel}});
}

export {usePlanesOfertados}