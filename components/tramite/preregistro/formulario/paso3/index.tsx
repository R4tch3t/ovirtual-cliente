import { useState } from "react"
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { ClipboardCopyIcon, ExclamationIcon } from '@heroicons/react/solid'
import { PuebloOriginario, EsPuebloOriginario, PadeceDiscapacidad, Discapacidad, EsAfroGuerrerense, EsResidenteSierra, EsHijoMigrante } from "./components";
import Fade from "@mui/material/Fade";
import { obtenerFormulario } from "../obtenerFormulario";
import { ModalSuccess } from "../../../../ModalSucces";
import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { validarFormulario1 } from "../paso1/helper";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "./helper";
import { ModalError } from "../../../../ModalError";
import { validarFormulario4 } from "../paso4/helper";
import { validarFormulario5 } from "../paso5/helper";
import { useAppContext } from "../../../../../auth/authContext";
import Router from "next/router";


const Paso3 = () => {
    const {auth,verificaToken} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4,paso5} = tramitesState.procedimientos.preregistro!

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:'', btnOk: () => {}})

    const formularioValido = () => {
        const valido =  validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!);

        return valido
    }

    const formularioParaGuardarValido = () => {
        const valido =  validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!)
        && validarFormulario4(paso4!) && validarFormulario5(paso5!);

        return valido
    }

    const onSubmit = () => {
        let valido = paso3?.esPuebloOriginario !== undefined
        valido = paso3?.esPuebloOriginario === true ? (paso3.puebloID!==undefined) : valido
        valido = paso3?.padeceDiscapacidad === true ? (paso3.discapacidadID !== undefined && valido) : paso3?.padeceDiscapacidad !== undefined
        valido = valido && paso3?.esAfroamericano !== undefined && paso3?.esResidenteSierra !== undefined && paso3?.esHijoMigrante !== undefined        
        
        const nombrePaso='paso3';
        const nombreCampo='completo';

        const valorCampo=!valido ? false:true//false
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }

    const anterior = () => {

        const pasos=['paso1'];
        const nombreCampo='completo';

        let valorCampo=true
        
        pasos.map((paso)=>{
            dispatch({
                type: types.cambiarPaso,
                payload: {nombrePaso: paso, nombreCampo,valorCampo}
            });
        })

         valorCampo=false
         
            dispatch({
                type: types.cambiarPaso,
                payload: {nombrePaso: 'paso2', nombreCampo,valorCampo}
            })
    }

    return (
        <>  
            <ModalSuccess open={modalS} setOpen={dataModal.btnOk} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
            <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={{txt: dataModal.btnTxt, onClose: setModalE}} />
            <div>
                <Spacer y={1} />
                
                <EsPuebloOriginario />

                {paso3?.esPuebloOriginario===true && 
                    <Fade in={paso3?.esPuebloOriginario===true}>
                        <div >
                        <Spacer y={2} />
                            <PuebloOriginario />
                        </div>
                    </Fade>} 

                <Spacer y={2} />

                <PadeceDiscapacidad />

                {paso3?.padeceDiscapacidad===true && 
                    <Fade in={paso3?.padeceDiscapacidad===true}>
                        <div >
                        <Spacer y={2} />
                            <Discapacidad />
                        </div>
                    </Fade>} 

                <Spacer y={2} />

                <EsAfroGuerrerense />

                <Spacer y={2} />

                <EsResidenteSierra />

                <Spacer y={2} />

                <EsHijoMigrante />
                
                <Spacer y={2} />

                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button    
                        onMouseDown={anterior}
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        {'← '}
                        Anterior
                    </button>
                    <button
                        type="button"
                        onMouseUp={onSubmit}
                        style={{width: 120}}
                        className={`ml-5 bg-${formularioValido()?'sky-700':'red-600'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${!formularioValido()?'red':'sky'}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                        disabled={!formularioValido()}
                    >
                        {!formularioValido()&&<ExclamationIcon  width={20} height={20} />}
                        {
                            'Siguiente'
                        }
                        {formularioValido() && <> → </>}
                        
                    </button>
                </div>

                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    
                    <button
                        type="button"
                        onMouseUp={async()=>{

                            const form = obtenerFormulario(tramitesState.procedimientos.preregistro!,3)
                            
                            if(aspiranteId===undefined || aspiranteId===null){
                                const {data} = await nuevoAsp({
                                    variables:{
                                        asp: form?.asp!, 
                                        aspReg:form?.aspReg!, 
                                        aspDomi: form?.aspDomi!,
                                        aspMulti: form?.aspMulti!,
                                        aspSocioEco: form?.aspSocioEco!
                                    }})
                                if(data?.nuevoAsp){
                                    setDataModal({title: 'Éxito', txt: "El formulario se ha almacenado, revisa tu correo y sigue los pasos para continuar.", 
                                        btnTxt: "Aceptar", btnOk: async() => {
                                            setModalS(false);
                                            if(auth?.logged){
                                                Router.reload()
                                            }else{
                                                await Router.push('/')
                                            }
                                            
                                        } })
                                    setModalS(true);
                                    
                                }else{
                                    setDataModal({title: 'Error', txt: "Es posible que el preregistro ya exista ó que ya seá alumno UAGro., si deseá modificar algún dato contacte a los directivos o administradores.",
                                     btnTxt: "Regresar al formulario",
                                     btnOk: () =>{
                                        setModalS(false);
                                     }
                                     })
                                    setModalE(true);
                                } 
                            }else{
                                
                                
                                const {data} = await guardarAsp({
                                    variables:{
                                        aspiranteId,
                                        asp: form?.asp!, 
                                        aspReg:form?.aspReg!, 
                                        aspDomi: form?.aspDomi!,
                                        aspMulti: form?.aspMulti!,
                                        aspSocioEco: form?.aspSocioEco!
                                    }
                                })
                                if(data?.guardarAsp){
                                    setDataModal({title: 'Éxito', txt: "El formulario se ha guardado.", 
                                        btnTxt: "Regresar al formulario",
                                        btnOk: () =>{
                                            setModalS(false);
                                        } 
                                    })
                                    setModalS(true);
                                }
                            }
                           
                        }}
                        style={{width: 120}}
                        className={`ml-5 bg-${!formularioParaGuardarValido()?'gray-400':'sky-700'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${!formularioParaGuardarValido()?'gray-400':'sky-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                        disabled={!formularioParaGuardarValido()}
                    >

                        <ClipboardCopyIcon  width={20} height={20} /> GUARDAR
                        
                    </button>

                </div>
                
            </div>
        </>       
    )
}

export {Paso3}