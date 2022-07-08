
import { ChangeEvent, Component, Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { useAppContext } from '../auth/authContext'
import Logo from '../components/Logo'
import { Resentemail } from '../helpers/Resentemail'
import Link from 'next/link'
import { NextPage } from 'next';
import { VincularOauth } from '../helpers/VincularOauth'
import Busqueda from '../components/Busqueda'
import { Slide } from '@mui/material'
import FixedMenu from '../components/FixedMenu'
import client from '../apollo-cliente'
import Image from 'next/image'





function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  link?:string
}

export const Home: NextPage<Props> = ({children, link}) => {
  const {auth,logout} = useAppContext();
  
  const user = {
    name: '',
    email: '',
    role: 'Alumno',
    imageUrl:"",
  }

  const localFoto = localStorage.getItem('fotoPerfil') 
  user.imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
      (localFoto?localFoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")
    

    

    let userNavigation = [
        { name: 'Ver perfil', href: '/perfil' },
        { name: 'Configuración', href: '' },
        { name: 'Cerrar sesión', href: '', onMouseUp: logout },
    ];
    let navigation = [
        { name: 'Inicio', href: '/', current: link==="Inicio" },
        { name: 'Perfil', href: '/perfil', current: link==="Perfil" },
        { name: 'Chat en linea', href: '/chat', current: link==="Chat" },
        { name: 'Trámites', href: '/tramites', current: link==="Tramites" },
    ];

    if(!auth?.logged){
        userNavigation = [
            { name: 'Iniciar sesión', href: '/login' },
            { name: 'Registrarse', href: '/signup' },
        ];
        
        navigation = [
            { name: 'Inicio', href: '/', current: true },
            { name: 'Ayuda', href: '#', current: false },
            { name: 'Acerca de', href: '#', current: false },
            
        ];
        
    }else{
      user.name=auth?.usuario?.nombre!
      user.email=auth.email!      
    }

    const onSearch=(event:ChangeEvent)=>{
      const target = event.currentTarget as any
      if(link==="Tramites"){
        
      }
    }

    return (
        <>
          {auth?.logged&&
            <>
              <VincularOauth />          
              <Resentemail />
            </>
          }
          <div className="min-h-full">
            <Popover as="header" className="pb-24 bg-gradient-to-r from-uagrojo to-uagrojo">
              {({ open }) => (
                <>
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  
                    <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                      <div className=" left-0 py-5 flex-shrink-0 lg:static">
                        
                        <a href="#">
                          <span className="sr-only">Workflow</span>
                          <Logo width={50} height={50} />
                        </a>
                        
                      </div>
                          
                      <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                        <button
                          type="button"
                          className="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                            
                        <Menu as="div" className="ml-4 relative flex-shrink-0">
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                              <span className="sr-only">Open user menu</span>
                              <div className="h-8 w-8 rounded-full overflow-hidden" >
                                <Image 
                                  className="h-8 w-8 rounded-full"
                                  width={'100%'}
                                  height={'100%'} 
                                  placeholder='blur' 
                                  blurDataURL={user.imageUrl} 
                                  src={user.imageUrl} alt="" />
                              </div>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link href={item.href} >
                                      <a
                                        
                                        onMouseUp={item.onMouseUp!}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                      
                      <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                        {/*isFixed && <div style={{height: 36}} />*/}
                        
                        <FixedMenu user={user} link={link!} userNavigation={userNavigation} navigation={navigation} />
                        
                          <div id='stickyDiv' className={`lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center`}>
                            
                            <div className="hidden lg:block lg:col-span-2">
                              <nav className="flex space-x-4">
                                {navigation.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                  >
                                    <a 
                                      className={classNames(
                                        item.current ? 'text-white' : 'text-cyan-100',
                                        'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                ))}
                              </nav>
                            </div>

                            {link!=="Signup"&&link!=="Login"&&
                              <Busqueda />
                            }

                          </div>
                          
                      </div>
                          
                      <div className="absolute right-0 flex-shrink-0 lg:hidden">
                        
                        <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
    
                  <Transition.Root as={Fragment}>
                    <div className="lg:hidden">
                      <Transition.Child
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-150 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>
    
                      <Transition.Child
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-150 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Popover.Panel
                          focus
                          className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                            <div className="pt-3 pb-2">
                              <div className="flex items-center justify-between px-4">
                                <div>
                                  <div className="h-8 w-auto" >
                                    <Logo width={50} height={50} />
                                    {/*<Image
                                      width={'100%'}
                                      height={'100%'}
                                      src={Logo}
                                      alt="Workflow"
                                    />*/}
                                  </div>
                                </div>
                                <div className="-mr-2">
                                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                  </Popover.Button>
                                </div>
                              </div>
                              <div className="mt-3 px-2 space-y-1">
                                {navigation.map((item) => (
                                  <Link 
                                    key={item.name}
                                    href={item.href} >
                                    <a
                                      
                                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="pt-4 pb-2">
                              <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full overflow-hidden" >
                                    <Image 
                                      className="h-10 w-10 rounded-full"
                                      width={'100%'}
                                      height={'100%'}
                                      placeholder='blur' 
                                      blurDataURL={user.imageUrl}
                                      src={user.imageUrl} alt="" />
                                  </div>
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                  <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                                  <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                                </div>
                                <button
                                  type="button"
                                  className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                  <span className="sr-only">View notifications</span>
                                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                              </div>
                              <div className="mt-3 px-2 space-y-1">
                                {userNavigation.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                  >
                                    <a
                                      onMouseUp={item.onMouseUp!}
                                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition.Child>
                    </div>
                  </Transition.Root>
                </>
              )}
            </Popover>

            { children }
            
            <footer>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
                  <span className="block sm:inline">&copy; 2022 DAE UAGro.</span>{' '}
                  <span className="block sm:inline">Todos los derechos reservados.</span>
                </div>
              </div>
            </footer>
          </div>
        </>
    )
}