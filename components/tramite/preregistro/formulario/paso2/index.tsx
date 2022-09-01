import { ChangeEvent, KeyboardEventHandler, useState } from "react"
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext"
import { Errors } from "../../../../Errors";
import { FormElement, Input, Spacer } from "@nextui-org/react";
import { types } from "../../../../../types/tramites";
import { cambiarEstado, validarCalle, validarNumeroExt, validarColonia, validarCP, validarFormulario2, coloresInputs2 } from "./helper";
import { ClipboardCopyIcon, ExclamationIcon } from '@heroicons/react/solid'
import { EntidadFederativa, Municipio, Localidad } from "./components";
import { obtenerFormulario } from "../obtenerFormulario";
import { useGuardarAsp, useNuevoAsp } from "../../../../../hooks/useMutation";
import { ModalSuccess } from "../../../../ModalSucces";
import { validarFormulario1 } from "../paso1/helper";
import { ModalError } from "../../../../ModalError";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "../paso4/helper";
import { validarFormulario5 } from "../paso5/helper";
import { useAppContext } from "../../../../../auth/authContext";
import Router from "next/router";

type ChangeType = (e: ChangeEvent<FormElement>) => void

const advertencias = {
    0: [<span key={'adv1'} className="mt-2 text-sm text-gray-500"> Si eres extranjero, debes de colocar un domicilio fijo/provisional de México. </span>]
}

const Paso2 = () => {
    const {auth,verificaToken} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext()
    const {aspiranteId,paso1,paso2,paso3,paso4,paso5} = tramitesState.procedimientos.preregistro!

    const [inputs, setInputs]:any = useState(coloresInputs2(paso2!));
    const [modalS, setModalS] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:'', btnOk: () => {}})

    const [nuevoAsp] = useNuevoAsp()
    const [guardarAsp] = useGuardarAsp()

    const formularioValido = () => {
        const valido = inputs.calle.color === 'primary' && inputs.numeroExt.color === 'primary' &&
            inputs.colonia.color === 'primary' && inputs.cp.color === 'primary' && validarFormulario1(paso1!) 
            && validarFormulario2(paso2!);

            return valido
    }

    const formularioParaGuardarValido = () => {
        const valido = inputs.calle.color === 'primary' && inputs.numeroExt.color === 'primary' &&
            inputs.colonia.color === 'primary' && inputs.cp.color === 'primary' && validarFormulario1(paso1!) 
            && validarFormulario2(paso2!) && validarFormulario3(paso3!) && validarFormulario4(paso4!) 
            && validarFormulario5(paso5!);

            return valido
    }

    const onKeyUp:KeyboardEventHandler<FormElement> = ({currentTarget}) => {
        const {name} = currentTarget;
        switch(name){
            case 'calle':
            case 'colonia':
                currentTarget.value=currentTarget.value.toUpperCase()
            break
        }
        
    
    }

    const onChange:ChangeType = ({target}) => {
            
        const {name, value} = target;
        switch(name){
            case 'calle':
                validarCalle(value.toUpperCase(),setInputs,inputs,dispatch)
            break

            case 'numeroExt':
                validarNumeroExt(value.toUpperCase(),setInputs,inputs,dispatch)
            break
            
            case 'colonia':
                validarColonia(value.toUpperCase(),setInputs,inputs,dispatch)
            break

            case 'cp':
                validarCP(value,setInputs,inputs,dispatch)
            break

        }

        cambiarEstado(dispatch)
    
    }


    const onSubmit = () => {
        let valido: any = true;
        let validarCombos = paso2?.entidadFedID !== undefined && paso2?.municipioID !== undefined && paso2?.localidadID !== undefined
        const calleValida =  validarCalle(paso2?.calle!,setInputs,inputs,dispatch);
        const coloniaValido =  validarColonia(paso2?.colonia!,setInputs,inputs,dispatch);
        const numeroExtValido =  validarNumeroExt(paso2?.numeroExt!,setInputs,inputs,dispatch);
        const cpValido =  validarCP(paso2?.cp!.toString(),setInputs,inputs,dispatch);
        
        valido = validarCombos && calleValida && coloniaValido && numeroExtValido && cpValido  

        
        if(!calleValida){
            inputs.calle={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!coloniaValido){
            inputs.colonia={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!numeroExtValido){
            inputs.numeroExt={
                color: 'error', 
                helper: 'Error, campo requerido',
                statusColor: 'error'
            }
        }

        if(!cpValido){
            inputs.cp={
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

    const anterior = () => {
        const nombrePaso='paso1';
        const nombreCampo='completo';

        const valorCampo=false
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }

    return (
        <>  
            <ModalSuccess open={modalS} setOpen={dataModal.btnOk} title={dataModal.title} 
                txt={dataModal.txt} btnTxt={dataModal.btnTxt} />
            <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
            txt={dataModal.txt} btn1={{txt: dataModal.btnTxt, onClose: setModalE}} />
            <div>
                <Spacer y={1} />
                <Errors title={'Atención: '} e={advertencias[0]} setELog={null} />
                <Spacer y={2} />
                
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
                
                <Spacer y={3} />
                <Localidad />
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
                        className={`ml-5 bg-${formularioValido()?'sky-700':'red-600'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-${formularioValido()?'sky':'red'}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
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

                            const form = obtenerFormulario(tramitesState.procedimientos.preregistro!,2)
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

export {Paso2}