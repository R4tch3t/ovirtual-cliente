import { FC, useEffect, useState,Fragment } from "react"
import { Slide } from "@mui/material"
import {
    BellIcon, MenuIcon, XIcon,
} from '@heroicons/react/outline'
import { Menu, Transition, Popover } from '@headlessui/react'
import Link from "next/link"
import Busqueda from "./Busqueda"   
import Logo from './Logo'
import Image from "next/image"

type Props =     {
    link: string,
    userNavigation:any,
    navigation:any,
    user:any
}

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const FixedMenu:FC<Props> = ({user,link,userNavigation,navigation}) => {
    const [isFixed, setIsFixed] = useState(false)
    const [windowH, setWindowH] = useState(0)
    useEffect(()=>{
        setWindowH(window.innerHeight)
        const stickyDiv = document.getElementById('stickyDiv')
        window!.onscroll=((event:Event)=>{

            if((stickyDiv?.offsetTop!-90)<window.scrollY){
                setIsFixed(true)
            }

            if((window.scrollY-20)<stickyDiv?.offsetTop!){
                setIsFixed(false)
            }

        })

    },[])

    const upHeight = ()=>{
        setWindowH(window.innerHeight)
    }

    return (<>
        <Slide direction="down" in={isFixed} mountOnEnter unmountOnExit>
    
        <div className={`fixed left-0 w-full py-10 fixed z-999 top-0 bg-gradient-to-r from-uagrojo to-uagrojo`} > 
                        
                         <div className="absolute right-10 bottom-7 hidden lg:ml-4 lg:flex lg:items-center">
                            <button
                              type="button"
                              className="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                                
                            <Menu as="div" className="ml-4 flex-shrink-0">
                              <div>
                                <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                  <span className="sr-only">Open user menu</span>
                                  <div className="h-8 w-8 rounded-full" >
                                    <Image 
                                      className="h-8 w-8 rounded-full" 
                                      width={'100%'} height={'100%'}  
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
                                  {userNavigation.map((item: any) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link href={item.href} >
                                          <a
                                            
                                            onMouseUp={item.onMouseUp}
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
                        
                        
                            <div className="absolute left-5 top-3" >
                                <Logo width={50} height={50} />
                            </div>
                            <div className={`absolute z-999 top-5 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center`}
                                style={{left: 100}}
                            >
                            
                            <div className="hidden lg:block lg:col-span-2">
                              <nav className="flex space-x-4">
                                {navigation.map((item:any) => (
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

                            

                          </div>
                            <div className="absolute bottom-6" style={{width: 350, right: 125}} >
                                {link!=="Signup"&&link!=="Login"&&
                                <Busqueda />                              
                                }
                            </div>
                            <Popover as="header" className="lg:hidden">
                            {({ open }) => (<>
                                <div onMouseDown={upHeight} className="absolute right-3 bottom-6 flex-shrink-0 lg:hidden">
                            
                                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                    </Popover.Button>

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
                                    <div style={{height: windowH, overflowY:'auto'}} >
                                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                                        
                                            <div className="pt-3 pb-2">
                                            <div className="flex items-center justify-between px-4">
                                                <div>
                                                <Logo width={50} height={50} />
                                                </div>
                                                <div className="-mr-2">
                                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                                    <span className="sr-only">Close menu</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-3 px-2 space-y-1">
                                                {navigation.map((item:any) => (
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
                                                <div className="h-10 w-10 rounded-full" >
                                                  <Image 
                                                    //className="h-10 w-10 rounded-full"
                                                    width={'100%'}
                                                    height={'100%'}
                                                    placeholder='blur' 
                                                    blurDataURL={user.imageUrl}
                                                    src={user.imageUrl} alt="" 
                                                  />
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
                                                {userNavigation.map((item:any) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                >
                                                    <a
                                                    onMouseUp={item.onMouseUp}
                                                    className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                    {item.name}
                                                    </a>
                                                </Link>
                                                ))}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    </Popover.Panel>
                                </Transition.Child>
                                </div>
                            </Transition.Root>
                        </>)}
                            </Popover>

                          </div>
                        
                        </Slide>
                        </>
    )
}

export default FixedMenu