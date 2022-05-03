import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react"
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { TypePais } from "../../../../../interfaces"
import { Nacionalidad, Pais } from "../paso1/components"
import Fade from "@mui/material/Fade";
import { Errors } from "../../../../Errors";
import { Button, FormElement, Grid, Input, Loading, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { validarCURP } from "../../../../../helpers/validarCURP";
import { cambiarEstado, confirmEmail, validarApe1, validarApe2, validarCelular, validarCurp, validarEmail, validarNombre, validarTelefono } from "../paso1/helper";
import { ExclamationIcon } from '@heroicons/react/solid'
import { EntidadFederativa, Municipio } from "./components";

type Props = {
    paises: TypePais[]
}

type ChangeType = (e: ChangeEvent<FormElement>) => void

const advertencias = {
    0: [<span key={'adv1'} className="mt-2 text-sm text-gray-500"> Si eres extranjero, debes de colocar un domicilio fijo/provisional de México. </span>]
}

const Paso2:FC<Props> = ({paises}) => {
    const {tramitesState, dispatch} = useTramitesContext()
    const {paso1,paso2} = tramitesState.procedimientos.homologacion!
    const [inputs, setInputs]:any = useState({
        calle: {color: 'primary'},
        numeroExt: {color: 'primary'},
        numeroInt: {color: 'primary'},
        colonia: {color: 'primary'},
        entidadFedID: {color: 'secondary'},
        municipioID: {color: 'primary'},
        localidadID: {color: 'secondary'},
        cp: {color: 'primary'},
    });

    const onKeyUp:KeyboardEventHandler<FormElement> = ({currentTarget}) => {
        //event.currentTarget.
        const {name} = currentTarget;
        switch(name){
            case 'curp':
            case 'nombreTramite':
            case 'ape1Tramite':
            case 'ape2Tramite':
                currentTarget.value=currentTarget.value.toUpperCase()
            break
            case 'email':
            case 'confirmEmail':
                currentTarget.value=currentTarget.value.toLowerCase()
            break
        }
        
    
    }

    const onChange:ChangeType = ({target}) => {
        
        //if(!target) return false;
    
        const {name, value} = target;
        switch(name){
            case 'curp':
                validarCurp(value.toUpperCase(),setInputs,inputs,dispatch)
            break

            case 'nombreTramite':
                validarNombre(value.toUpperCase(),setInputs,inputs,dispatch)
            break
            
            case 'ape1Tramite':
                validarApe1(value.toUpperCase(),setInputs,inputs,dispatch)
            break

            case 'ape2Tramite':
                validarApe2(value.toUpperCase(),setInputs,inputs,dispatch)
            break

            case 'celular':
                validarCelular(value,setInputs,inputs,dispatch)
            break

            case 'telefono':
                validarTelefono(value,setInputs,inputs,dispatch)
            break

            case 'email':
                validarEmail(value.toLowerCase(),setInputs,inputs,dispatch)
            break

            case 'confirmEmail':
                //const emailActual = (document.getElementById('email')! as any).value;
                confirmEmail(value.toLowerCase(),paso1?.email!,setInputs,inputs,dispatch)
            break
        }

        cambiarEstado(dispatch)
    
    }


    const onSubmit = () => {
        let valido: any = true;
        let validarCombos = paso1?.nacionalidadID !== undefined 
        validarCombos = paso1?.nacionalidadID === 1 ? (validarCombos && paso1?.paisID !== undefined) : validarCombos
                    //&& paso1?.nombre !== undefined && paso1?.ape1 !== undefined && paso1?.ape2 !== undefined;
        
        const curpValida =  validarCurp(paso1?.curp!,setInputs,inputs,dispatch);
        const nombreValido =  validarNombre(paso1?.nombre!,setInputs,inputs,dispatch);
        const ape1Valido =  validarApe1(paso1?.ape1!,setInputs,inputs,dispatch);
        const celularValido =  validarCelular(paso1?.celular?.toString(),setInputs,inputs,dispatch);
        const emailValido =  validarEmail(paso1?.email!,setInputs,inputs,dispatch);
        const confirmEmailValido =  confirmEmail(paso1?.confirmEmail!,paso1?.email!,setInputs,inputs,dispatch);

        valido = validarCombos && curpValida && nombreValido && ape1Valido && celularValido && emailValido && confirmEmailValido 

        //re setstates
        
        if(!curpValida){
            inputs.curp={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!nombreValido){
            inputs.nombre={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!ape1Valido){
            inputs.ape1={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!celularValido){
            inputs.celular={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!emailValido){
            inputs.email={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!confirmEmailValido){
            inputs.confirmEmail={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        setInputs({...inputs}) 

        const nombrePaso='paso2';
        const nombreCampo='completo';

        const valorCampo=!valido ? false:true//false
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }

    return (
        <>  
            <div>
                <Spacer y={1} />
                <Errors title={'Atención: '} e={advertencias[0]} setELog={null} />
                <Spacer y={1} />
                
                <Input id='calle' 
                        width={"100%"} 
                        name='calle'
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        labelLeft='*'
                        clearable bordered labelPlaceholder="* Calle" 
                        initialValue={paso2?.calle} 
                        helperColor={inputs.calle.color}
                        helperText={inputs.calle.helper}
                        color={inputs.calle.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='numeroExt' 
                        width={"100%"} 
                        name='numeroExt'
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        labelLeft='*'
                        clearable bordered labelPlaceholder="* Número exterior" 
                        initialValue={paso2?.numeroExt} 
                        helperColor={inputs.numeroExt.color}
                        helperText={inputs.numeroExt.helper}
                        color={inputs.numeroExt.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='numeroInt' 
                    width={"100%"} 
                    name='numeroInt'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    clearable bordered labelPlaceholder="Número interior" 
                    initialValue={paso2?.numeroInt} 
                    helperColor={inputs.numeroInt.color}
                    helperText={inputs.numeroInt.helper}
                    color={inputs.numeroInt.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='colonia' 
                    width={"100%"} 
                    name='colonia'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Colonia" 
                    initialValue={paso2?.colonia} 
                    helperColor={inputs.colonia.color}
                    helperText={inputs.colonia.helper}
                    color={inputs.colonia.color} 
                        
                />

                <Spacer y={3} />
                
                <EntidadFederativa />

                <Spacer y={3} />

                <Municipio />
                
                {/*<Input id='municipioID' 
                    width={"100%"} 
                    name='municipioID'
                    type={'text'}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Telefono Celular (10 Dígitos)" 
                    initialValue={paso1?.celular?.toString()} 
                    helperColor={inputs.celular.color}
                    helperText={inputs.celular.helper}
                    color={inputs.celular.color}
                    maxLength={10}
                />*/}

                <Spacer y={3} />
                
                <Input id='cp' 
                    width={"100%"} 
                    name='cp'
                    type={'text'}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Código postal" 
                    initialValue={paso2?.cp?.toString()} 
                    helperColor={inputs.cp.color}
                    helperText={inputs.cp.helper}
                    color={inputs.cp.color} 
                    maxLength={10}
                />

                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button    
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onMouseUp={onSubmit}
                        style={{width: 120}}
                        className={`ml-5 bg-${paso1?.completo!==false?'sky':'red'}-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${paso1?.completo!==false?'sky':'red'}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                    >
                        {paso1?.completo===false&&<ExclamationIcon  width={20} height={20} />}
                        {
                            'Siguiente'
                        }
                        {paso1?.completo!==false && <> → </>}
                        
                    </button>
                </div>
            </div>
        </>       
    )
}

export {Paso2}