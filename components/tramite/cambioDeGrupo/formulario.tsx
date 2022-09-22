import { Input } from "@nextui-org/react";
import { useState, FC } from "react";
import { CatDocumentos } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { types } from "../../../types/tramites";
import { TableFile } from "../../TableFile";
import { GrupoActual } from "./helper";

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
    
    grupoTurnoActual = 
        grupoTurnoActual ? 
        grupoTurnoActual : tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoActual!
    grupoTurnoActual = grupoTurnoActual ? JSON.parse (grupoTurnoActual):null

    grupoTurnoAsigando = !tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoAsigando! ? 
        grupoTurnoAsigando : tramitesState?.procedimientos?.cambioDeGrupo?.grupoTurnoAsigando!


    return (
        <>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grupo y Turno actual:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <div style={{height: 20}} />
                    <GrupoActual  grupoTurnoActual={grupoTurnoActual}                     
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
                        //onChange={onChange}
                        value={grupoTurnoAsigando?grupoTurnoAsigando:''}
                        clearable bordered label={' '}
                        placeholder={'Grupo y turno que se le asignará tras completar el trámite... '}
                        helperColor={inputs?.causaBaja?.color!}
                        helperText={inputs?.causaBaja?.helper!}
                        color={inputs?.causaBaja?.color!} 
                        disabled
                    />
                    
                </dd>
            </div>
            
            <TableFile mapDocInit={mapDocInit} /> 

        </>
    )
}