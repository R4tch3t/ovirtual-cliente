
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
import HomeActions from '../HomeActions';
  
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
    const actionsOne = [
      {
        icon: AcademicCapIcon,
        name: 'Proceso de Inscripción 2022 - 2023',
        href: '/inscripciones',
        descripcion: 'Aquí podrá iniciar el proceso de inscripcion para el próximo ciclo escolar.',
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
      }
    ]

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
        { label: /*'Vacation days left'*/'', value: ''/*12*/ },
        { label: /*'Sick days left'*/'', value: ''/*4*/ },
        { label: /*'Personal days left'*/'', value: ''/*2*/ },
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
                          {stats.map((stat,i) => (
                            <div key={i+"stats"} className="px-6 py-5 text-sm font-medium text-center">
                              <span className="text-gray-900">{stat.value}</span>{' '}
                              <span className="text-gray-600">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
    
                    <section aria-labelledby="quick-links-title">
                    
                      <HomeActions card='inscripciones' nCol={1} actions={actionsOne} />
                      <HomeActions nCol={2} actions={actions} />
                   
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
