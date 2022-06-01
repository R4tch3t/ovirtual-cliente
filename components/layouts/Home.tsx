
import {
    AcademicCapIcon,
    ChatAlt2Icon,
  } from '@heroicons/react/outline'
import Link from 'next/link';
import { useState } from 'react';
import { useAppContext } from '../../auth/authContext'; 
import Login from '../Login';
import Signup from '../Signup';
import {LogoDae} from '../Logo'
  
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}
const Home = () => {
    const {auth}:any = useAppContext();
    const [state, setState]:any = useState({logBand: true, btnHome: [{html: 'Ver perfil', href: '/perfil'}]});
    const user = {
        name: auth.usuario?auth.usuario.alumno.nomentalu:null,
        email: auth.email,
        role: 'Alumno(a)',
        imageUrl:
        "https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg",
    }
    
    const actions = [
        {
          icon: AcademicCapIcon,
          name: 'Trámites',
          href: '/tramites',
          descripcion: 'Aquí podrá seleccionar los diferentes trámites disponibles.',
          iconForeground: 'text-indigo-700',
          iconBackground: 'bg-indigo-50',
        },
        {
          icon: ChatAlt2Icon,
          name: 'Chat en linea',
          href: '/chat',
          descripcion: 'Intercambio de mensajes en linea entre alumnos, docentes y trabajadores de la universidad.',
          iconForeground: 'text-sky-700',
          iconBackground: 'bg-sky-50',
        },
        
      ]
      
      
      const stats = [
        { label: 'Vacation days left', value: 12 },
        { label: 'Sick days left', value: 4 },
        { label: 'Personal days left', value: 2 },
      ]
      
      const ShowGridLog = () => {
        setState({...state, 
            logBand: !state.logBand,
        });
      }
      
      if(!auth.email){
        state.btnHome = [{
            html: state.logBand?'Registrar cuenta':'Iniciar sesión',
            onMouseUp: ShowGridLog,
            href: ''

        }];
      }else{
        state.btnHome = [{html: 'Ver perfil', href: '/perfil', onMouseUp: null}];
      }

      const {logBand, btnHome} = state 

    return (
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Perfil</h1>
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">

                  <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                    
                    <section aria-labelledby="profile-overview-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <h2 className="sr-only" id="profile-overview-title">
                          Resumen del perfil
                        </h2>
                        <div className="bg-white p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-5">
                              <div className="flex-shrink-0">
                                <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">Bienvenido(a),</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                                <p className="text-sm font-medium text-gray-600">{user.role}</p>
                              </div>
                            </div>
                            
                            <div className="mt-5 flex justify-center sm:mt-0">
                            {
                                btnHome.map((b:any,i:any)=> 
                                    (
                                    <Link 
                                      key={i}
                                      href={b.href} >
                                      <a
                                        onMouseUp={b.onMouseUp}
                                        className="flex tabSettings justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                      >
                                        {b.html}
                                      </a>
                                    </Link>
                                    )
                                )
                              }
                              

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
    
                    <section aria-labelledby="quick-links-title">
                      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        <h2 className="sr-only" id="quick-links-title">
                          Quick links
                        </h2>
                        {actions.map((action, actionIdx) => (
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
                                <Link href={action.href} >
                                  <a  className="focus:outline-none">                                
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {action.name}
                                  </a>
                                </Link>
                              </h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {action.descripcion}
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
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    
                    <section aria-labelledby="announcements-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <div className="p-6">
                          
                          <div className="flow-root mt-6">                                                
                            {!auth.logged&&logBand&&<Login />}
                            {!auth.logged&&!logBand&&<Signup />}
                            {auth.logged&&<LogoDae width={400} height={400} />}
                          </div>

                        </div>
                      </div>
                    </section>                    

                  </div>

          </div>
        </div>
      </main>
              
                
    )
}

export default Home
