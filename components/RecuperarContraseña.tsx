import { Loading } from '@nextui-org/react';
import type {NextPage} from 'next'
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { recuperarContrasenaGQL } from '../apollo-cliente/perfil';
import { useAppContext } from '../auth/authContext';
import { ModalError } from './ModalError';
import { ModalSuccess } from './ModalSucces';


const RecuperarContraseña: NextPage = () => {
  const {auth}:any = useAppContext();
  const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
    const {signup}:any = useAppContext()
    const [registrando, setRegistrando] = useState(false)
    const [form, setForm] = useState({
       // matricula:'',
        email:''
    });

    const onChange = ({target}:any) => {
        const {name, value} = target;
        setForm({
          ...form,
          [name]: value
        });
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();        
        
        setRegistrando(true)
        const resp = await recuperarContrasenaGQL(form);
        const ok = resp?.respRecuperarContrasena!
        const txt = resp?.msg!
        if(ok!==true){
            setDataModal({title: "Error", txt, btn1: {txt:"Regresar", onClose:setModalE} })
            setModalE(true);
        } else {
            setDataModal({title: "Éxito", txt, btn1: {txt: "Ir al acceso", onClose:setModalE} })
            setModalS(true);
        }

        setRegistrando(false)
        
    }

    const todoOk = () => {
        return (form.email.length>0)
                ?true:false
    }

  return (
    <main className="-mt-24">          
        <ModalSuccess open={modalS} setOpen={
                async()=> {
                    setModalS(false)
                    await Router.push('/login')
                    
                }
            } 
            title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
        <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={dataModal.btn1} />
          
          {!auth.logged && <div className="min-h-full flex flex-col justify-center py-12 sm:px-22 lg:px-22">
          <h2 className='rightH2' >Recuperar contraseña</h2>
                                                    {/* sm:max-w-md */}
          <div className="mt-8 sm:mx-auto sm:w-full">
                                            {/* shadow */}
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit} method="POST">
                
                {/*<div>
                    <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
                        Matrícula
                    </label>
                    <div className="mt-1">
                        <input
                            id="matricula"
                            name="matricula"
                            type="text"
                            placeholder='Ej: 08083206'
                            value={form?.matricula!}
                            onChange={onChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>*/}

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder='Ej: 08083206@gmail.mx'
                        value={form.email}
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                </div>                

                <div>
                <button
                    type="submit"
                    disabled={!todoOk()||registrando}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {registrando&&<Loading className="w-5 h-5" type="points-opacity" color="white" size="sm" />}
                    {!registrando&&<>Recuperar</>}
                </button>
                </div>
            </form>

            
            </div>
        </div>

          </div>}
          
        </main>
      );
  
}

export default RecuperarContraseña