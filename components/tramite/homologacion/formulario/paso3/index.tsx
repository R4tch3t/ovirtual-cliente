import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react"
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { TypePais } from "../../../../../interfaces"
//import { Nacionalidad, Pais } from "../paso1/components"
//import Fade from "@mui/material/Fade";
import { Errors } from "../../../../Errors";
import { Button, FormElement, Grid, Input, Loading, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
//import { validarCURP } from "../../../../../helpers/validarCURP";
//import { cambiarEstado, validarCalle, validarNumeroExt, validarColonia, validarCP } from "./helper";
import { ClipboardCopyIcon, ExclamationIcon } from '@heroicons/react/solid'
import { PuebloOriginario, EsPuebloOriginario, PadeceDiscapacidad, Discapacidad, EsAfroGuerrerense, EsResidenteSierra, EsHijoMigrante } from "./components";
import Fade from "@mui/material/Fade";
import { obtenerFormulario } from "../obtenerFormulario";
import { ModalSuccess } from "../../../../ModalSucces";

import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { validarFormulario1 } from "../paso1/helper";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "./helper";


const Paso3 = () => {
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3} = tramitesState.procedimientos.homologacion!

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})

    const formularioValido = () => {
        const valido =  validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!);

        return valido
    }

    const onSubmit = () => {
        //let valido: any = true;
        //let validarCombos = paso2?.entidadFedID !== undefined && paso2?.municipioID !== undefined && paso2?.localidadID !== undefined
        //validarCombos = paso1?.nacionalidadID === 1 ? (validarCombos && paso1?.paisID !== undefined) : validarCombos
                    //&& paso1?.nombre !== undefined && paso1?.ape1 !== undefined && paso1?.ape2 !== undefined;
        
        
        //valido = validarCombos && calleValida && coloniaValido && numeroExtValido && cpValido  

        //re setstates
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
            {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />}
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

                            const form = obtenerFormulario(tramitesState.procedimientos.homologacion!,3)
                            
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
                                    setDataModal({title: 'Éxito', txt: "El formulario se ah almacenado.", btnTxt: "Regresar al formulario" })
                                    setModalS(true);
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
                                })//.then((r)=>{console.log(r.errors)})
                                if(data?.guardarAsp){
                                    setDataModal({title: 'Éxito', txt: "El formulario se ah guardado.", btnTxt: "Regresar al formulario" })
                                    setModalS(true);
                                }
                            }
                           
                        }}
                        style={{width: 120}}
                        className={`ml-5 bg-${!formularioValido()?'gray-400':'sky-700'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${!formularioValido()?'gray-400':'sky-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                        disabled={!formularioValido()}
                    >

                        <ClipboardCopyIcon  width={20} height={20} /> GUARDAR
                        
                    </button>

                </div>
                
            </div>
        </>       
    )
}

export {Paso3}