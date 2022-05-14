import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ExclamationIcon } from '@heroicons/react/solid'
import { urlBase } from '../../variables/url'
import { Button, Grid, Input, Loading, Spacer } from "@nextui-org/react";
import { useAppContext } from '../../auth/authContext';
import VincularMatricula from '../settings/VincularMatricula';
import ActivarMatricula from '../settings/ActivarMatricula';
import { ModalSuccess } from '../ModalSucces';
import { ModalError } from '../ModalError';
import Link from 'next/link';

let subNavigation = [
  { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: true },
  //{ name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Contraseña', href: '/perfil/contra', icon: KeyIcon, current: false },
  { name: 'Notificaciones', href: '#', icon: BellIcon, current: false },
  { name: 'Facturación', href: '#', icon: CreditCardIcon, current: false },
  //{ name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
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

const PerfilLayout = () => {
  /*const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)*/
  const {auth, vincularMatricula, updateUser,actualizadoContra}:any = useAppContext();
  const [usuario, setUsuario] = useState({
    id: auth.id, 
    nombreUsuario: auth.usuario? auth.usuario.nombre:null,
    name: auth.usuario ? auth.usuario.alumno.nomentalu:null,
    apellidos: auth.usuario ? auth.usuario.alumno.apeentalu:null,
    email: auth.email,
    newEmail: auth.email,
   // matactiva: auth.usuario?auth.usuario.matactiva:null,
    matricula: auth.usuario?auth.usuario.matricula:null,
    password: '',
    role: 'Alumno(a)',
    imageUrl:
    "https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg",
  });
  const [cargando, setCargando] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [inputs, setInputs]:any = useState({
    matricula: {color: 'secondary'},
    email: {color: 'primary'}
  })

  const validarMatricula = (value:string='') => {
    const valida = value.match(/^[0-9]{8,8}$/i);
    const name='matricula'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Matrícula invalida',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
      setInputs({...inputs,[name]:{
        color: 'secondary', 
        helper: undefined
      }})
    }
    return valida
  };

  const validarCorreo = (value:string) => {
    const valida = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i);
    const name='email'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Correo invalido',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
      setInputs({...inputs,[name]:{
        color: 'primary', 
        helper: undefined
      }})
    }
    return valida
  };

  const onChange = ({target}:any) => {
        
    //if(!target) return false;

    const {name, value} = target;
    setUsuario({
      ...usuario,
      [name]: value
    });

    switch(name){
      case 'matricula':
        validarMatricula(value)
      break
      case 'email':
        validarCorreo(value)
      break
    }

    /*if(value===""){
      setInputs({...inputs,[name]:{...inputs[name], color: 'secondary', helper: undefined}})
    }*/
  }

  const vincularM = async({currentTarget}:any) => {
    const {name} = currentTarget;
    let {matricula} = usuario
    let valida = matricula?validarMatricula(matricula):validarMatricula()
    
    if(!valida){
      return false
    }

    setCargando(true)
    const ok = await vincularMatricula(usuario)
    
    if(ok!==true){
      setDataModal({title: "Error", txt: ok, btn1: {txt:"Regresar al perfil", onClose:setModalE} })
      setModalE(true);
    }

    setCargando(false)
   
   // console.log(ok)
    
  }

  const onSubmit = async (e:any) => {
    //e.preventDefault();

    const newEmail = usuario.email
    usuario.newEmail=newEmail
    usuario.email = auth.email
    setCargando(true)

    const resp = await updateUser(usuario,"login/update");
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
      
      if(r.respNecesarioCambiarPass===true){
        subNavigation[1].icon=WarningPass
      }

    });
    
  },[actualizadoContra])

  //si la matricula no esta vinculada a la cuenta de la sesion
  if(auth.usuario&&auth.usuario.matactiva === 0){
    subNavigation = [
      { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: true },
      { name: 'Notificaciones', href: '#', icon: BellIcon, current: false },
    ]
  }

    return (
        <main className="relative -mt-24">
          {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />}
          {modalE && <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={dataModal.btn1} />}
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
                {/* Profile section */}
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Perfil</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Tener cuidado con la información que se administrará a continuación
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Nombre de usuario
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                          <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                            {urlBase}
                          </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                            defaultValue={usuario.nombreUsuario}
                          />
                        </div>
                      </div>

                      {/*<div>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={''}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>*/}

                    </div>

                    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700" style={{textAlign: 'center'}} aria-hidden="true">
                        Foto de perfil
                      </p>
                      <div className="mt-1 lg:hidden">
                        <div className="flex items-center">
                          <div
                            className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                            aria-hidden="true"
                          >
                            <img className="rounded-full h-full w-full" src={usuario.imageUrl} alt="" />
                          </div>
                          <div className="ml-5 rounded-md shadow-sm">
                            <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                              <label
                                htmlFor="mobile-user-photo"
                                className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                              >
                                <span>Cambiar</span>
                                <span className="sr-only"> Foto de usuario</span>
                              </label>
                              <input
                                id="mobile-user-photo"
                                name="user-photo"
                                type="file"
                                className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden relative rounded-full overflow-hidden lg:block">
                        <img className="relative rounded-full w-40 h-40" src={usuario.imageUrl} alt="" />
                        <label
                          htmlFor="desktop-user-photo"
                          className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                        >
                          <span>Cambiar</span>
                          <span className="sr-only"> Foto de usuario</span>
                          <input
                            type="file"
                            id="desktop-user-photo"
                            name="user-photo"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <Spacer y={1} />
                          {auth.usuario&&auth.usuario.matactiva === 0 && <VincularMatricula />}
                          {auth.usuario&&auth.usuario.matactiva === 0.5 && <ActivarMatricula />}
                  <Spacer y={1} />

                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <Input id='matriculaPerfil' 
                        width={"100%"} 
                        name='matricula'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Matrícula" 
                        initialValue={usuario.matricula} 
                        helperColor={inputs.matricula.color}
                        helperText={inputs.matricula.helper}
                        color={inputs.matricula.color} />
                    </div>
                    <div >
                    <Button   
                      id='vincularB'
                      name='matricula'
                      shadow color="secondary" 
                      onMouseUp={vincularM}
                      auto>
                        <div style={{width: 90}} >
                          {
                          cargando ? 
                            <Loading className="w-8 h-5" type="points-opacity" color="secondary" size="sm" />
                            :
                            'Vincular'
                          }
                        </div>  
                    </Button>
                    </div>
                  </div>
                  <Spacer y={2} />
                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <Input id='nombrePerfil' 
                        width={"100%"} 
                        name='name'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Nombre" 
                        initialValue={usuario.name}
                        color="primary" />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                    <Input id='apePerfil' 
                        width={"100%"} 
                        name='apellidos'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Apellidos" 
                        initialValue={usuario.apellidos}
                        color="primary" />
                    </div>
                  </div>
                  <Spacer y={1} />
                  <div className="mt-6 grid grid-cols-12 gap-6" >
                    <div className="col-span-12 sm:col-span-6" >
                      <Input id='correoPerfil'
                        width={"100%"} 
                        name='email'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Correo" 
                        initialValue={usuario.email}
                        helperColor={inputs.email.color}
                        helperText={inputs.email.helper}
                        color={inputs.email.color} />
                    </div>
                  </div>

                  {auth.usuario&&auth.usuario.matactiva === 1 && 
                  <>
                    <Spacer y={1} />
                    <div className="mt-6 grid grid-cols-12 gap-6" >
                      <div className="col-span-12 sm:col-span-6" >
                        <Input.Password  id='contraPerfil' 
                          width={"100%"} 
                          name='password'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Contraseña"
                          color="primary" />
                      </div>
                    </div>
                  </>}

                </div>

                {/* Privacy section */}
                <div className="pt-6 divide-y divide-gray-200">

                  {/*<div className="px-4 sm:px-6">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">Privacy</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                      </p>
                    </div>
                    <ul role="list" className="mt-2 divide-y divide-gray-200">
                      <Switch.Group as="li" className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Available to hire
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={availableToHire}
                          onChange={setAvailableToHire}
                          className={classNames(
                            availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              availableToHire ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                      <Switch.Group as="li" className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Make account private
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={privateAccount}
                          onChange={setPrivateAccount}
                          className={classNames(
                            privateAccount ? 'bg-teal-500' : 'bg-gray-200',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              privateAccount ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                      <Switch.Group as="li" className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Allow commenting
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={allowCommenting}
                          onChange={setAllowCommenting}
                          className={classNames(
                            allowCommenting ? 'bg-teal-500' : 'bg-gray-200',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              allowCommenting ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                      <Switch.Group as="li" className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Allow mentions
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Adipiscing est venenatis enim molestie commodo eu gravid
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={allowMentions}
                          onChange={setAllowMentions}
                          className={classNames(
                            allowMentions ? 'bg-teal-500' : 'bg-gray-200',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              allowMentions ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    </ul>
                  </div>*/}

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

                    {auth.usuario&&auth.usuario.matactiva === 1 && 
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
                            'Guardar'
                        }
                      </button>
                    }

                  </div>
                </div>

              </form>
              
            </div>
          </div>
        </div>
      </main>
    )
}

export default PerfilLayout