import { useAppContext } from "../../../auth/authContext"
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { retornarPrimerMat } from "../../../helpers/retornarPrimerMat";

export const HeadTramite = () => {
    const {tramitesState} = useTramitesContext()
    const {auth} = useAppContext()
    const {homologacion} = tramitesState.procedimientos
    if(!auth?.usuario){
        return <></>
    }

    const apellidos = auth?.usuario?.alumno?.apeentalu?.split('*')!
    return (
        <>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Matrícula</dt>
                <dd className="mt-1 text-sm text-gray-900">{retornarPrimerMat(auth?.usuario?.matricula!)}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                <dd className="mt-1 text-sm text-gray-900">{auth?.usuario?.alumno?.nomentalu!}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Primer Apellido</dt>
                <dd className="mt-1 text-sm text-gray-900">{apellidos![0]!}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Segundo Apellido</dt>
                <dd className="mt-1 text-sm text-gray-900">{apellidos![1]!}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Unidad Académica de Procedencia</dt>
                <dd className="mt-1 text-sm text-gray-900">{homologacion?.unidadAcademica}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Plan de estudios</dt>
                <dd className="mt-1 text-sm text-gray-900">{homologacion?.planElegido}</dd>
            </div>
            
        </>
    )
}