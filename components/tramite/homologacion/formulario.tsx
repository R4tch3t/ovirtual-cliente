import { Input } from "@nextui-org/react";
import { useState, FC } from "react";
import { CatDocumentos } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { types } from "../../../types/tramites";
import { validarPlanIngresarId, validarTelefono } from "./helper";
import { TableFile } from "../../TableFile";
import { EscuelasUagro } from "./helper/escuelasUagro";

type Props = {
    mapDocInit: CatDocumentos[],
    telefono: string,
    planIngresarId: number
}

export const FormularioHomologacion:FC<Props> = (props) => {
    const {tramitesState, dispatch} = useTramitesContext()
    let {telefono, planIngresarId} = tramitesState?.procedimientos?.homologacion!
    let {mapDocInit} =  props
    const [inputs, setInputs]:any = useState({
        periodoLectivo: {
            color: 'primary'
        },
        telefono: {
            color: 'primary'
        }
        ,
    });
    const Y = new Date().getFullYear()

    telefono = !telefono! ? 
        props.telefono : telefono!
    planIngresarId = !planIngresarId! ? 
        props.planIngresarId : planIngresarId!


    const onChange = ({target}:any) => {
        const {name, value} = target;
        
        const nombreTramite = 'homologacion'
        let nombreValor = name
        let valor = value

        dispatch({
            type: types.cambiarEstado,
            payload: {nombreTramite,nombreValor,valor}
        });
        
        let arrFormValido = [true,inputs]
        arrFormValido[0] = validarTelefono(arrFormValido)
        arrFormValido[0] = arrFormValido[0] && validarPlanIngresarId(planIngresarId!+"",arrFormValido)

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
            {/*<div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Escuela UAGRO a la que desea entrar:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-6 text-sm text-gray-900">
                    <EscuelasUagro planIngresarId={planIngresarId+""} />

                </dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Telefono:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="text-sm text-gray-900">
                    <Input id='telefono' 
                        width={"100%"} 
                        name='telefono'
                        onChange={onChange}
                        value={telefono?telefono:''}
                        clearable bordered label={' '}
                        placeholder={'Telefono para contactar al estudiante...'}
                        helperColor={inputs?.telefono?.color!}
                        helperText={inputs?.telefono?.helper!}
                        color={inputs?.telefono?.color!} 
                    />
                    
                </dd>
            </div>*/}

            <TableFile mapDocInit={mapDocInit} /> 

        </>
    )
}