import { useTramitesContext } from "../../../../../../context/tramites/TramitesContext"

const validarFormulario1 = () => {
    const {tramitesState} = useTramitesContext()
    const {paso1} = tramitesState.procedimientos.homologacion!
    let valido: any = paso1?.nacionalidadID !== undefined
    valido = paso1?.nacionalidadID === 1 ? (valido && paso1?.paisID !== undefined) : valido
    valido = valido && paso1?.nombre && paso1?.ape1 && paso1?.curp && paso1?.celular && paso1?.email
    return valido
}   

export {validarFormulario1}