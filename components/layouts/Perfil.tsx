import { useState, useEffect } from 'react'
import {
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  CollectionIcon
} from '@heroicons/react/outline'
import { ExclamationIcon } from '@heroicons/react/solid'
import { urlBase } from '../../variables/url'
import { Button, Input, Loading, Spacer } from "@nextui-org/react";
import { useAppContext } from '../../auth/authContext';
import VincularMatricula from '../settings/VincularMatricula';
import ActivarMatricula from '../settings/ActivarMatricula';
import { ModalSuccess } from '../ModalSucces';
import { ModalError } from '../ModalError';
import Link from 'next/link';
import { retornarPrimerMat } from '../../helpers/retornarPrimerMat';
import CambiarContraseña from '../settings/CambiarContraseña';
import ListMatriculas from '../listMatriculas';
import { ConfirmarMatricula } from '../../helpers/ConfirmarMatricula';
import Info from '../Info';
import ImageNext from 'next/image';
import { setAvatarGQL } from '../../apollo-cliente/login/setAvatar';
import client from '../../apollo-cliente';

let subNavigation = [
  { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: true },
  { name: 'Contraseña', href: '/perfil/contra', icon: KeyIcon, current: false },
  { name: 'Expediente', href: '/perfil/expediente', icon: CollectionIcon, current: false },
  { name: 'Notificaciones', href: '#', icon: BellIcon, current: false },
  { name: 'Facturación', href: '#', icon: CreditCardIcon, current: false },
]


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const WarningPass = () => {
  return <>
    <KeyIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
  </>
}


const PerfilLayout = () => {
  const {auth, vincularMatricula, updateUser,actualizadoContra, verificaToken} = useAppContext();
  const [usuario, setUsuario]:any = useState({
    id: auth?.id!, 
    nombreUsuario: auth?.usuario? auth?.usuario.nombre:null,
    name: auth?.usuario ? auth?.usuario.alumno.nomentalu:null,
    apellidos: auth?.usuario! ? auth?.usuario?.alumno?.apeentalu?.split('*'):null,
    apellido: null,
    apellido2: null,
    email: auth?.email,
    newEmail: auth?.email,
    matricula: auth?.usuario?retornarPrimerMat(auth?.usuario?.matricula!):null,
    password: '',
    role: 'Alumno(a)',
    imageUrl:'',
  });
  
  const localFoto = localStorage.getItem('fotoPerfil') 
  usuario.imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
      (localFoto?localFoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")

  const [cargando, setCargando] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [modalSMat, setModalSMat] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [inputs, setInputs]:any = useState({
    matricula: {color: 'secondary'},
    email: {color: 'primary'},
    password: {color: 'primary'}
  })
  const [advContra, setAdvContra] = useState(false)
  const [clickEnviar, setClickEnviar] = useState(false)
  const [cargandoFoto, setCargandoFoto] = useState(false)

  const validarMatricula = (value:string='') => {
    let valida:any = value.match(/^[0-9]{8,8}$/i);
    const matriculas = JSON.parse(auth?.usuario?.matricula!)
    let helper = 'Matrícula invalida'
    const matElement:any = document.getElementById('matriculaPerfil')
    if(matElement.value===value){
      matriculas.map((m:any)=>{
        if(m.matricula===value){
          helper = 'La matrícula ya se ha vinculado'
          valida=false;
        }
      })
    }else{
      valida=false
    }
    const name='matricula'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper,
        statusColor: 'error'
      }})
    }

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
  
    if(valida){
      setInputs({...inputs,[name]:{
        color: 'primary', 
        helper: undefined
      }})
    }
    return valida
  };

  const onChange = ({target}:any) => {
     
    const {name, value} = target;

    switch(name){
      case 'matricula':
        validarMatricula(value)
      break
      case 'email':
        validarCorreo(value)
      break
      case 'apellido':
        usuario.apellidos![0]=value
      break
      case 'apellido2':
        usuario.apellidos![1]=value
      break
      case 'password':
        if(value){
          const name='password'
          setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: '',
            statusColor: 'primary'
          }})
        }
        break;
    }

    setUsuario({
      ...usuario,
      [name]: value
    });
  
  }

  const abrirModalMat = () =>{
    let {matricula} = usuario
    let valida = matricula?validarMatricula(matricula):validarMatricula()
    
    if(!valida){
      return false
    }

    setClickEnviar(true)

  }

  const vincularM = async() => {
    

    setCargando(true)
    const ok = await vincularMatricula(usuario! as any)
    
    if(ok!==true){
      setDataModal({title: "Error", txt: ok as any, btn1: {txt:"Regresar al perfil", onClose:setModalE} })
      setModalE(true);
      setModalSMat(false);
      setClickEnviar(false);
    }else{
      setDataModal({
        title: "Éxito", txt: 'La matrícula se ha vinculado...', 
        btn1: {txt:"Regresar al perfil", onClose:setModalSMat} 
      })
      setModalSMat(true);
    }

    

    setCargando(false)
   
  }

  const onSubmit = async (e:any) => {
  
    if(!usuario.password){
      const name='password'
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Campo requerido',
        statusColor: 'error'
      }})
      return false
    }

    const newEmail = usuario.email
    usuario.newEmail=newEmail
    usuario.email = auth?.email
    usuario.apellidos=usuario.apellidos!.join('*');

    
    setCargando(true)

    const resp = await updateUser!(usuario,"login/update");
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
    actualizadoContra(auth?.id!).then((r:any)=>{
      
      if(r.respNecesarioCambiarPass===true){
        subNavigation[1].icon=WarningPass
        setAdvContra(true)        
      }

    });
    
  },[actualizadoContra])

  //si la matricula no esta vinculada a la cuenta de la sesion
  if(auth?.usuario&&auth.usuario.matactiva === 0){
    subNavigation = [
      { name: 'Perfil', href: '/perfil', icon: UserCircleIcon, current: true },
      { name: 'Notificaciones', href: '#', icon: BellIcon, current: false },
    ]
  }

  type Base64 = (file: any) => Promise<unknown>
    

    const toBase64:Base64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (readerEvent) => {
          let image = new Image();
          
          image.onload = (imageEvent) => {
            // Resize the image
            var canvas = document.createElement('canvas'),
            max_size = 544,// TODO : pull max size from a site config
            width = image.width,
            height = image.height;
            if (width > height) {
                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }
            } else {
                if (height > max_size) {
                    width *= max_size / height;
                    height = max_size;
                }
            }
            canvas.style.background='transparent'
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
            let imgData=canvas.getContext('2d')?.getImageData(0,0,canvas.width,canvas.height);
            let data=imgData?.data!;
            for(let i=0;i<data.length;i+=4){
                if(data[i+3]<255){
                    data[i]=255;
                    data[i+1]=255;
                    data[i+2]=255;
                    data[i+3]=255;
                }
            }   
            canvas.getContext('2d')?.putImageData(imgData!,0,0)
            let dataUrl = canvas.toDataURL('image/jpeg');        
            resolve(dataUrl)
          }
          image.src = readerEvent?.target?.result! as string;          
        };
        reader.readAsDataURL(file);
        reader.onerror = error => reject(error);
    });

    const selectFile = async () => {    
        let fileIn = document.querySelector('#file-input') as any//!.files[0]
        let file=fileIn.files[0]
        if(!file){
          fileIn = document.querySelector('#file-input2') as any
          file=fileIn.files[0]
        }
        
        if(!file.type.match(/image.*/)) {
          return 
        }

        console.log('pass')

        let result:any = await toBase64(file).catch(e => e);
        if (result instanceof Error) {
            console.log('Error: ', result.message);
            return;
        }
        
        fileIn.value=null
        
        result = result.split('base64,')
        result = result.pop() 
        
        await subirAvatar(
          auth?.usuario?.id!,
          result as string
        )
        
    };

    const subirAvatar = async (userId:number,base64:string) => {
      setCargandoFoto(true)
      const bufferMax = 1024 * 64
      let buffer = 0
      let bufferLength = base64.length
      let part64 = ''
      const descripcion = ''
      let actualizar = true
      const alumno = {
        id: userId!
      }
      const archivo = {
        actualizar,
        base64: part64//: result! as string  
      } 
      

      while(buffer<bufferMax&&buffer<bufferLength){
        part64 += base64[buffer++]
      }

      archivo.base64=part64

      const respDoc = await setAvatarGQL(alumno,archivo)
            
      archivo.actualizar=false!

      while(buffer<bufferLength){
        const nextBuffer = buffer + bufferMax
        part64 = ''
        while(buffer<nextBuffer&&buffer<bufferLength){
          part64 += base64[buffer++]
        }
        
        archivo.base64 = part64
        await setAvatarGQL(alumno,archivo)

      }
      await client.cache.reset()
      await verificaToken!()
      setCargandoFoto(false)
    }
 
  //const matriculas = auth?.usuario?.matricula! ? JSON.parse(auth?.usuario?.matricula!):[]

    return (
        <main className="relative -mt-24">
          <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
          <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={dataModal.btn1} />
            
          <ConfirmarMatricula onSubmit={vincularM} open={clickEnviar} setOpen={setClickEnviar} >
            <ModalSuccess open={modalSMat} setOpen={()=>{
                setModalSMat(false);
                setClickEnviar(false);
              }} 
              title={dataModal.title} 
              txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
        
          </ConfirmarMatricula>

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
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Perfil</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Tener cuidado con la información que se administrará a continuación
                    </p>
                  </div>

                  <Spacer y={1} />
                    {advContra && <CambiarContraseña />}

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
                            <div className="flex items-center rounded-full h-full w-full" >
                              <ImageNext 
                                className="flex items-center rounded-full h-full w-full"
                                width={'100%'}
                                height={'100%'}
                                placeholder='blur' 
                                blurDataURL={usuario.imageUrl} 
                                src={usuario.imageUrl} alt="" 
                              />
                            </div>
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
                                id="file-input"
                                name="user-photo"
                                type="file"
                                accept="image/*"
                                className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                onChange={selectFile}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden relative rounded-full overflow-hidden lg:block">
                        
                        <div className="rounded-full w-40 h-40" style={{filter: (cargandoFoto?"blur(4px)":'')}} >
                          
                            <ImageNext 
                              
                              layout="fill" 
                              placeholder='blur' 
                              
                              blurDataURL={usuario.imageUrl} 
                              src={usuario.imageUrl} alt="" 
                            />
                          
                        </div>

                        {cargandoFoto &&
                          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium" >
                            <Loading type="spinner" color='white' size="lg" />
                          </div>
                        }

                        {!cargandoFoto &&
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                          >
                            <span>Cambiar</span>
                            <span className="sr-only"> Foto de usuario</span>
                            <input
                              type="file"
                              id="file-input2"
                              name="user-photo"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                              onChange={selectFile}
                            />
                          </label>
                        }

                      </div>
                    </div>
                  </div>
                  
                  <Spacer y={1} />
                          {auth?.usuario&&auth.usuario.matactiva === 0 && <VincularMatricula />}
                          {auth?.usuario&&auth.usuario.matactiva === 0.5 && <ActivarMatricula />}
                  
                  <Spacer y={1} />                  

                   <div className="mt-6 grid grid-cols-12 gap-6">
                    <div  className="col-span-12 sm:col-span-6">
                      
                      <ListMatriculas 
                        setDataModal={setDataModal}
                        setModalE={setModalE}
                        setModalS={setModalS}
                      />                      

                    </div>
                  </div>

                  <Spacer y={1} />
                  
                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      
                      <Input id='matriculaPerfil' 
                        width={"100%"} 
                        name='matricula'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Vincular otra Matrícula" 
                        //initialValue={usuario?.matricula!} 
                        helperColor={inputs.matricula.color}
                        helperText={inputs.matricula.helper}
                        color={inputs.matricula.color} />
                    </div>
                    <div >
                    <Button   
                      id='vincularB'
                      name='matricula'
                      shadow color="secondary" 
                      onMouseUp={abrirModalMat}
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
                        name='apellido'
                        onChange={onChange}
                        clearable bordered labelPlaceholder="Primer Apellido" 
                        initialValue={usuario.apellidos![0]!}
                        color="primary" />
                    </div>
                  </div>

                  <Spacer y={1} />
                  <div className="mt-6 grid grid-cols-12 gap-6" >
                    <div className="col-span-12 sm:col-span-6">
                      <Input id='ape2Perfil' 
                          width={"100%"} 
                          name='apellido2'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Segundo Apellido" 
                          initialValue={usuario.apellidos![1]!}
                          color="primary" />
                    </div>
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

                  {auth?.usuario&&auth.usuario.matactiva === 1 && 
                  <>
                    <Spacer y={1} />
                    <div className="mt-6 grid grid-cols-12 gap-6" >
                      <div className="col-span-12 sm:col-span-6" >
                        <Input.Password  id='contraPerfil' 
                          width={"100%"} 
                          name='password'
                          onChange={onChange}
                          clearable bordered labelPlaceholder="Contraseña"
                          helperColor={inputs.password.color}
                          helperText={inputs.password.helper}
                          color={inputs.password.color} />
                      </div>
                    </div>
                  </>}

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
                        Cancelar
                      </Link>
                    </button>

                    {auth?.usuario&&auth.usuario.matactiva === 1 && 
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