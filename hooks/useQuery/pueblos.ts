
import { useQuery, gql } from "@apollo/client";
interface Query {
    pueblos: TipoPueblos[]
}

export type TipoPueblos = {
    id: number;
    nombrePuebloOriginario: string;
    estado: number;
}

const QUERY = gql`
    query Pueblos {
        pueblos {
            id
            nombrePuebloOriginario
            estado
        }
    }
`;

const usePueblos = () => {
    return useQuery<Query>(QUERY);
}

export {usePueblos}