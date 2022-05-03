
import { useQuery, gql } from "@apollo/client";
interface Query {
    municipios: TipoMunicipios[]
}

export type TipoMunicipios = {
    id: number;
    entidadFederativaId: number;
    clave: number;
    nombre: string;
    claveCabecera: string;
    nombreCabecera: string;
}

const QUERY = gql`
  query Municipios($entidadFederativaId: Int!) {
        municipios(entidadFederativaId: $entidadFederativaId) {
            id
            entidadFederativaId
            clave
            nombre
            claveCabecera
            nombreCabecera
        }
    }
`;

const useMunicipios = (entidadFederativaId:number) => {
    return useQuery<Query>(QUERY,{variables:{entidadFederativaId}});
}

export {useMunicipios}