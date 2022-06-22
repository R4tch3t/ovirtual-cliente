import { Slide } from "@mui/material";
import { Input, Loading, Spacer } from "@nextui-org/react";
import { FC, useState } from "react";
import { PropsCard } from ".";
import client from "../../apollo-cliente";
import { actualizarEstadoGQL, consultaAspCURPGQL, consultaResultadoCenevalGQL } from "../../apollo-cliente/aspirante";
import { validarCURP } from "../../helpers/validarCURP";
import { ModalInscripcion } from "../ModalInscripcion";
import { ModalSuccess } from "../ModalSucces";
import { ModalWarning } from "../ModalWarning";

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

interface TipoDataModal {
    title: string|JSX.Element
    txt: string|JSX.Element
    txt2: string|JSX.Element
    txt3: string|JSX.Element
    txt4: string|JSX.Element
    txt5: string|JSX.Element
    txt6: string|JSX.Element
    txt7: string|JSX.Element
    celular: string,
    correo: string,
    btn1: any
    btn2: any
}

let GID_REGISTRO:any = null
export const InscripcionCard:FC<PropsCard> = ({action}) => {
    
    const [inputs, setInputs]:any = useState({
        folio: {color: 'success'},
        curp: {color: 'success'},
    });
    const [cargandoFolio, setCargandoFolio] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [folioValido, setFolioValido] = useState(false)
    const [curpValido, setCurpValido] = useState(false)
    const [modalS, setModalS] = useState(false)
    const [modalSR, setModalSR] = useState(false)
    const dataModalS = { title: 'Éxito', txt: "Los datos se actualizaron correctamente.", btn1: {txt:"Aceptar"} }
    const dataModalSR = { title: 'Éxito', txt: "El aspirante ya ha sido registrado...", btn1: {txt:"Aceptar"} }
  
    const [dataModal, setDataModal]: [TipoDataModal,any] = useState({
        title: '¡Advertencia!', 
        txt: <span style={{paddingBottom: 10, fontSize: 20}} > <b> Asegurese que sus datos seán los correctos. </b> </span>,
        txt2: ``, //matricula
        txt3: <></>, //nombre
        txt4: <></>, //curp
        txt5: <></>, //folio
        txt6: <></>, //escuela
        txt7: <></>, //plan
        celular: '',
        correo: '',
        btn1: {txt:'Cancelar', onClose: ()=>{}},
        btn2: {txt:'Aceptar', 
            onClick: async ()=>{
                
                setOpenW(true)
            }
        }
    });
    const dataModalW = {
        title: '¡Advertencia!', 
        txt:'¿Está seguro de enviar el registro?.', 
        btn1:{txt:'Cancelar', onClose: ()=>{}},
        btn2: {txt:'Aceptar', 
        onClick: async ()=>{
            actualizarAspirante()
        }}
    };
    const [open, setOpen] = useState(false)
    const [openW, setOpenW] = useState(false)
      //cambiar a estado 3
    const actualizarAspirante = async()=>{
        const celular:any = document.getElementById('celularModalInscripcion')
        const correo:any = document.getElementById('correoModalInscripcion')
        const user = {
            id:GID_REGISTRO!,
            celular:celular.value!,
            correo:correo.value!
        }
        const resp = await actualizarEstadoGQL(user)
        if(resp?.respActualizarEstado){
            setModalS(true);
        }
        
    }

    const onChange = async ({target}:any) =>{
        const {name, value} = target;
        switch(name){
            case 'folio':
                let valido = value.match(/^[0-9]{9,9}$/i);
                
                if(valido){
                    setCargandoFolio(true)
                    await client.cache.reset()
                    
                    const consultaResultadoCeneval = await consultaResultadoCenevalGQL({folio: parseInt(value!),autorizado: 1})
                    const {respResultadoCeneval} = consultaResultadoCeneval
                    if(respResultadoCeneval){
                        //setResultadoCeneval(consultaResultadoCeneval.resultadoCeneval!)
                        const campoCurp:any = document.getElementById('curpInscripcion')
                        
                        if(campoCurp!==null){
                            campoCurp.value=''
                        }
                        
                        setCurpValido(false)

                        setInputs({...inputs,[name]:{
                            color: 'success', 
                            helper: 'El Folio Ceneval fue autorizado...',
                            statusColor: 'success'
                        },
                        curp:{
                            color: 'success', 
                        }})
                        

                    }else{
                        valido = false
                        setInputs({...inputs,[name]:{
                            color: 'error', 
                            helper: 'Folio Ceneval no autorizado...',
                            statusColor: 'error'
                        }})
                    }
                    setCargandoFolio(false)
                }else{
                    setInputs({...inputs,[name]:{
                        color: 'error', 
                        helper: 'Folio Ceneval invalido...',
                        statusColor: 'error'
                    }})
                }
                setFolioValido(valido?true:false)
            break;
            case 'curp':
                valido = validarCURP(value)

                if(valido){
                    setInputs({...inputs,[name]:{
                        color: 'success', 
                        helper: 'La CURP es valida...',
                        statusColor: 'success'
                    }})

                }else{
                    setInputs({...inputs,[name]:{
                        color: 'error', 
                        helper: 'La CURP es invalida...',
                        statusColor: 'error'
                    }})
                }
                setCurpValido(valido?true:false)
            break;
        }
    }

    const openModal = async() => {
        setCargando(true)
        await client.cache.reset()
        const campoFolio:any = document.getElementById('folioInscripcion')
        const campoCurp:any = document.getElementById('curpInscripcion')
        const consultaAspRegistro = await consultaAspCURPGQL({ folio: parseInt(campoFolio.value!),curp: campoCurp.value })
        const {respAspCurp} = consultaAspRegistro
        

        if(respAspCurp){
            const {resultadoAspRegistro} = consultaAspRegistro
            //const {matricula} = resultadoAspRegistro!
            const {MATRICULA, NOMBRE, CURP, FOLIO_CENEVAL, UA, PLANESTUDIOS, TELEFONO_CELULAR, CORREO_ELECTRONICO, ESTADO, ID_REGISTRO} = resultadoAspRegistro!
            
            
            if(ESTADO!=='Aceptado'){
                GID_REGISTRO=ID_REGISTRO
                setDataModal({
                    ...dataModal,
                    txt2: (MATRICULA?<>Matrícula: <b>{MATRICULA}</b></>:''),
                    txt3: (<>Nombre: <b>{`${NOMBRE}`}.</b></>),
                    txt4: (<>CURP: <b>{`${CURP}`}</b></>),
                    txt5: (<>Folio Ceneval: <b>{`${FOLIO_CENEVAL}`}</b></>),
                    txt6: (<>Escuela: <b>{`${UA}`}</b></>),
                    txt7: (<>Plan de estudios: <b>{`${PLANESTUDIOS}`}</b></>),
                    celular: TELEFONO_CELULAR,
                    correo: CORREO_ELECTRONICO
                })
                setOpen(true)
            }else{
                setModalSR(true);
            }
            
        }

    }

    return (
        <>
            <div>
            <ModalSuccess open={modalSR} setOpen={()=>{
                setModalSR(false);
                setCargando(false);
            }} 
                title={dataModalSR.title} 
                txt={dataModalSR.txt} btnTxt={dataModalSR.btn1.txt} />
                
                <ModalInscripcion open={open} 
                    setOpen={()=>{
                        setCargando(false)
                        setOpen(false)
                    }}
                    dataModal={dataModal} 
                    
                >
                    <ModalWarning open={openW} setOpen={()=>{setOpenW(false)}} title={dataModalW.title} 
                        txt={dataModalW.txt} btn1={dataModalW.btn1} btn2={dataModalW.btn2} 
                    >
            
                        <ModalSuccess open={modalS} setOpen={()=>{
                            setModalS(false);
                            setOpenW(false)
                            setOpen(false)
                            setCargando(false)
                            GID_REGISTRO=null
                        }} 
                            title={dataModalS.title} 
                            txt={dataModalS.txt} btnTxt={dataModalS.btn1.txt} 
                        />

                    </ModalWarning>
                </ModalInscripcion>
                <span
                className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-white'
                )}
                >
                <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-medium">
                {/*<Link href={action.href} >*/}
                    {/*<a  className="focus:outline-none">*/}                                
                    <span className="absolute" aria-hidden="true" />
                    {action.name}
                    {/*</a>*/}
                {/*</Link>*/}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    {action.descripcion}
                </p>
                <Spacer y={2} />
                <Input id='folioInscripcion' 
                    width={"50%"} 
                    name='folio'
                    onChange={onChange}
                    clearable bordered labelPlaceholder="Ingresa tú Folio Ceneval aquí..." 
                    css={{
                        '.nextui-input-helper-text':{fontSize: '$xs'},
                        '.nextui-input-helper-text-container':{top:40}
                    }}
                    helperColor={inputs.folio.color}
                    helperText={inputs.folio.helper}
                    color={inputs.folio.color} 
                    contentRight={cargandoFolio&&<Loading size="xs" />}
                    status={inputs.folio.color} 
                />
                
                <Spacer y={3} />
                
                <Slide  direction="up" in={folioValido} mountOnEnter unmountOnExit>
                    <div className="w-full" >
                    
                        <Input id='curpInscripcion' 
                            width={"100%"} 
                            name='curp'
                            onChange={onChange}
                            clearable bordered labelPlaceholder="Ingresa tú CURP para completar la busqueda..." 
                            css={{
                                '.nextui-input-helper-text':{fontSize: '$xs'},
                                '.nextui-input-helper-text-container':{top:40}
                            }}
                            helperColor={inputs.curp.color}
                            helperText={inputs.curp.helper}
                            color={inputs.curp.color} />
                    
                        <Spacer y={2} />
                        <button
                            type="button"
                            onMouseUp={openModal}
                            style={{width: 160}}
                            className={`${curpValido?'bg-sky-700':'bg-gray-500'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:${curpValido?'bg-sky-800':'bg-gray-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                            disabled={!curpValido||cargando}
                        >
                            {
                                cargando ? 
                                    <Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />
                                    :
                                    'Finalizar busqueda'
                            }
                        </button>

                    </div>
                </Slide>
                
            </div>
        </>)
}
