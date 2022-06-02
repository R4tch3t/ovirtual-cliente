import { FC, useEffect, useState } from 'react'
import {
  BellIcon,
  CollectionIcon,
  CreditCardIcon,
  KeyIcon,
  PaperClipIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { Grid, Loading, Progress, Spacer } from "@nextui-org/react";
import { useAppContext } from '../../auth/authContext';
import { ModalSuccess } from '../ModalSucces';
import { ModalError } from '../ModalError';
import Link from 'next/link';
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { actualizarContraGQL } from '../../apollo-cliente/perfil/actualizarContra';
import Info from '../Info';
import { bajarArchivo, CatDocumentos, eliminarExpediente, subirArchivo } from '../../helpers/expedientes';

const subNavigation = [
  { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: false },
  { name: 'Contraseña', href: '/perfil/contra', icon: KeyIcon, current: false },
  { name: 'Expediente', href: '/perfil/expediente', icon: CollectionIcon, current: true },
  { name: 'Notificaciones', href: '#', icon: BellIcon, current: false },
  { name: 'Facturación', href: '#', icon: CreditCardIcon, current: false },
]


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const WarningPass = () => {
  return <>
    <KeyIcon className="h-5 w-5" />
    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
  </>
}


type Props = {
  mapDocInit: CatDocumentos[]
}

const PerfilExpedienteLayout:FC<Props> = ({mapDocInit}) => {
  const {auth, actualizadoContra, verificaToken} = useAppContext();
  //const {tramitesState} = useTramitesContext();
  const [usuario] = useState({
    id: auth!.id, 
    nombreUsuario: auth?.usuario? auth.usuario.nombre:null,
    name: auth?.usuario ? auth.usuario.alumno.nomentalu:null,
    apellidos: auth?.usuario ? auth.usuario.alumno.apeentalu:null,
    email: auth!.email,
    newEmail: auth!.email,
   // matactiva: auth.usuario?auth.usuario.matactiva:null,
    matricula: auth?.usuario?auth?.usuario?.matricula:null,
    passwordN: '',
    passwordC: '',
    password: '',
    role: 'Alumno(a)',
    imageUrl:
    "https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg",
  });
  
  const [cargando, setCargando] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [mapDoc, setMapDoc] = useState(mapDocInit)

  const infoMsg = "Todos los documentos deberán ser Escaneados a color, legibles, completos, sin sombras, claros, y con masca de agua de algún producto utilizado para el escaneo. "
    +"No deberán ser imagenes o fotografias recortadas y convertidas a formato PDF, debes cuidar la calidad de los archivos ya que formarán parte de tu expediente personal, "
    +"y podran ser utilizados para trámites posteriores";  
  
  const onSubmit = async (e:any) => {
    setCargando(true)
    
    const user = {
      id: usuario.id!,
      password: usuario.password!,
      passwordN: usuario.passwordN!,
      passwordC: usuario.passwordC!
    }
    const resp = await actualizarContraGQL(user)
    if(!resp){
        setDataModal({title: "Error", txt: "El usuario NO fue actualizado.", btn1: {txt:"Regresar al perfil", onClose:setModalE} })
        setModalE(true);
    }else{
        setDataModal({title: 'Éxito', txt: "El usuario fue actualizado.", btn1: {txt:"Regresar al perfil", onClose:setModalE} })
        setModalS(true);
    }

    setCargando(false)

  }

  useEffect(()=>{
    //Comprobar si es necesario actualizar la contraseña
    actualizadoContra(auth!.id!).then((r:any)=>{
      
      if(r.respNecesarioCambiarPass){
        subNavigation[1].icon=WarningPass;
        
      }

    });
    
  },[actualizadoContra])
  
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
      usuario.id!,
      fileName,
      tipoDocumentoId,
      mapDoc,
      setMapDoc,
      verificaToken,
      result as string)
  };

    return (
        <main className="relative -mt-24">
          <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
          <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={dataModal.btn1} />
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                    >
                      <a
                        className={classNames(
                          item.current
                            ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                          'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-teal-500 group-hover:text-teal-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </aside>

              <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Expediente</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Expediente Electrónico Personal
                    </p>
                  </div>
                  
                  <Spacer y={1}  />
                  <div>
                    <Info msg={infoMsg} />
                  </div>
                 
                  <Spacer y={1} />

                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">


                      <div className="sm:col-span-2">
                        <input id="file-input" type="file" onChange={selectFile}  name="avatar" style={{display: 'none'}} />
                        <dt className="text-sm font-medium text-gray-500">Documentos</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {mapDoc.map(m=>{

                              const exp = auth?.usuario?.expediente?.find((d)=>{return d?.documentoId===m.id})
                              m.expedienteId = !exp?.id! ? null:exp?.id! as any

                              return (
                              <li key={m.nombre} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                { m.expedienteId!==null&&exp?.validado===1&&
                                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                                }
                                { m.expedienteId!==null&&!exp?.validado&&
                                  <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                }

                                { m.expedienteId===null &&
                                  <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                }
                                
                                {m.expedienteId!==null&&<span className={`ml-2 flex-1 w-0 h-full truncate select-file`}
                                  onMouseDown={()=>{
                                    bajarArchivo(auth?.usuario?.id!,m.expedienteId!,mapDoc,setMapDoc)
                                  }}
                                >
                                  {m.nombre}

                                  <p className="text-xs font-medium text-gray-500">
                                    ESTADO: <b>{exp?.validado?'VALIDO':'NO VALIDADO'}</b>
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

                              {m.expedienteId !== null && 
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
                    </dl>
                  </div>

                    
                  

                </div>

                <div className="pt-6 divide-y divide-gray-200">                  

                  <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button
                      
                      type="button"
                      className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      <Link
                        href={'/'}
                      >
                        Cancel
                      </Link>
                    </button>

                      <button
                        type="button"
                        onMouseUp={onSubmit}
                        style={{width: 120}}
                        className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        {
                          cargando ? 
                            <Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />
                            :
                            'Actualizar'
                        }
                      </button>
                    

                  </div>
                </div>

              </form>
              
            </div>
          </div>
        </div>
      </main>
    )
}

export default PerfilExpedienteLayout