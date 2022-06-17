import { Input } from "@nextui-org/react";
import { useState, FC } from "react";
import { CatDocumentos } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { types } from "../../../types/tramites";
import { validarPeriodo, validarCausaBaja } from "./helper";
import { TableFile } from "../../TableFile";

type Props = {
    mapDocInit: CatDocumentos[],
    periodoBajaVal: string,
    causaBajaVal: string
}

export const FormularioBajaTemporal:FC<Props> = ({mapDocInit, periodoBajaVal, causaBajaVal}) => {
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
    
    periodoBajaVal = !tramitesState?.procedimientos?.bajaTemporal?.periodoLectivo! ? 
        periodoBajaVal : tramitesState?.procedimientos?.bajaTemporal?.periodoLectivo!

    causaBajaVal = !tramitesState?.procedimientos?.bajaTemporal?.causaBaja! ? 
        causaBajaVal : tramitesState?.procedimientos?.bajaTemporal?.causaBaja!


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
                <dt className="text-sm font-medium text-gray-500">Periodo Lectivo de la Baja:
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
                        value={periodoBajaVal?periodoBajaVal:''}
                        label={' '}
                        placeholder={Y+'-'+(Y+1)}
                        helperColor={inputs.periodoLectivo.color}
                        helperText={inputs.periodoLectivo.helper}
                        color={inputs.periodoLectivo.color} 
                        
                    />

                </dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Causa de la Baja:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <Input id='causaBaja' 
                        width={"100%"} 
                        name='causaBaja'
                        onChange={onChange}
                        value={causaBajaVal?causaBajaVal:''}
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