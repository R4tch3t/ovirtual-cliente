
import { useQuery, gql } from "@apollo/client";
interface Query {
    entidadesFederativas: TipoEntidadesFederativas[]
}
export type TipoEntidadesFederativas = {
    id: number,
    nombre: string,
    abreviatura: string
}
const QUERY = gql`
  query EntidadesFederativas {
    entidadesFederativas {
            id
            nombre
            abreviatura
        }
    }
`;

const useEntidadesFederativas = () => {
    return useQuery<Query>(QUERY);
}

export {useEntidadesFederativas}