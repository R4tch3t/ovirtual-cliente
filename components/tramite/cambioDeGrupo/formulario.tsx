import { Input } from "@nextui-org/react";
import { useState, FC } from "react";
import { CatDocumentos } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { types } from "../../../types/tramites";
import { validarPeriodo, validarCausaBaja } from "./helper";
import { TableFile } from "../../TableFile";

type Props = {
    mapDocInit: CatDocumentos[],
    grupoTurnoActual: string,
    grupoTurnoAsigando: string
}

export const FormularioCambioDeGrupo:FC<Props> = ({mapDocInit, grupoTurnoActual, grupoTurnoAsigando}) => {
    const {tramitesState, dispatch} = useTramitesContext()
    const [inputs, setInputs]:any = useState({
        periodoLectivo: {
            color: 'primary'
        },
        causaBaja: {
            color: 'primary'
        }
        ,
    });
    const Y = new Date().getFullYear()
    
    grupoTurnoActual = !tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoActual! ? 
        grupoTurnoActual : tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoActual!

    grupoTurnoAsigando = !tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoAsigando! ? 
        grupoTurnoAsigando : tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoAsigando!


    const onChange = ({target}:any) => {
        const {name, value} = target;        
        const nombreTramite = 'bajaTemporal'
        let nombreValor = name
        let valor = value

        dispatch({
            type: types.cambiarEstado,
            payload: {nombreTramite,nombreValor,valor}
        });
        
        let arrFormValido = [true,inputs]
        arrFormValido[0] = validarPeriodo(arrFormValido)
        arrFormValido[0] = arrFormValido[0] && validarCausaBaja(arrFormValido)
        
        setInputs(arrFormValido[1])

        let formValido = arrFormValido[0] 

        nombreValor = 'validoParaTramitar'
        valor = formValido

        dispatch({
            type: types.cambiarEstado,
            payload: {nombreTramite,nombreValor,valor}
        });

    }

    return (
        <>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grupo y Turno actual:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <Input id='periodoBaja' 
                        width={"100%"} 
                        name='periodoLectivo'
                        onChange={onChange}
                        clearable bordered
                        value={grupoTurnoActual?grupoTurnoActual:''}
                        label={' '}
                        placeholder={Y+'-'+(Y+1)}
                        helperColor={inputs.periodoLectivo.color}
                        helperText={inputs.periodoLectivo.helper}
                        color={inputs.periodoLectivo.color} 
                        
                    />

                </dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grupo y Turno asignado:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <Input id='causaBaja' 
                        width={"100%"} 
                        name='causaBaja'
                        onChange={onChange}
                        value={grupoTurnoAsigando?grupoTurnoAsigando:''}
                        clearable bordered label={' '}
                        placeholder={'Descripción del porqué se da de baja... '}
                        helperColor={inputs?.causaBaja?.color!}
                        helperText={inputs?.causaBaja?.helper!}
                        color={inputs?.causaBaja?.color!} 
                    />
                    
                </dd>
            </div>
            
            <TableFile mapDocInit={mapDocInit} /> 

        </>
    )
}