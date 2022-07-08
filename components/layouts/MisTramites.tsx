import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAppContext } from '../../auth/authContext'; 
import { TablaInicial, TramitesPrincipales } from '../misTramites';
 
const Home = () => {
    const {auth}:any = useAppContext();
    const [state, setState]:any = useState({logBand: true, btnHome: [{html: 'Ver perfil', href: '/perfil'}]});
    const user = {
        name: auth.usuario?auth.usuario.alumno.nomentalu:null,
        email: auth.email,
        role: 'Alumno(a)',
        imageUrl:'',
    }

    const localFoto = localStorage.getItem('fotoPerfil') 
    user.imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
      (localFoto?localFoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")
 
      const stats = [
        { label: /*'Vacation days left'*/'', value: /*0*/'' },
        { label: '', value: '' },
        { label: '', value: '' },
      ]
     

      const {btnHome} = state 

    return (
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Mis Tramites</h1>
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-2 lg:gap-8">

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
                                <div className="mx-auto h-20 w-20 rounded-full overflow-hidden" >
                                  <Image 
                                    className="mx-auto h-20 w-20 rounded-full"
                                    width={'100%'}
                                    height={'100%'}
                                    placeholder='blur' 
                                    blurDataURL={user.imageUrl} 
                                    src={user.imageUrl} alt="" 
                                  />
                                </div>
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
                    
                    
                      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
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