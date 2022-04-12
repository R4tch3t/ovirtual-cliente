import { ReactElement, useState } from 'react';
import { useAppContext } from '../../auth/authContext'; 
import { Button, Grid, Input, Spacer } from "@nextui-org/react";
import ActivarMatricula from "../settings/ActivarMatricula"
import VincularMatricula from "../settings/VincularMatricula"
import { Loading } from '@nextui-org/react';
import { ModalError } from '../ModalError';
import { ModalSuccess } from '../ModalSucces';
//import { ModalSuccess } from '../ModalSucces';

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}
const Home = () => {
    const {auth, vincularMatricula, updateUser}:any = useAppContext();
    //const {vincularMatricula} = useAppContext();
    const [modalE, setModalE] = useState(false)
    const [modalS, setModalS] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})

    const [state, setState]:any = useState({logBand: true, btnPerfil: [{html: 'Guardar cambios', href: undefined}]});
    const [usuario, setUsuario] = useState({
        id: auth.id, 
        name: auth.usuario ? auth.usuario.alumno.nomentalu:null,
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

    const [inputs, setInputs]:any = useState({
      matricula: {color: 'secondary'},
      email: {color: 'primary'}
    })
    
      const stats = [
        { label: 'Vacation days left', value: 12 },
        { label: 'Sick days left', value: 4 },
        { label: 'Personal days left', value: 2 },
      ]
     

      /*if(!auth.email){
        state.btnPerfil = [{
            html: state.logBand?'Registrar cuenta':'Iniciar sesión',
            onMouseUp: ShowGridLog 
        }];
      }else{
        state.btnPerfil = [{html: 'Ver perfil', href: undefined, onMouseUp: null}];
      }*/
      
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
        const valida = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
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

      const {logBand, btnPerfil} = state 

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
        console.log('onSumbit')

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
      state.btnPerfil[0].onMouseUp = onSubmit
    return (
      <main className="-mt-24 pb-8">
        {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
        txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />}
        {modalE && <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
        txt={dataModal.txt} btn1={dataModal.btn1} />}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Perfil</h1>
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-2 lg:gap-8">


                  {/* Left column */ }
                  <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                    {// Welcome panel 
                    }
                    <section aria-labelledby="profile-overview-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <h2 className="sr-only" id="profile-overview-title">
                          Resumen del perfil
                        </h2>
                        <div className="bg-white p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-5">
                              <div className="flex-shrink-0">
                                <img className="mx-auto h-20 w-20 rounded-full" src={usuario.imageUrl} alt="" />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">Bienvenido(a),</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{usuario.name}</p>
                                {/*<p className="text-xl font-bold text-gray-900 sm:text-2xl">{auth.email}</p>*/}
                                <p className="text-sm font-medium text-gray-600">{usuario.role}</p>
                              </div>
                            </div>
                            
                            
                            
                          </div>
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                          {stats.map((stat) => (
                            <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                              <span className="text-gray-900">{stat.value}</span>{' '}
                              <span className="text-gray-600">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
    
                    {// Actions panel 
                    }
                    <section aria-labelledby="quick-links-title">
                      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
                        <h2 className="sr-only" id="quick-links-title">
                          Quick links
                        </h2>
                        
                        <div className='relative bg-white p-6' >
                          
                          <div className='w-full config' >
                              <h2>  EDITAR PERFIL </h2>
                          </div>
                          <Spacer y={1} />
                          {auth.usuario&&auth.usuario.matactiva === 0 && <VincularMatricula />}
                          {auth.usuario&&auth.usuario.matactiva === 0.5 && <ActivarMatricula />}
                          <Spacer y={1} />

                          <Grid.Container gap={1}>
                            <Grid style={{width: '60%'}} >
                              <Input id='matriculaPerfil' 
                                width={"100%"} 
                                name='matricula'
                                onChange={onChange}
                                clearable bordered labelPlaceholder="Matrícula" 
                                initialValue={usuario.matricula} 
                                helperColor={inputs.matricula.color}
                                helperText={inputs.matricula.helper}
                                color={inputs.matricula.color} />
                            </Grid>
                            <Grid>
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
                            </Grid>
                          </Grid.Container>

                          <Spacer y={2.5} />
                          <Input id='nombrePerfil' 
                            width={"60%"} 
                            name='name'
                            onChange={onChange}
                            clearable bordered labelPlaceholder="Nombre" 
                            initialValue={usuario.name}
                            color="primary" />
                          <Spacer y={2.5} />
                          <Input id='correoPerfil'
                           width={"60%"} 
                           name='email'
                           onChange={onChange}
                           clearable bordered labelPlaceholder="Correo" 
                           initialValue={usuario.email}
                           helperColor={inputs.email.color}
                           helperText={inputs.email.helper}
                           color={inputs.email.color} />
                          <Spacer y={2.5} />
                          {auth.usuario&&auth.usuario.matactiva === 1 && 
                          <>
                            <Input.Password  id='contraPerfil' 
                              width={"60%"} 
                              name='password'
                              onChange={onChange}
                              clearable bordered labelPlaceholder="Contraseña"
                              color="primary" />
                            <Spacer y={2.5} />
                          </>}

                          {auth.usuario&&auth.usuario.matactiva === 1 && 
                          <div className="mt-5 flex justify-center sm:mt-0">
                              
                              {
                                btnPerfil.map((b:any,i:any)=>{
                                    return <a
                                    key={i}
                                    href={b.href}
                                    onMouseUp={b.onMouseUp}
                                    className="flex tabSettings justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                  >
                                    <div className='guardarPerfil' >
                                      {
                                      cargando ? 
                                        <Loading className="w-8 h-5" type="points-opacity" color="secondary" size="sm" />
                                        :
                                        b.html
                                      }
                                    </div>
                                  </a>
                                })
                              }

                            </div>
                            }

                        </div>
                        
                        {/*actions.map((action, actionIdx) => (
                          <div
                            key={action.name}
                            className={classNames(
                              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                            )}
                          >
                            <div>
                              <span
                                className={classNames(
                                  action.iconBackground,
                                  action.iconForeground,
                                  'rounded-lg inline-flex p-3 ring-4 ring-white'
                                )}
                              >
                                <action.icon className="h-6 w-6" aria-hidden="true" />
                              </span>
                            </div>
                            <div className="mt-8">
                              <h3 className="text-lg font-medium">
                                <a href={action.href} className="focus:outline-none">
                                  {// Extend touch target to entire panel 
                                  }
                                  <span className="absolute inset-0" aria-hidden="true" />
                                  {action.name}
                                </a>
                              </h3>
                              <p className="mt-2 text-sm text-gray-500">
                                Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at
                                blanditiis et quo et molestiae.
                              </p>
                            </div>
                            <span
                              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                              aria-hidden="true"
                            >
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                              </svg>
                            </span>
                          </div>
                        ))*/}
                      </div>
                    </section>
                  </div>
    
                  {// Right column 
                  }
                  

          </div>
        </div>
      </main>
              
                
    )
}

export default Home

Home.getLayout = function getLayout( page:ReactElement ){
  <main className="-mt-24 pb-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">Perfil</h1>
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {page}
          </div>
    </div>
  </main>
}