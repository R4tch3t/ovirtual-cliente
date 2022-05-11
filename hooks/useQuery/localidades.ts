
import { useQuery, gql } from "@apollo/client";
import { TipoMunicipios } from "./municipios";
interface Query {
    localidades: TipoLocalidades[]
}

export type TipoLocalidades = {
    id: number;
    municipioId: number;
    clave: number;
    nombre: string;
    claveMunicipio: number;
    ambito: string;
    latitud: string;
    claveCarta: string;
    claveEntidad: number;
    municipio: TipoMunicipios
}

const QUERY = gql`
    query Localidades($municipioId: Int!) {
        localidades(municipioId: $municipioId) {
            id
            municipioId
            clave
            nombre
            claveMunicipio
            ambito
            latitud
            longitud
            altitud
            claveCarta
            claveEntidad
        }
    }
`;

const useLocalidades = (municipioId:number) => {
    return useQuery<Query>(QUERY,{variables:{municipioId}});
}

export {useLocalidades}