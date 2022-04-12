import { Dialog, Switch, Transition } from '@headlessui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import { useAppContext } from '../auth/authContext'

import {ModalError} from './ModalError'
import {ModalSuccess} from './ModalSucces'
import Contraseña from './settings/Contraseña'
import {General} from './settings/General'

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

export const Settings = ({auth}:any) => {
    
    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)
    const [tabs, setTabs]:any = useState([
        { name: 'General', href: '#', onMouseUp: () => changeTab('General'), current: true },
        { name: 'Contraseña', href: '#', onMouseUp: () => changeTab('Contraseña'), current: false },
    ]);
    const changeSelect = ({target}:any)=>{
        switch(target.selectedIndex){
            case 0:
                changeTab('General')
            break;
            default:
                changeTab('Contraseña')
        }
    }
    const changeTab:any = (t:any) => {
        console.log('change?')
        switch(t){
            case 'Contraseña':
                return setTabs([
                    { name: 'General', href: '#', onMouseUp: () => changeTab('General'),  current: false },
                    { name: 'Contraseña', href: '#', onMouseUp: () => changeTab('Contraseña'), current: true },
                ])
            default:
                return setTabs([
                    { name: 'General', href: '#', onMouseUp: () => changeTab('General'),  current: true },
                    { name: 'Contraseña', href: '#', onMouseUp: () => changeTab('Contraseña'), current: false },
                ])
        }
    }
    /*const tabs:any = [
        { name: 'General', href: '#', current: true },
        { name: 'Contraseña', href: '#', current: false },
      //  { name: 'Notifications', href: '#', current: false },
      //  { name: 'Plan', href: '#', current: false },
      //  { name: 'Billing', href: '#', current: false },
      //  { name: 'Team Members', href: '#', current: false },
    ]*/
    const {updateUser}:any = useAppContext()
    const handleUpG = async() => {
        let nombre:any = document.getElementById("name")!
        nombre=nombre.value
        let newEmail:any = document.getElementById("email")!
        newEmail=newEmail.value
        const {email} = auth
        const user = {id: auth.id, uuid: auth.uuid, nombre, email, newEmail/*, password: auth.password*/}
        const resp = await updateUser(user,"login/update");
        if(!resp){
            setDataModal({title: "Error", txt: "El usuario NO fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalE(true);
        }else{
            setDataModal({title: 'Éxito', txt: "El usuario fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalS(true);
        }
    }

    const handleUpC = async() => {
        let password:any = document.getElementById("password")!
        password=password.value
        let newPass:any = document.getElementById("newPass")!
        newPass=newPass.value
        let confirmPass:any = document.getElementById("confirmPass")!
        confirmPass=confirmPass.value

        if(!password||!newPass||!confirmPass){
            setDataModal({title: "Error", txt: "Favor de rellenar todos los campos.", btnTxt: "Regresar al perfil" })
            setModalE(true);
            return
        }

        if(newPass!==confirmPass){
            setDataModal({title: "Error", txt: "Favor de verificar que las contraseñas coincidan.", btnTxt: "Regresar al perfil" })
            setModalE(true);
            return
        }



        const {name,email} = auth
        const user = {id: auth.id, uuid: auth.uuid, /*nombre:name,*/ email, password, newPass}
        const resp = await updateUser(user,"login/updatePass");
        if(!resp){
            setDataModal({title: "Error", txt: "El usuario NO fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalE(true);
        }else{
            setDataModal({title: 'Éxito', txt: "El usuario fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalS(true);
        }
    }
    /*if(!auth){
        return<></>
    }*/
    return ( <>
        {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
        txt={dataModal.txt} btnTxt={dataModal.btnTxt} />}
        {modalE && <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
        txt={dataModal.txt} btnTxt={dataModal.btnTxt} />}
       
        <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-900">Configuración</h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          onChange={changeSelect}
                          className="mt-1 tabSettings block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                          defaultValue={tabs.find((tab:any) => tab.current).name}
                        >
                          {tabs.map((tab:any) => (
                            
                                <option key={tab.name} >{tab.name}</option>
                            
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab:any) => (
                              <a
                                key={tab.name}
                                onMouseUp={tab.onMouseUp}
                                className={classNames(
                                  tab.current
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent tabSettings text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      {tabs.map((tab:any,i:any)=>{
                          if(tab.name==="General"&&tab.current){
                              return <General key={i} handleUp={handleUpG} auth={auth} />
                          }
                          if(tab.name==="Contraseña"&&tab.current){
                            return <Contraseña key={i} handleUp={handleUpC} auth={auth} />
                        }
                      })}

                      {/*<div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Manage how information is displayed on your account.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">Language</dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">English</span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">Date format</dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">DD-MM-YYYY</span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                  <span className="text-gray-300" aria-hidden="true">
                                    |
                                  </span>
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Remove
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                Automatic timezone
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={automaticTimezoneEnabled}
                                  onChange={setAutomaticTimezoneEnabled}
                                  className={classNames(
                                    automaticTimezoneEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      automaticTimezoneEnabled ? 'translate-x-5' : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                            >
                              <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                Auto-update applicant data
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={autoUpdateApplicantDataEnabled}
                                  onChange={setAutoUpdateApplicantDataEnabled}
                                  className={classNames(
                                    autoUpdateApplicantDataEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      autoUpdateApplicantDataEnabled ? 'translate-x-5' : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                          </dl>
                        </div>
                    </div>*/}

                    </div>
                  </div>
                </div>
              </div>
            </main>
    </>)
}

export default ()=>null