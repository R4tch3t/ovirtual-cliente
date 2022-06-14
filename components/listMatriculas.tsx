import { FC, DragEvent, useState, useEffect } from 'react'
import {ViewListIcon} from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useAppContext } from '../auth/authContext'


const DefaultIcon = ()=> {
    return <CheckCircleIcon id={'0'} className="h-5 w-5 mt-1 ml-2 text-green-400 group-hover:green-gray-500" />
}

type TipoMatriculas = {
    matricula: string
    icon?: JSX.Element
}

type Props = {
    setDataModal:any
    setModalE:any
    setModalS:any
}

let currentDragElement:any = null

const ListMatriculas:FC<Props> = ({
    setDataModal, setModalE, setModalS}) => {
    const {auth, matriculaPorDefecto } = useAppContext();

    const [matriculasState, setMatriculasState] = useState(
        auth?.usuario?.matricula?JSON.parse(auth?.usuario?.matricula! as string) as TipoMatriculas[]:[]
    )
    const [opacityDrag, setOpacityDrag] = useState(1)
    matriculasState[0].icon=DefaultIcon()

    //escuchar cambios en la matricula
    useEffect(()=>{
        if(auth?.usuario?.matricula){
            setMatriculasState(JSON.parse(auth?.usuario?.matricula! as string) as TipoMatriculas[])
        }
    },[auth?.usuario?.matricula]);

    const onDragStart = (event: DragEvent) => {
        const {target}:any = event
        currentDragElement=parseInt(target.id)
        setOpacityDrag(0.3)
    }

    const onDragEnd = async(event: DragEvent) => {
        currentDragElement=null
        setOpacityDrag(1)
        if(matriculasState.length===1){
            return false
        }
        //Chagen Default mat
        const matricula = matriculasState[0].matricula
        const usuario={
            id: auth?.id!,
            matricula
        }
        const ok = await matriculaPorDefecto(usuario! as any)
    
        if(ok!==true){
            setDataModal({title: "Error", txt: ok as any, btn1: {txt:"Regresar al perfil", onClose:setModalE} })
            setModalE(true);
            //setModalSMat(false);
            //setClickEnviar(false);
        }else{
            setDataModal({title: "Éxito", txt: <>Ahora la matrícula por defecto es <b>{matricula}</b></>, btn1: {txt:"Regresar al perfil", onClose:setModalS} })
            setModalS(true);
        }

        
    }

    const onDrop = (event: DragEvent) => {
        currentDragElement=null
        setOpacityDrag(1)
    }

    const allowDropElement = (event: DragEvent) => {
        event.preventDefault()
        const {target}:any = event
        event.currentTarget.classList.add('cursor-move')
        target.style.cursor='move'
        const onDragMat = parseInt(target.id)
        if(onDragMat>-1&&onDragMat!==currentDragElement){
            const auxM = matriculasState[onDragMat].matricula
            matriculasState[onDragMat].matricula = matriculasState[currentDragElement].matricula
            matriculasState[currentDragElement].matricula = auxM
            const newMatriculasState=[...matriculasState]
            
            currentDragElement=onDragMat
            
            setMatriculasState(newMatriculasState) 
        }       
    }

    

    return (
      <ul onDrop={onDrop} 
        onDragOver={(event)=>{event.preventDefault()}} 
        onDragEnd={(event)=>{event.preventDefault()}}
        role="list" className="space-y-3">
         
        {matriculasState.map((item,id) => (
            <li key={id} 
                id={id+""}
                draggable
                onDragStart={onDragStart}
                onDragOver={allowDropElement}  
                onDragEnd={onDragEnd}     
                onDrop={(event)=>{event.preventDefault()}}   
                className="cursor-move bg-white shadow overflow-hidden rounded-md px-6 py-2"
                style={{opacity: currentDragElement===id?opacityDrag:1, transition: 'all .3s'}}
            >
                <div id={id+""}  className='flex' >
                    <ViewListIcon id={id+""} className="h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500" /> 
                        {item?.icon!}
                    <span id={id+""} className='w-full text-center' >{item.matricula} </span>
                </div>
            </li>
        ))}
      </ul>
    )
}

export default ListMatriculas