import { Grid, Input, Progress } from "@nextui-org/react";
import { ExclamationIcon, PaperClipIcon } from '@heroicons/react/solid'
import { useState, FC } from "react";
import { useAppContext } from "../../../auth/authContext";
import { bajarArchivo, eliminarExpediente, subirArchivo, TypeMapDoc } from "../../../helpers/expedientes";
import { useTramitesContext } from "../../../context/tramites/TramitesContext";
import { types } from "../../../types/tramites";
import { validarPeriodo, validarCausaBaja } from "./helper";

type Props = {
    mapDocInit: TypeMapDoc[],
    periodoBajaVal: string,
    causaBajaVal: string
}

export const FormularioBajaTemporal:FC<Props> = ({mapDocInit, periodoBajaVal, causaBajaVal}) => {
    const [mapDoc, setMapDoc] = useState(mapDocInit)
    const {auth, verificaToken} = useAppContext();
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

    type Base64 = (file: any) => Promise<unknown>
    let fileName = ''
    let expedienteId:any=null
    let tipoDocumentoId:number=0
    const toBase64:Base64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const selectFile = async () => {    
        let file = document.querySelector('#file-input') as any//!.files[0]
        file=file.files[0]
        const result = await toBase64(file).catch(e => e);
        if (result instanceof Error) {
            console.log('Error: ', result.message);
            return;
        }
        
        subirArchivo(
            expedienteId!,
            auth?.usuario?.id!,
            fileName,
            tipoDocumentoId,
            mapDoc,
            setMapDoc,
            verificaToken,
            result as string
        )
    };

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

            <div className="sm:col-span-2">
            <input id="file-input" type="file" onChange={selectFile}  name="avatar" style={{display: 'none'}} />
            <dt className="text-sm font-medium text-gray-500">Documentos</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {mapDoc.map(m=>{

                    const doc = auth?.usuario?.expediente?.find((d)=>{return d?.documento?.nombre===m.nombre})
                    m.id = !doc?.id! ? null:doc?.id! as any

                    return (
                    <li key={m.nombre} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    { m.id!==null&&!m.validado&&
                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    }

                    { m.id===null &&
                        <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    }
                    {m.id!==null&&<span className={`ml-2 flex-1 w-0 h-full truncate select-file`}
                        onMouseDown={()=>{
                            bajarArchivo(auth?.usuario?.id!,m.id!,mapDoc,setMapDoc)
                        }}
                    >
                        {m.nombre}
                        <p className="text-xs font-medium text-gray-500">
                            ESTADO: <b>{m.validado?'VALIDO':'NO VALIDADO'}</b>
                        </p>
                        {m.cargado!>0&&
                            <Grid>
                                <Progress value={m.cargado} shadow color="primary" status="primary" />
                            </Grid>
                        }
                        {m.bajando!>0&&
                        <Grid>
                            <Progress value={m.bajando} shadow color="secondary" status="secondary" />
                        </Grid>
                        }

                    </span>}
                    {m.id===null&&<span className={`ml-2 flex-1 w-0 truncate text-red-500`}>
                        {m.nombre}{' *'}
                        {m.cargado!>0&&
                        <Grid>
                            <Progress value={m.cargado} shadow color="primary" status="primary" />
                        </Grid>
                        }
                    </span>
                    }
                    
                    </div>

                    {m.id !== null && 
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                        <button
                        type="button"
                        onClick={()=>{

                            fileName = m.nombre
                            expedienteId=m.id
                            document.getElementById('file-input')!.click()
                        
                        }}
                        className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                        >
                        Actualizar
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                        |
                        </span>
                        <button
                            type="button"
                            onMouseDown={()=>{
                                eliminarExpediente(m.id!,verificaToken)
                            }}
                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Eliminar
                        </button>
                    </div>
                    }

                    {m.id===null && 
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                        <button
                        type="button"
                        onClick={()=>{

                            fileName = m.nombre
                            expedienteId=null
                            tipoDocumentoId=m.tipoDocumentoId
                            document.getElementById('file-input')!.click()
                        
                        }}
                        className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Subir
                        </button>
                        
                    </div>
                    }

                    </li>
                    )
                })}
              </ul>
            </dd>

          </div>

        </>
    )
}