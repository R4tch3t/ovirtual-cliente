import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react"
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { TypePais } from "../../../../../interfaces"
import { Nacionalidad, Pais } from "./components"
import Fade from "@mui/material/Fade";
import { Errors } from "../../../../Errors";
import { FormElement, Input, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { cambiarEstado, confirmEmail, validarApe1, validarApe2, validarCelular, validarCurp, validarEmail, validarFormulario1, validarNombre, validarTelefono } from "./helper";
import { ExclamationIcon,   ClipboardCopyIcon } from '@heroicons/react/solid'
import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { ModalSuccess } from "../../../../ModalSucces";
import { obtenerFormulario } from "../obtenerFormulario";
import { coloresInputs1 } from './helper/coloresInputs';
import { ModalError } from "../../../../ModalError";
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "../paso4/helper";
import { validarFormulario5 } from "../paso5/helper";
import { useAppContext } from "../../../../../auth/authContext";

type Props = {
    paises: TypePais[]
}

type ChangeType = (e: ChangeEvent<FormElement>) => void

const advertencias = {
    0: [<span key={'adv1'} className="mt-2 text-sm text-gray-500"> El campo <b>CURP</b> debe ser igual a tu documento oficial, cualquier alteración puede ser motivo de cancelación del preregistro. </span>,
        <span key={'adv2'} className="mt-2 text-sm text-gray-500"> Para el caso de los <b>Extranjeros</b>, se les creará un número aleatorio que supla el campo de <b>CURP</b>, esto de manera provisional y solo para efectos del preregistro. No tiene ninguna validez oficial. </span>],
    1: [<span key={'adv3'} className="mt-2 text-sm text-gray-500"> Debe asegurarse que su <b>EMAIL</b> existe y que lo captura correctamente, ya que aquí le llegara su Clave Única de Registro, misma que utilizará para acciones posteriores. </span>]
}

const Paso1:FC<Props> = ({paises}) => {
    const {auth,verificaToken} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4,paso5} = tramitesState.procedimientos.preregistro!
    const [inputs, setInputs]:any = useState(coloresInputs1(paso1!));
    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const formularioValido = () => {
        const valido = inputs.curp.color === 'primary' && inputs.nombre.color === 'primary' &&
            inputs.ape1.color === 'primary' && inputs.celular.color === 'primary' && inputs.email.color === 'primary' &&
            inputs.confirmEmail.color === 'primary' && validarFormulario1(paso1!)
            
            return valido
    }

    const formularioParaGuardarValido = () => {
            const valido = inputs.curp.color === 'primary' && inputs.nombre.color === 'primary' &&
            inputs.ape1.color === 'primary' && inputs.celular.color === 'primary' && inputs.email.color === 'primary' &&
            inputs.confirmEmail.color === 'primary' && validarFormulario1(paso1!) && validarFormulario2(paso2!) 
            && validarFormulario3(paso3!) && validarFormulario4(paso4!) && validarFormulario5(paso5!)

            return valido
    }

    const onKeyUp:KeyboardEventHandler<FormElement> = ({currentTarget}) => {
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
                validarEmail(paso1?.confirmEmail!,value.toLowerCase(),setInputs,inputs,dispatch)
            break

            case 'confirmEmail':
                confirmEmail(value.toLowerCase(),paso1?.email!,setInputs,inputs,dispatch)
            break
        }

        cambiarEstado(dispatch)
    
    }


    const onSubmit = () => {
        let valido: any = true;
        let validarCombos = paso1?.nacionalidadID !== undefined 
        validarCombos = paso1?.nacionalidadID === 1 ? (validarCombos && paso1?.paisID !== undefined && paso1?.paisID !== null) : validarCombos
        const curpValida =  validarCurp(paso1?.curp!,setInputs,inputs,dispatch);
        const nombreValido =  validarNombre(paso1?.nombre!,setInputs,inputs,dispatch);
        const ape1Valido =  validarApe1(paso1?.ape1!,setInputs,inputs,dispatch);
        const celularValido =  validarCelular(paso1?.celular?.toString(),setInputs,inputs,dispatch);
        const emailValido =  validarEmail(paso1?.confirmEmail!,paso1?.email!,setInputs,inputs,dispatch);
        const confirmEmailValido =  confirmEmail(paso1?.confirmEmail!,paso1?.email!,setInputs,inputs,dispatch);

        valido = validarCombos && curpValida && nombreValido && ape1Valido && celularValido && emailValido && confirmEmailValido 

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

        const nombrePaso='paso1';
        const nombreCampo='completo';
        const valorCampo=!valido ? false:true//false
      
            dispatch({
                type: types.cambiarPaso,
                payload: {nombrePaso,nombreCampo,valorCampo}
            });
        
    }
    
    return (
        <>
        <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
        <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={{txt: dataModal.btnTxt, onClose: setModalE}} />
          <Nacionalidad />

            {paso1?.nacionalidadID===1 &&
                <Fade in={paso1?.nacionalidadID===1}>
                    <div className='preregSteps' >
                        <Pais paises={paises} />
                    </div>
                </Fade>
            }
            <Spacer y={2} />  
            <div>
                <Errors  title={'Atención: '} e={advertencias[0]} setELog={null} />
                <Spacer y={2} />
                
                <Input id='curp' 
                        width={"100%"} 
                        name='curp'
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        labelLeft='*'
                        clearable bordered labelPlaceholder="* C.U.R.P" 
                        initialValue={paso1?.curp} 
                        helperColor={inputs.curp.color}
                        helperText={inputs.curp.helper}
                        color={inputs.curp.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='nombreTramite' 
                        width={"100%"} 
                        name='nombreTramite'
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        labelLeft='*'
                        clearable bordered labelPlaceholder="* Nombre" 
                        initialValue={paso1?.nombre} 
                        helperColor={inputs.nombre.color}
                        helperText={inputs.nombre.helper}
                        color={inputs.nombre.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='ape1Tramite' 
                    width={"100%"} 
                    name='ape1Tramite'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Apellido paterno" 
                    initialValue={paso1?.ape1} 
                    helperColor={inputs.ape1.color}
                    helperText={inputs.ape1.helper}
                    color={inputs.ape1.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='ape2Tramite' 
                    width={"100%"} 
                    name='ape2Tramite'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    clearable bordered labelPlaceholder="Apellido materno" 
                    initialValue={paso1?.ape2} 
                    helperColor={inputs.ape2.color}
                    helperText={inputs.ape2.helper}
                    color={inputs.ape2.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='celular' 
                    width={"100%"} 
                    name='celular'
                    type={'text'}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Telefono Celular (10 Dígitos)" 
                    initialValue={paso1?.celular?.toString()} 
                    helperColor={inputs.celular.color}
                    helperText={inputs.celular.helper}
                    color={inputs.celular.color}
                    maxLength={10}
                />

                <Spacer y={3} />
                
                <Input id='telefono' 
                    width={"100%"} 
                    name='telefono'
                    type={'text'}
                    onChange={onChange}
                    clearable bordered labelPlaceholder="Telefono Particular" 
                    initialValue={paso1?.telefono?.toString()} 
                    helperColor={inputs.telefono.color}
                    helperText={inputs.telefono.helper}
                    color={inputs.telefono.color} 
                    maxLength={10}
                />

                <Spacer y={3} />
                <Errors  title={'Atención: '} e={advertencias[1]} setELog={null} />
                <Spacer y={3} />
                
                <Input id='email' 
                    width={"100%"} 
                    name='email'
                    type={'text'}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Email" 
                    initialValue={paso1?.email} 
                    helperColor={inputs.email.color}
                    helperText={inputs.email.helper}
                    color={inputs.email.color} 
                        
                />

                <Spacer y={3} />
                
                <Input id='confirmEmail' 
                    width={"100%"} 
                    name='confirmEmail'
                    type={'email'}
                    onChange={onChange}
                    labelLeft='*'
                    clearable bordered labelPlaceholder="* Confirmar Email" 
                    initialValue={paso1?.confirmEmail} 
                    helperColor={inputs.confirmEmail.color}
                    helperText={inputs.confirmEmail.helper}
                    color={inputs.confirmEmail.color} 
                        
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
                        className={`ml-5 bg-${(formularioValido())?'sky-700':'red-600'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${(/*paso1?.completo!==false || */formularioValido())?'sky':'red'}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                        disabled={!formularioValido()}
                    >
                        {(!formularioValido()) && 
                        <ExclamationIcon  width={20} height={20} />}
                        {
                            'Siguiente'
                        }
                        {(formularioValido()) && <> → </>}
                        
                    </button>
                </div>

                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    
                    <button
                        type="button"
                        onMouseUp={async()=>{

                            const form = obtenerFormulario(tramitesState.procedimientos.preregistro!,1)
                            
                            if(aspiranteId===undefined || aspiranteId===null){
                                const {data, errors} = await nuevoAsp({
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
                                    if(auth?.logged){
                                        await verificaToken!()
                                    }
                                }else{
                                    setDataModal({title: 'Error', txt: "Es posible que el preregistro ya exista, si deseá modificar algún dato contacte a los directivos o administradores.", btnTxt: "Regresar al formulario" })
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

export {Paso1}