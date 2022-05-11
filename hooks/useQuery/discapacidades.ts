
import { useQuery, gql } from "@apollo/client";
interface Query {
    discapacidades: TipoDiscapacidades[]
}

export type TipoDiscapacidades = {
    id: number;
    nombreGrupoDiscapacidad: string;
    estado: number;
}

const QUERY = gql`
    query Discapacidades {
        discapacidades {
            id
            nombreGrupoDiscapacidad
            estado
        }
    }
`;

const useDiscapacidades = () => {
    return useQuery<Query>(QUERY);
}

export {useDiscapacidades}