import type {NextPage} from 'next'
import { useEffect, useState } from 'react';
import { useAppContext } from '../auth/authContext';
import { ModalError } from './ModalError';
import { signIn } from "next-auth/react";
import { Loading } from '@nextui-org/react';
import Link from 'next/link';

type TypeBands = {'github':boolean,'google':boolean,'facebook':boolean}

const Login: NextPage = () => {
  const {auth, loading}:any = useAppContext();
  const {login}:any = useAppContext()
  const [form, setForm] = useState({
    email:'',
    password: '',
    rememberme: false
  });
  const [modalE, setModalE] = useState(false);
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [bandsL, setBandsL] = useState<TypeBands>({github: false, google: false, facebook: false})

  useEffect(()=>{
    const email = localStorage.getItem("email");
    if(email){
      setForm({...form,rememberme: true,email})
    }
  },[form]);

  const onChange = ({target}:any) => {
    const {name, value} = target;
    setForm({
      ...form,
      [name]: value
    });
  } 
  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme
    });
  }
  const onSubmit = async (e:any) => {
    e.preventDefault();
    if(bandsL.github||bandsL.google||bandsL.facebook){
      return false
    }
    form.rememberme?
      localStorage.setItem("email",form.email):
      localStorage.removeItem("email");
    const ok = await login(form.email,form.password);
    if(!ok){
      setDataModal({title: "Error", txt: "Verificar usuario y/o contraseña.", btn1: {txt:"Regresar al inicio", onClose:setModalE} })
      setModalE(true);
    }
  }

  const todoOk = () => {
    return (form.email.length>0&&form.password.length>0)?true:false
  }
  const oAuth = (provider:string) => {
    if(bandsL.github||bandsL.google||bandsL.facebook){
      return false
    }
    setBandsL({...bandsL,[provider]: true});
    
    signIn(provider,{redirect: false,callbackUrl: undefined});
    
  }
  
  return (
    <main className="-mt-24">
  
     <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
      txt={dataModal.txt} btn1={dataModal.btn1} />
    
    {!auth.logged && <div className="min-h-full flex flex-col justify-center py-12 sm:px-22 lg:px-22">
          <h2 className='rightH2' >Acceso</h2>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={onSubmit} method="POST">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        value={form.email}
                        autoComplete="email"
                        placeholder='Ej: 08083206 ó 08083206@gmail.mx'
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        autoComplete="current-password"
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center" onMouseUp={toggleCheck} >
                      <input
                        id="remember-me"
                        name="rememberme"
                        checked={form.rememberme}
                        
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        readOnly
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                      </label>
                    </div>
    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Recuperar contraseña
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
    
                    <div className="text-sm">
                      <Link href="/signup" >
                        <a  className="font-medium text-indigo-600 hover:text-indigo-500">
                          Registrar nueva cuenta
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!todoOk()}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
    
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Ó continuar con</span>
                    </div>
                  </div>
    
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div>
                      <a
                        href={undefined}
                        onClick={()=>oAuth('facebook')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        {bandsL.facebook&&<Loading className="w-5 h-5" type="points-opacity" color="secondary" size="sm" />}
                        {!bandsL.facebook&&<>
                        <span className="sr-only">Sign in with Facebook</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                        </>}
                      </a>
                    </div>
    
                    <div>
                      <a
                        href={undefined}
                        onClick={()=>oAuth('google')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        {bandsL.google&&<Loading className="w-5 h-5" type="points-opacity" color="secondary" size="sm" />}
                        {!bandsL.google&&<>
                        <span className="sr-only">Sign in with Google</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" width={20} height={20} viewBox="0 0 48 48">
                          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        </>}
                      </a>
                    </div>
    
                    <div>
                    
                      <a
                        href={undefined}
                        onClick={()=>oAuth('github')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        {bandsL.github&&<Loading className="w-5 h-5" type="points-opacity" color="secondary" size="sm" />}
                        {!bandsL.github&&<>
                          <span className="sr-only">Sign in with GitHub</span>
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>}
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>}
          
        </main>
      );
  
}

export default Login