
import { useQuery, gql } from "@apollo/client";

export type UserPlanGrupo = {
    PLESXUR: number;
    CVEENTALU: string
}

export type TypeGrupoActual = {
    PLESXUR: number;
    CVEENTESC: string;
    CVEPLNEST: string
    VRSPLNEST: string
    CVEENTALU: string
    ENTNIVALU: number
    ENTGPOALU: string
    CVEENTPER: string
}

interface Query {
    grupoActual: TypeGrupoActual[]
}

const QUERY = gql`
    query GrupoActual($alumnoPlan: AlumnoPlan!) {
        grupoActual(alumnoPlan: $alumnoPlan) {
            PLESXUR
            CVEENTESC
            CVEPLNEST
            VRSPLNEST
            CVEENTALU
            ENTNIVALU
            ENTGPOALU
            CVEENTPER
        }
    }
`;

const useGrupoActual = (alumnoPlan:UserPlanGrupo) => {
    return useQuery<Query>(QUERY,{variables:{alumnoPlan}});
}

export {useGrupoActual}