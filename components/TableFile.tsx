import { PaperClipIcon } from "@heroicons/react/outline"
import { FC, useState, useEffect } from "react"
import { useAppContext } from "../auth/authContext"
import { Grid, Progress } from "@nextui-org/react";
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { bajarArchivo, CatDocumentos, eliminarExpediente, subirArchivo } from '../helpers/expedientes';
import { useTramitesContext } from "../context/tramites/TramitesContext";
import { TodosTramiteAlumnoInput, useTodosTramitesAlumno } from "../hooks/useQuery/tramites";


type Props = {
    mapDocInit: CatDocumentos[]
  }

export const TableFile:FC<Props> = ({mapDocInit}) => {
    const {auth, verificaToken} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext()
    
    const tramiteAlumno: TodosTramiteAlumnoInput = {
        userAlumnoId: auth?.id!
    }
    const respTodosTramites = useTodosTramitesAlumno(tramiteAlumno)
    
    const [mapDoc, setMapDoc] = useState(mapDocInit)
    type Base64 = (file: any) => Promise<unknown>
    let fileName = ''
    let expedienteId:any=null
    let documentoId:any=null
    let tipoDocumentoId = 0

    const toBase64:Base64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const selectFile = async () => {    
        let file = document.querySelector('#file-input') as any//!.files[0]
        file=file.files[0]
        const result= await toBase64(file).catch(e => e);
        if (result instanceof Error) {
            console.log('Error: ', result.message);
            return;
        }
        
        subirArchivo(
            expedienteId!,
            documentoId!,
            auth?.usuario?.id!,
            fileName,
            tipoDocumentoId,
            mapDoc,
            setMapDoc,
            verificaToken,
            result as string)
    };

    useEffect(()=>{ respTodosTramites.refetch() },[])

    return (
        <div className="sm:col-span-2">
            <input id="file-input" type="file" onChange={selectFile}  name="avatar" style={{display: 'none'}} />
            <dt className="text-sm font-medium text-gray-500">Documentos</dt>
            <dd className="mt-1 text-sm text-gray-900">
                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {mapDoc.map(m=>{

                    const exp = auth?.usuario?.expediente?.find((d)=>{return d?.documentoId===m.id})
                    m.expedienteId = !exp?.id! ? null:exp?.id! as any

                    //busqueda del expediente en cada tramite que ha enviado cada alumno
                    const tramite = respTodosTramites?.data?.todosTramitesAlumno?.find((tramiteAlumno)=>{
                        const {requisitos, estadoId} = tramiteAlumno
                        const reqDoc = requisitos.find((r)=>{return r.documento.id===m.id})
                        return reqDoc && estadoId!==2 && estadoId!==3
                    })
                    m.enTramite = tramite?.estadoId
                    

                    return (
                        <li key={m.nombre} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />

                        { m.expedienteId!==null&&exp?.validado===2&&
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        }
                        { m.expedienteId!==null&&exp?.validado===1&&
                            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        }

                        { m.expedienteId===null || (exp?.validado===3) &&
                            <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        }
                        
                        {m.expedienteId!==null&&<span className={`ml-2 flex-1 w-0 h-full truncate select-file`}
                            onMouseDown={()=>{
                                bajarArchivo(auth?.usuario?.id!,m.expedienteId!,mapDoc,setMapDoc)
                            }}
                        >
                            {m.nombre}

                            <p className="text-xs font-medium text-gray-500">
                                ESTADO: 
                                    <b>
                                    {
                                        exp?.validado===1?' PENDIENTE DE VALIDACIÓN' : 
                                            (exp?.validado===2?' VALIDACIÓN CORRECTA' : ' DOCUMENTO NO VÁLIDO')
                                    }
                                    </b>
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

                        </span>
                        }
                        {m.expedienteId===null&&<span className={`ml-2 flex-1 w-0 truncate text-red-500`}>
                            {m.nombre}{' *'}
                            {m.cargado!>0&&
                            <Grid>
                                <Progress value={m.cargado} shadow color="primary" status="primary" />
                            </Grid>
                            }
                        </span>
                        }
                        
                        </div>

                        {(m.expedienteId !== null && exp?.validado === 3)  && 
                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                            <button
                            type="button"
                            onClick={()=>{

                                fileName = m.nombre!
                                expedienteId=m.expedienteId
                                documentoId=m.id!
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
                                onMouseDown={()=>{eliminarExpediente(m.expedienteId!,verificaToken)}}
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Eliminar
                            </button>
                        </div>
                        }

                    {(m.expedienteId !== null && exp?.validado! < 3) && 
                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                            <button
                            type="button"
                            onClick={()=>{

                                bajarArchivo(auth?.usuario?.id!,m.expedienteId!,mapDoc,setMapDoc,true)
                            
                            }}
                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                            >
                                Descargar
                            </button>
                            <span className="text-gray-300" aria-hidden="true">
                                |
                            </span>
                            <button
                                type="button"
                                onMouseDown={()=>{
                                    bajarArchivo(auth?.usuario?.id!,m.expedienteId!,mapDoc,setMapDoc)
                                }}
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Ver
                            </button>

                            {(!m.enTramite || (exp?.validado===1 && m.enTramite !==2)) &&
                            <>
                                <span className="text-gray-300" aria-hidden="true">
                                    |
                                </span>
                                <button
                                    type="button"
                                    onMouseDown={()=>{eliminarExpediente(m.expedienteId!,verificaToken)}}
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Eliminar
                                </button>
                            </>
                            }

                        </div>
                    }

                    {m.expedienteId===null &&
                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                            <button
                            type="button"
                            onClick={()=>{

                                fileName = m.nombre!
                                expedienteId=null
                                tipoDocumentoId=m.tipoDocumentoId!
                                documentoId=m.id!
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
    )
}