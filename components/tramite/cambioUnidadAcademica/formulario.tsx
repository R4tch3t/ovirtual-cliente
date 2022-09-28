import { useState, FC } from "react";
import { CatDocumentos } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { TableFile } from "../../TableFile";
import { UnidadesAcademicas } from "./helper";
import { TypeUnidadesAcademicas } from "../../../interfaces";

type Props = {
    mapDocInit: CatDocumentos[],
    unidadDestino: number,
    unidadesAcademicas: TypeUnidadesAcademicas[]
}

export const FormularioCambioUnidadAcademica:FC<Props> = ({mapDocInit, unidadDestino, unidadesAcademicas}) => {
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
    
    unidadDestino = 
        unidadDestino ? 
        unidadDestino : tramitesState?.procedimientos?.cambioUnidadAcademica?.unidadDestino!
    //grupoTurnoActual = grupoTurnoActual ? JSON.parse (grupoTurnoActual):null


    return (
        <>
            <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Unidad Académica de Destino:
                    <span className="mt-2 text-xs text-red-500">
                        {' *'}
                    </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <div style={{height: 20}} />
                    <UnidadesAcademicas  unidadesAcademicas={unidadesAcademicas} unidadDestino={unidadDestino}              
                    />

                </dd>
            </div>
            {/*<div className="sm:col-span-1">
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
            </div>*/}
            
            <TableFile mapDocInit={mapDocInit} /> 

        </>
    )
}