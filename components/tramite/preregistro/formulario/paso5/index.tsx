import { useState } from "react";
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { ClipboardCopyIcon } from '@heroicons/react/solid'
import { DineroSemanal, EmpleoMadre, EmpleoPadre, EsEmpleado, IngresoMensual, PorcentajeAportado, PorcentajeDepende } from "./components";
import Fade from "@mui/material/Fade";
import { ModalSuccess } from "../../../../ModalSucces";
import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { validarFormulario1 } from "../paso1/helper";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "../paso4/helper";
import { validarFormulario5 } from "./helper";
import { obtenerFormulario } from "../obtenerFormulario";
import { ModalError } from "../../../../ModalError";

const Paso5 = () => {
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4,paso5} = tramitesState.procedimientos.preregistro!
    
    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})

    const formularioValido = () => {
        const valido =  validarFormulario1(paso1!) && validarFormulario2(paso2!) 
            && validarFormulario3(paso3!) && validarFormulario4(paso4!) && validarFormulario5(paso5!);

        return valido
    }

     
    const onSubmit = () => {
        let valido = paso5?.esEmpleado !== undefined
        valido = paso5?.esEmpleado === true ? 
        (paso5.porcentajeAportaID!==undefined && paso5.porcentajeDependeID!==undefined ) : 
        (valido && paso5?.ingresoMensualID!==undefined && paso5?.dineroSemanalID!==undefined)
        valido = valido && paso5?.empleoMadreID !== undefined && paso5.empleoPadreID !== undefined
        

        const nombrePaso='paso5';
        const nombreCampo='completo';

        const valorCampo=!valido ? false:true//false
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }

    const anterior = () => {

        const pasos=['paso1','paso2','paso3'];
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
                payload: {nombrePaso: 'paso4', nombreCampo,valorCampo}
            })
    }

    return (
        <>
            <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
            <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={{txt: dataModal.btnTxt, onClose: setModalE}} />
            <div>
                <Spacer y={1} />
                
                <EsEmpleado />

                {paso5?.esEmpleado === true && 
                    <Fade in={true} >
                        <div>
                            <Spacer y={2} />
                            <PorcentajeAportado />
                            <Spacer y={2} />
                            <PorcentajeDepende />
                            
                        </div>    
                    </Fade>
                }

                
                <Spacer y={2} />

                <IngresoMensual />

                <Spacer y={2} />

                <DineroSemanal />

                <Spacer y={2} />

                <EmpleoMadre />

                <Spacer y={2} />

                <EmpleoPadre />

                <Spacer y={6} />

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
                        onMouseUp={async()=>{

                            const form = obtenerFormulario(tramitesState.procedimientos.preregistro!,5)
                            
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
                                    setDataModal({title: 'Éxito', txt: "El formulario se ha almacenado.", btnTxt: "Regresar al formulario" })
                                    setModalS(true);
                                }else{
                                    setDataModal({title: 'Error', txt: "Es posible que el preregistro ya exista ó que ya seá alumno UAGro., si deseá modificar algún dato contacte a los directivos o administradores.", btnTxt: "Regresar al formulario" })
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
                                    setDataModal({title: 'Éxito', txt: "El formulario se ha guardado.", btnTxt: "Regresar al formulario" })
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

export {Paso5}