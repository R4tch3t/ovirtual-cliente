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
    
    const {updateUser}:any = useAppContext()
    const handleUpG = async() => {
        let nombre:any = document.getElementById("name")!
        nombre=nombre.value
        let newEmail:any = document.getElementById("email")!
        newEmail=newEmail.value
        const {email} = auth
        const user = {id: auth.id, uuid: auth.uuid, nombre, email, newEmail}
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

        const {email} = auth
        const user = {id: auth.id, uuid: auth.uuid, email, password, newPass}
        const resp = await updateUser(user,"login/updatePass");
        if(!resp){
            setDataModal({title: "Error", txt: "El usuario NO fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalE(true);
        }else{
            setDataModal({title: 'Éxito', txt: "El usuario fue actualizado.", btnTxt: "Regresar al perfil" })
            setModalS(true);
        }
    }
    
    return ( <>
        <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
          txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
        <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
          txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
       
        <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-900">Configuración</h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      
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

                      {tabs.map((tab:any,i:any)=>{
                          if(tab.name==="General"&&tab.current){
                              return <General key={i} handleUp={handleUpG} auth={auth} />
                          }
                          if(tab.name==="Contraseña"&&tab.current){
                            return <Contraseña key={i} handleUp={handleUpC} auth={auth} />
                        }
                      })}                     

                    </div>
                  </div>
                </div>
              </div>
            </main>
    </>)
}