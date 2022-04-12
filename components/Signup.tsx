import type {NextPage} from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppContext } from '../auth/authContext';
import { ModalError } from './ModalError';
import { ModalSuccess } from './ModalSucces';


const Signup: NextPage = () => {
  const {auth}:any = useAppContext();
  const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
    const {signup}:any = useAppContext()
    const [form, setForm] = useState({
        matricula:'',
        email:''
    });
    
    /*const crear = useCallback( ()=>{
        const [user,  createUser ] = useCreateUserMutation()
    
    const newUser: UsuarioInput = {nombre: form.nombre, email:form.email, password: form.password, online: false}
    createUser( { user: newUser } );
    }, []);*/
    

    const onChange = ({target}:any) => {
        const {name, value} = target;
        setForm({
          ...form,
          [name]: value
        });
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        //crear()
        
        
        /* con URQL
        const user: UsuarioInput = {nombre: form.nombre, email:form.email, password: form.password, online: false}
        const usuariosResult:any = (new Client({ url })).mutation(CreateUserDocument,{user}).toPromise()
        usuariosResult.then((v:any)=>{
            console.log("toPromise")
            console.log("Usuario Creado")
            console.log(v)
        });*/
        
        const ok = await signup(form);

        if(ok!==true){
            //sE=["Verificar usuario y/o contraseña"]
            //const errors:any=[];
            //errors.push("Verificar email y/o contraseña.");
            //errors.push("Es posible que la cuenta ya exista.");
            //errors.push(ok)
            //console.log("error? "+ok)
            //setELog({band:true,errors});
            setDataModal({title: "Error", txt: ok, btn1: {txt:"Regresar al registro", onClose:setModalE} })
            setModalE(true);
        } else {
            /*const success:any=[];
            success.push("El usuario se registró con éxito");
            console.log("success!?")
            //errors.push("Es posible que la cuenta ya exista.");
            setSLog({band:ok,success});
            setELog({band:false,errors:[]});*/
            setDataModal({title: "Éxito", txt: "El usuario se registró con éxito", btn1: {txt: "Regresar al registro", onClose:setModalE} })
            setModalS(true);
        }
        
    }

    const todoOk = () => {
        return (form.matricula.length>0&&
                form.email.length>0)
                ?true:false
    }

  return (
    <main className="-mt-24">
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-gray-50">
            <body class="h-full">
            ```
          */}
          {/*eLog.band&&<Errors e={eLog.errors} setELog={setELog} />*/}
          {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
        txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />}
        {modalE && <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
        txt={dataModal.txt} btn1={dataModal.btn1} />}
          
          {!auth.logged && <div className="min-h-full flex flex-col justify-center py-12 sm:px-22 lg:px-22">
          <h2 className='rightH2' >Registro</h2>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit} method="POST">
                <div>
                <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
                    Matrícula
                </label>
                <div className="mt-1">
                    <input
                        id="matricula"
                        name="matricula"
                        type="text"
                        placeholder='Ej: 08083206'
                        value={form.matricula}
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                </div>

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

                {/*<div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={onChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>*/}

                <div className="flex items-center justify-between">

                    <div className="text-sm">
                        <Link href="/login" >
                            <a  className="font-medium text-indigo-600 hover:text-indigo-500">
                            ¿Ya tienes cuenta?
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
                    Registrar
                </button>
                </div>
            </form>

            
            </div>
        </div>

          </div>}
          
        </main>
      );
  
}

export default Signup