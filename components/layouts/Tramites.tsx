
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    CashIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
  } from '@heroicons/react/outline'
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { useAppContext } from '../../auth/authContext'; 
import { TablaInicial, TramitesPrincipales } from '../tramites';
  
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}
const Home = () => {
    const {auth,logout}:any = useAppContext();
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
          icon: ClockIcon,
          name: 'Request time off',
          href: '#',
          iconForeground: 'text-teal-700',
          iconBackground: 'bg-teal-50',
        },
        {
          icon: BadgeCheckIcon,
          name: 'Benefits',
          href: '#',
          iconForeground: 'text-purple-700',
          iconBackground: 'bg-purple-50',
        },
        {
          icon: UsersIcon,
          name: 'Schedule a one-on-one',
          href: '#',
          iconForeground: 'text-sky-700',
          iconBackground: 'bg-sky-50',
        },
        { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
        {
          icon: ReceiptRefundIcon,
          name: 'Submit an expense',
          href: '#',
          iconForeground: 'text-rose-700',
          iconBackground: 'bg-rose-50',
        },
        {
          icon: AcademicCapIcon,
          name: 'Training',
          href: '#',
          iconForeground: 'text-indigo-700',
          iconBackground: 'bg-indigo-50',
        },
      ]
      const recentHires = [
        {
          name: 'Leonard Krasner',
          handle: 'leonardkrasner',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          href: '#',
        },
        {
          name: 'Floyd Miles',
          handle: 'floydmiles',
          imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          href: '#',
        },
        {
          name: 'Emily Selman',
          handle: 'emilyselman',
          imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          href: '#',
        },
        {
          name: 'Kristin Watson',
          handle: 'kristinwatson',
          imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          href: '#',
        },
      ]
      const announcements = [
        {
          id: 1,
          title: 'Office closed on July 2nd',
          href: '#',
          preview:
            'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
        },
        {
          id: 2,
          title: 'New password policy',
          href: '#',
          preview:
            'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
        },
        {
          id: 3,
          title: 'Office closed on July 2nd',
          href: '#',
          preview:
            'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
        },
      ]
      const stats = [
        { label: 'Vacation days left', value: 12 },
        { label: 'Sick days left', value: 4 },
        { label: 'Personal days left', value: 2 },
      ]
     // let [btnHome, setBtnHome]:any = useState([{html: 'Ver perfil', href: '#'}]);
      const ShowGridLog = () => {
        setState({...state, 
            logBand: !state.logBand,
            //btnHome: [{html: 'Iniciar sesión', onMouseUp: ShowGridLog }]
        });
        //setLogBand(!logBand);
        //setBtnHome( [{html: 'Iniciar sesión', onMouseUp: ShowGridLog }]);  
      }
      
      console.log('home:')
      console.log(auth)

      if(!auth.email){
        state.btnHome = [{
            html: state.logBand?'Registrar cuenta':'Iniciar sesión',
            onMouseUp: ShowGridLog 
        }];
      }else{
        state.btnHome = [{html: 'Ver perfil', href: '/perfil', onMouseUp: null}];
      }

      const {logBand, btnHome} = state 

    return (
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Tramites</h1>
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
                                <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">Bienvenido(a),</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                                {/*<p className="text-xl font-bold text-gray-900 sm:text-2xl">{auth.email}</p>*/}
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
    
                    {// Actions panel 
                    }
                    <section aria-labelledby="quick-links-title">
                        
                      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
                        <div className='relative bg-white p-6' >
                             
                            <TramitesPrincipales />
                            <TablaInicial />
                          
                        
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