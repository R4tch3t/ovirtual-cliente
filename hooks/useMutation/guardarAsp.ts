
import { useMutation, gql } from "@apollo/client";

interface Mutation {
    guardarAsp: boolean
}

const GUARDARASPPQUERY = gql`
    mutation GuardarAsp($aspiranteId: Int!, $asp: AspiranteInput, $aspReg: AspRegistroInput, $aspDomi: AspDomiciliarioInput, $aspMulti: AspMulticulturalidadInput, $aspSocioEco: AspSocioEconomicosInput) {
        guardarAsp(id: $aspiranteId, asp: $asp, aspReg: $aspReg, aspDomi: $aspDomi, aspMulti: $aspMulti, aspSocioEco: $aspSocioEco)
    }
`;

const useGuardarAsp = () => {
    return useMutation<Mutation>(GUARDARASPPQUERY);
}

export {useGuardarAsp}