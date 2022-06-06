import { FC, useEffect, useState } from 'react'
import {
  BellIcon,
  CollectionIcon,
  CreditCardIcon,
  KeyIcon,
  PaperClipIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { Loading, Spacer } from "@nextui-org/react";
import { useAppContext } from '../../auth/authContext';
import { ModalSuccess } from '../ModalSucces';
import { ModalError } from '../ModalError';
import Link from 'next/link';
import { ExclamationIcon } from '@heroicons/react/solid';
import { actualizarContraGQL } from '../../apollo-cliente/perfil/actualizarContra';
import Info from '../Info';
import { CatDocumentos } from '../../helpers/expedientes';
import { TableFile } from '../TableFile';

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
  const {auth, actualizadoContra} = useAppContext();
  const [usuario] = useState({
    id: auth!.id, 
    nombreUsuario: auth?.usuario? auth.usuario.nombre:null,
    name: auth?.usuario ? auth.usuario.alumno.nomentalu:null,
    apellidos: auth?.usuario ? auth.usuario.alumno.apeentalu:null,
    email: auth!.email,
    newEmail: auth!.email,   
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
                      
                      <TableFile mapDocInit={mapDocInit} />                      

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