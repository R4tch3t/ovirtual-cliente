import { FC, useState, useEffect } from 'react'
import { estadoRevisionGQL, guardarTramiteGQL, TramiteAlumnoInput } from '../../../apollo-cliente/tramites'
import { useAppContext } from '../../../auth/authContext'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
import { ObtenerTramiteAlumnoInput, useObtenerTramitesAlumno } from '../../../hooks/useQuery/tramites'
import { ModalError } from '../../ModalError'
import { ModalSuccess } from '../../ModalSucces';
import EstadoTramite from '../estadoTramitePreregistros'
import { HeadTramite } from '.'
import { FormularioEquivalencia } from './formulario'
import Fade from '@mui/material/Fade';
import { ConfirmarTramite } from '../../../helpers/ConfirmarTramite'
import { retornarPrimerMat } from '../../../helpers/retornarPrimerMat'
import { CatDocumentos } from '../../../helpers/expedientes'
import RenderPDF from '../../../helpers/renderPDF/formatoTramite'
import { types } from '../../../types/tramites'
import HeadSeleccionarPlanEquivalencia from './headSelecionarPlan';
import { SeleccionarPlan } from '../seleccionarPlan';

let timeRef:any = null
type Props = {
  titulo: string, 
  descripcion: string,
  tramiteId: number,
  mapDocInit: CatDocumentos[]
}

export const Equivalencia: FC<Props> = ({titulo, descripcion, tramiteId, mapDocInit}) => {
  const {auth} = useAppContext();
  const {tramitesState, dispatch} = useTramitesContext();
  const {equivalencia} = tramitesState?.procedimientos!
  const tramiteAlumno: ObtenerTramiteAlumnoInput = {
    userAlumnoId: auth?.id!,
    tramiteId,
    plesxurRef: equivalencia?.plesXur!
  }
  const {data, refetch} = useObtenerTramitesAlumno(tramiteAlumno)
  const datosTramite = data?.obtenerTramitesAlumno?.datosTramite
  const {telefono,planIngresarId} = JSON.parse(datosTramite?datosTramite:'{}')
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [clickEnviar, setClickEnviar] = useState(false)
  const [verPDF, setVerPDF] = useState(false)
  let btnDis:any = true//equivalencia?.validoParaTramitar!
  const excludDocs = [1,47]
  let mapDocInitExclud = [...mapDocInit]
  const vwAspirante = auth?.usuario?.vwAspirante![0]
  
  mapDocInitExclud=mapDocInitExclud.filter(d=>{
    if(data?.obtenerTramitesAlumno){
      return ( (d.estadoId  && d.estadoId<=data?.obtenerTramitesAlumno?.estadoId!) || d.validado===3 )  
    }
    return ( d.estadoId === 1 )
  })

  mapDocInitExclud.map(doc=>{
    const findDoc = auth?.usuario?.expediente?.find((e)=>{
      return e.id===doc?.expedienteId!
    })
    btnDis = findDoc?.validado!<3 && btnDis
  });

  mapDocInitExclud=mapDocInitExclud.sort((a,b)=>{
    return a?.id!-b?.id! && 
    (a.expedienteId!?a.expedienteId!:0)-(b.expedienteId!?b.expedienteId!:0)
  })
  
  mapDocInit = [...mapDocInitExclud]


  /*mapDocInitExclud=mapDocInitExclud.filter((doc)=>{
    return excludDocs.find((exc)=>{
      return exc === doc.id
    })
  });
  
  if(!data?.obtenerTramitesAlumno){
    btnDis = equivalencia?.validoParaTramitar!
    mapDocInitExclud.map(doc=>{
      const findDoc = auth?.usuario?.expediente?.find((e)=>{
        return e.id===doc?.expedienteId!
      })
      btnDis = findDoc?.validado!<3 && btnDis
    });
  }*/

  useEffect(()=>{
    if(btnDis){
      if(data?.obtenerTramitesAlumno !== undefined){
        if(data?.obtenerTramitesAlumno?.estadoId === 4){
          estadoRevisionGQL(data?.obtenerTramitesAlumno?.id)
        }
      }
    }
  },[btnDis])
  
  const onSubmit = async () => {
    const datosTramite = JSON.stringify({
      /*planIngresarId: equivalencia?.planIngresarId!,
      telefono: equivalencia?.telefono!*/
    });
    const tramite: TramiteAlumnoInput = {
      tramiteId,
      plesxurRef: equivalencia?.plesXur!,
      userAlumnoId: auth?.id!,
      email: auth?.email!,
      matricula: retornarPrimerMat(auth?.usuario?.matricula!),
      datosTramite
    }
    const resp = await guardarTramiteGQL(tramite)
    if(resp){
      await refetch()
      setModalS(true);
      setDataModal({title: 'Éxito', txt: "El trámite fue enviado con éxito.", btn1: {txt:"Aceptar", onClose:setModalE} })
      
    }
  }

  /*useEffect(()=>{
    let bandEffect = true // | inscripcion?.validoParaTramitar!
      
      mapDocInit.map(doc=>{

        const findDoc = auth?.usuario?.expediente?.find((e)=>{return (e.id===doc?.expedienteId!||e.documentoId===doc.id)})
        bandEffect = findDoc?.validado!<3 && bandEffect 
        setBtnDis(bandEffect)
        
      });
    
  },[auth?.usuario?.expediente, inscripcion])*/

  const loop = () =>{
    
    if(data?.obtenerTramitesAlumno){
      timeRef = setTimeout(()=>{
        clearTimeout(timeRef)        
        refetch()        
        loop()        
      },1500)
    }
    
  }

  useEffect(()=>{
    if(timeRef!==null){
      clearTimeout(timeRef)
    }
    loop()
  },[data?.obtenerTramitesAlumno])

  useEffect(()=>{
    
    if(vwAspirante&&!equivalencia){
      
      const {ID_PLAN, PLANESTUDIOS, UA} = vwAspirante!
      const nombreTramite = 'equivalencia'
      dispatch({
        type: types.seleccionarPlanProcedure,
        payload: {
          usuarioId: auth?.id!, 
          plesXur: ID_PLAN, 
          planElegido:PLANESTUDIOS, 
          unidadAcademica: UA, 
          procedure:nombreTramite
        }
      });        
      
      const nombreValor = 'validoParaTramitar'
      const valor = true

      dispatch({
          type: types.cambiarEstado,
          payload: {nombreTramite,nombreValor,valor}
      });
    }
    
  },[])

  if(!equivalencia){
    return (
      <HeadSeleccionarPlanEquivalencia
                  titulo={titulo!} 
                  descripcion={descripcion!}
                >
        <SeleccionarPlan nombreContextState='equivalencia' />
      </HeadSeleccionarPlanEquivalencia>
    )
  }

  return (
    <Fade in={true}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          
          <ConfirmarTramite onSubmit={onSubmit} open={clickEnviar} setOpen={setClickEnviar} >
            <ModalSuccess open={modalS} setOpen={()=>{
                setModalS(false);
                setClickEnviar(false);
              }} 
              title={dataModal.title} 
              txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
          
            
          </ConfirmarTramite>

        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{titulo}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{descripcion}.</p>
        </div>

        {data?.obtenerTramitesAlumno && 
          <EstadoTramite estadoId={data.obtenerTramitesAlumno.estadoId} />
        }

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            
            <HeadTramite />
            {data?.obtenerTramitesAlumno && 
              <FormularioEquivalencia mapDocInit={mapDocInit} telefono={telefono} planIngresarId={planIngresarId} />
            }
            {!data?.obtenerTramitesAlumno && 
              <FormularioEquivalencia mapDocInit={mapDocInitExclud} telefono={telefono} planIngresarId={planIngresarId} />
            }

          </dl>
        </div>

        {verPDF && 
          <RenderPDF 
              tramiteId={tramiteId}
              titulo='Homologación' 
              matricula={retornarPrimerMat(auth?.usuario?.matricula!)} 
              nombre={auth?.usuario?.alumno.nomentalu}
              apellidos={auth?.usuario?.alumno?.apeentalu!}
              fechaCreacion={data?.obtenerTramitesAlumno?.fechaCreacion}
              unidadAcademica={tramitesState.procedimientos.equivalencia?.unidadAcademica}
              planEstudios={tramitesState.procedimientos.equivalencia?.planElegido}
              datosTramite={data?.obtenerTramitesAlumno?.datosTramite!}
          />
        }

        {!data?.obtenerTramitesAlumno &&
          <div className="mt-4 py-4 px-4 flex justify-end sm:px-12">
              <button
                  type="button"
                  onMouseUp={()=>{
                    setClickEnviar(true)
                  }}
                  style={{width: 150}}
                  className={`ml-5 ${!btnDis?'bg-gray-500':'bg-sky-700'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:${!btnDis?'bg-gray-500':'bg-sky-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                  disabled={!btnDis}
              >
                  {
                      'Enviar trámite'
                  }
              </button>
          </div>
        }
          
      </div>
    </Fade>
  )
}