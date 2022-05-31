import { useEffect, useState } from 'react'
import {
  BellIcon,
  CollectionIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { Input, Loading, Spacer } from "@nextui-org/react";
import { useAppContext } from '../../auth/authContext';
import CambiarContraseña from '../settings/CambiarContraseña';
import { ModalSuccess } from '../ModalSucces';
import { ModalError } from '../ModalError';
import Link from 'next/link';
import { ExclamationIcon } from '@heroicons/react/solid';
import { actualizarContraGQL } from '../../apollo-cliente/perfil/actualizarContra';

const subNavigation = [
  { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: false },
  { name: 'Contraseña', href: '/perfil/contra', icon: KeyIcon, current: true },
  { name: 'Expediente', href: '/perfil/expediente', icon: CollectionIcon, current: false },
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

const PerfilContraseñaLayout = () => {
  const {auth, actualizadoContra, updateUser}:any = useAppContext();
  const [usuario, setUsuario] = useState({
    id: auth.id, 
    nombreUsuario: auth.usuario? auth.usuario.nombre:null,
    name: auth.usuario ? auth.usuario.alumno.nomentalu:null,
    apellidos: auth.usuario ? auth.usuario.alumno.apeentalu:null,
    email: auth.email,
    newEmail: auth.email,
    matricula: auth.usuario?auth?.usuario?.matricula!:null,
    passwordN: '',
    passwordC: '',
    password: '',
    role: 'Alumno(a)',
    imageUrl:
    "https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg",
  });
  const [advContra, setAdvContra] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [inputs, setInputs]:any = useState({
    passwordN: {color: 'secondary'},
    passwordC: {color: 'secondary'},
    password: {color: 'secondary'}
  })

  const validarContraseñas = (n:string='',c:string) => {
    const valida = n === c && n !== '' && c !== ''
    if(!valida){
      const invalid = {
        color: 'error', 
        helper: 'Las contraseñas no coinciden',
        statusColor: 'error'
      }
      if(n===''||c===''){
        invalid.helper='Contraseña invalida'
      }
      setInputs({...inputs,passwordN:invalid,passwordC:invalid})
    }
  
    if(valida){
      const valid = {
        color: 'primary', 
        helper: 'Las contraseñas coinciden',
        statusColor: 'primary'
      }
      setInputs({...inputs,passwordN:valid,passwordC:valid})
    }
    return n === c
  };

 

  const onChange = ({target}:any) => {
 
    const {name, value} = target;
    setUsuario({
      ...usuario,
      [name]: value
    });
    switch(name){
      
      case 'passwordC':
        let n = usuario.passwordN
        validarContraseñas(value,n)
        
      break
      case 'passwordN':
        n = usuario.passwordC
        validarContraseñas(value,n)
        
      break
    }
  }

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
    actualizadoContra(auth.id).then((r:any)=>{
      
      if(r.respNecesarioCambiarPass){
        subNavigation[1].icon=WarningPass;
        setAdvContra(true)
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
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Contraseña</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Favor de tener <b>EXTREMO</b> cuidado con la información que se administrará a continuación
                    </p>
                  </div>
                  
                  <Spacer y={1} />
                    {advContra && <CambiarContraseña />}
                 
                  <Spacer y={1} />
                    <div className="mt-6 grid grid-cols-12 gap-6" >
                      <div className="col-span-12 sm:col-span-6" >
                        <Input.Password  id='contraNPerfil' 
                          width={"100%"} 
                          name='passwordN'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Nueva contraseña" 
                          helperColor={inputs.passwordN.color}
                          helperText={inputs.passwordN.helper}
                          color={inputs.passwordN.color} />
                      </div>
                      <div className="col-span-12 sm:col-span-6" >
                        <Input.Password  id='contraCPerfil' 
                          width={"100%"} 
                          name='passwordC'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Confirmar contraseña"
                          helperColor={inputs.passwordC.color}
                          helperText={inputs.passwordC.helper}
                          color={inputs.passwordC.color} />
                      </div>
                    </div>

                    <Spacer y={1} />
                    <div className="mt-6 grid grid-cols-12 gap-6" >
                    <div className="col-span-12 sm:col-span-3" />
                      <div className="col-span-12 sm:col-span-6" >
                        <Input.Password  id='contraPerfil' 
                          width={"100%"} 
                          name='password'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Contraseña actual"
                          helperColor={inputs.password.color}
                          helperText={inputs.password.helper}
                          color={inputs.password.color} />
                      </div>
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

export default PerfilContraseñaLayout