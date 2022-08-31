import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { FormElement, Input, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { cambiarEstado, validarEscuelaProcedencia, validarMatricula } from "./helper";
import { ClipboardCopyIcon, ExclamationIcon } from '@heroicons/react/solid'
import { EscuelasUagro, EsEgresadoUag } from "./components";
import Fade from "@mui/material/Fade";
import { coloresInputs4 } from "./helper/coloresInputs";
import { validarFormulario1 } from "../paso1/helper";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "./helper";
import { obtenerFormulario } from "../obtenerFormulario";
import { ModalSuccess } from "../../../../ModalSucces";

import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { ModalError } from "../../../../ModalError";
import { validarFormulario5 } from "../paso5/helper";
import { useAppContext } from "../../../../../auth/authContext";
import Router from "next/router";


type ChangeType = (e: ChangeEvent<FormElement>) => void

const Paso4 = () => {
    const {auth,verificaToken} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4,paso5} = tramitesState.procedimientos.preregistro!
    const [inputs, setInputs]:any = useState(coloresInputs4(paso4!));

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:'', btnOk: () => {}})

    const formularioValido = () => {
        let valido = (paso4?.esEgresadoUag === false ? inputs.escuelaProcedencia.color === 'primary' : inputs.matricula.color === 'primary') 
        valido = valido && validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!) && validarFormulario4(paso4!);
        return valido
    }

    const formularioParaGuardarValido = () => {
        let valido = (paso4?.esEgresadoUag === false ? inputs.escuelaProcedencia.color === 'primary' : inputs.matricula.color === 'primary') 
        valido = valido && validarFormulario1(paso1!) && validarFormulario2(paso2!) && validarFormulario3(paso3!) && validarFormulario4(paso4!)
        && validarFormulario5(paso5!);
        return valido
    }

    const onKeyUp:KeyboardEventHandler<FormElement> = ({currentTarget}) => {
        const {name} = currentTarget;
        switch(name){
            case 'escuelaProcedencia':
                currentTarget.value=currentTarget.value.toUpperCase()
            break
            
        }
        
    
    }

    const onChange:ChangeType = ({target}) => {
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
            <ModalSuccess open={modalS} setOpen={dataModal.btnOk} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
            <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={{txt: dataModal.btnTxt, onClose: setModalE}} />
            <div>
                <Spacer y={1} />
                
                <EsEgresadoUag />

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

                            const form = obtenerFormulario(tramitesState.procedimientos.preregistro!,4)
                            
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
                                    setDataModal({title: 'Éxito', txt: "El formulario se ha almacenado.", 
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

export {Paso4}