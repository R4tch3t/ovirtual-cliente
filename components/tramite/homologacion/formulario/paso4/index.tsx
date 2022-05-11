import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { Button, FormElement, Grid, Input, Loading, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
//import { validarCURP } from "../../../../../helpers/validarCURP";
import { cambiarEstado, validarEscuelaProcedencia, validarMatricula } from "./helper";
import { ClipboardCopyIcon, ExclamationIcon } from '@heroicons/react/solid'
import { EscuelasUagro, EsEgresadoUag } from "./components";
import Fade from "@mui/material/Fade";
import { coloresInputs4 } from "./helper/coloresInputs";
import { validarFormulario1 } from "../paso1/helper";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "../paso4/helper";
import { obtenerFormulario } from "../obtenerFormulario";
import { ModalSuccess } from "../../../../ModalSucces";

import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";


type ChangeType = (e: ChangeEvent<FormElement>) => void

const Paso4 = () => {
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4} = tramitesState.procedimientos.homologacion!
    /*const [inputs, setInputs]:any = useState({
        escuelaProcedencia: {color: 'primary'},
        matricula: {color: 'primary'},
    });*/
    const [inputs, setInputs]:any = useState(coloresInputs4(paso4!));

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})

    const formularioValido = () => {
        let valido = (paso4?.esEgresadoUag === false ? inputs.escuelaProcedencia.color === 'primary' : inputs.matricula.color === 'primary') 
        valido = valido && validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!) && validarFormulario4(paso4!);
        console.log('valido4: ',valido)
            return valido
    }

    const onKeyUp:KeyboardEventHandler<FormElement> = ({currentTarget}) => {
        //event.currentTarget.
        const {name} = currentTarget;
        switch(name){
            case 'escuelaProcedencia':
                currentTarget.value=currentTarget.value.toUpperCase()
            break
            
        }
        
    
    }

    const onChange:ChangeType = ({target}) => {
        
        //if(!target) return false;
    
        const {name, value} = target;
        switch(name){
            case 'escuelaProcedencia':
                validarEscuelaProcedencia(value.toUpperCase(),setInputs,inputs,dispatch)
            break
            case 'matricula':
                validarMatricula(value.toUpperCase(),setInputs,inputs,dispatch)
            break

        }

        cambiarEstado(dispatch)
    
    }
     
    const onSubmit = () => {
        //let valido: any = true;
        //let validarCombos = paso2?.entidadFedID !== undefined && paso2?.municipioID !== undefined && paso2?.localidadID !== undefined
        //validarCombos = paso1?.nacionalidadID === 1 ? (validarCombos && paso1?.paisID !== undefined) : validarCombos
                    //&& paso1?.nombre !== undefined && paso1?.ape1 !== undefined && paso1?.ape2 !== undefined;
        
        
        //valido = validarCombos && calleValida && coloniaValido && numeroExtValido && cpValido  

        //re setstates
        let valido = paso4?.esEgresadoUag !== undefined
        valido = paso4?.esEgresadoUag === true ? 
        (paso4.escuelaUagroClave!==undefined && paso4.matricula!==undefined ) : 
        (valido && paso4?.escuelaProcedencia !== undefined)
        
        if(paso4?.esEgresadoUag === true && paso4?.matricula === undefined){
            inputs.matricula={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(paso4?.esEgresadoUag === false && paso4?.escuelaProcedencia===undefined ){
            inputs.escuelaProcedencia={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }
        
        setInputs({...inputs}) 
        const nombrePaso='paso4';
        const nombreCampo='completo';

        const valorCampo=!valido ? false:true//false
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }

    const anterior = () => {

        const pasos=['paso1','paso2'];
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
                payload: {nombrePaso: 'paso3', nombreCampo,valorCampo}
            })
    }

    return (
        <>  
        {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />}
            <div>
                <Spacer y={1} />
                
                <EsEgresadoUag />

                {/*{paso3?.esPuebloOriginario===true && 
                    <Fade in={paso3?.esPuebloOriginario===true}>
                        <div >
                        <Spacer y={2} />
                            <PuebloOriginario />
                        </div>
                    </Fade>}*/} 

                {paso4?.esEgresadoUag === false && 
                    <Fade in={true} >
                        <div>
                            <Spacer y={2} />
                            <Input id='escuelaProcedencia' 
                                width={"100%"} 
                                name='escuelaProcedencia'
                                type={'text'}
                                onKeyUp={onKeyUp}
                                onChange={onChange}
                                labelLeft='*'
                                clearable bordered labelPlaceholder="* Escuela de Procedencia" 
                                initialValue={paso4?.escuelaProcedencia} 
                                helperColor={inputs.escuelaProcedencia.color}
                                helperText={inputs.escuelaProcedencia.helper}
                                color={inputs.escuelaProcedencia.color} 
                            
                            />
                        </div>    
                    </Fade>
                }

                {paso4?.esEgresadoUag === true && 
                    <Fade in={true} >
                        <div>
                            <Spacer y={2} />
                            <EscuelasUagro />
                            <Spacer y={2} />
                            <Input id='matricula' 
                                width={"100%"} 
                                name='matricula'
                                type={'text'}
                                //onKeyUp={onKeyUp}
                                onChange={onChange}
                                labelLeft='*'
                                clearable bordered labelPlaceholder="* Matricula UAGro" 
                                initialValue={paso4?.matricula} 
                                helperColor={inputs.matricula.color}
                                helperText={inputs.matricula.helper}
                                color={inputs.matricula.color} 
                            
                            />
                        </div>    
                    </Fade>
                }

                
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

                            const form = obtenerFormulario(tramitesState.procedimientos.homologacion!,4)
                            
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

export {Paso4}