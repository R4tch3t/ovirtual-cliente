import { FC, useState, useEffect } from 'react'
import { estadoRevisionGQL, guardarTramiteGQL, TramiteAlumnoInput } from '../../../apollo-cliente/tramites'
import { useAppContext } from '../../../auth/authContext'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
import { ObtenerTramiteAlumnoInput, useObtenerTramitesAlumno } from '../../../hooks/useQuery/tramites'
import { ModalError } from '../../ModalError'
import { ModalSuccess } from '../../ModalSucces';
import EstadoTramite from '../estadoTramite'
import { HeadTramite } from '.'
import { FormularioCambioUnidadAcademica } from './formulario'
import Fade from '@mui/material/Fade';
import { ConfirmarTramite } from '../../../helpers/ConfirmarTramite'
import { retornarPrimerMat } from '../../../helpers/retornarPrimerMat'
import { CatDocumentos } from '../../../helpers/expedientes'
import { PDFLogo } from '../../Logo'
import RenderPDF from '../../../helpers/renderPDF/formatoTramite'
import { TypeUnidadesAcademicas } from '../../../interfaces'


let timeRef:any = null
type Props = {
  tramiteId: number,
  titulo: string,
  descripcion: string,
  mapDocInit: CatDocumentos[],
  unidadesAcademicas: TypeUnidadesAcademicas[]
}

export const CambioUnidadAcademica: FC<Props> = ({tramiteId,titulo,descripcion, mapDocInit,unidadesAcademicas}) => {
  const {auth} = useAppContext();
  const {tramitesState} = useTramitesContext();
  const tramiteAlumno: ObtenerTramiteAlumnoInput = {
    userAlumnoId: auth?.id!,
    tramiteId,
    plesxurRef: tramitesState?.procedimientos?.cambioUnidadAcademica?.plesXur!
  }
  const {data, refetch} = useObtenerTramitesAlumno(tramiteAlumno)
  const datosTramite = data?.obtenerTramitesAlumno?.datosTramite
  const {unidadDestino} = JSON.parse(datosTramite?datosTramite:'{}')
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [clickEnviar, setClickEnviar] = useState(false)
  const [verPDF, setVerPDF] = useState(false)
  let btnDis:any = tramitesState?.procedimientos?.cambioUnidadAcademica?.validoParaTramitar!
  mapDocInit.map(doc=>{
    const findDoc = auth?.usuario?.expediente?.find((e)=>{return e.id===doc?.expedienteId!})
    btnDis = findDoc?.validado!<3 && btnDis
  });

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
      unidadDestino: tramitesState?.procedimientos?.cambioUnidadAcademica?.unidadDestino!,
    });
    const tramite: TramiteAlumnoInput = {
      tramiteId,
      plesxurRef: tramitesState.procedimientos.cambioUnidadAcademica?.plesXur!,
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

  //const apellidos = auth?.usuario?.alumno?.apeentalu?.split('*')!

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
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{descripcion}</p>
        </div>

        {data?.obtenerTramitesAlumno && 
              <EstadoTramite estadoId={data.obtenerTramitesAlumno.estadoId} />
        }

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            
            <HeadTramite />
            <FormularioCambioUnidadAcademica 
              unidadesAcademicas={unidadesAcademicas}
              mapDocInit={mapDocInit} unidadDestino={unidadDestino} />

          </dl>
        </div>

        {data?.obtenerTramitesAlumno?.estadoId! === 5 && 
          <div 
            className='chatDivCargando' >
                <div
                  className='cursor-pointer text-center'
                  style={{width: 200}}
                  onMouseEnter={()=>{
                    setVerPDF(false)
                  }}
                  onMouseDown={async()=>{
                                        
                    setVerPDF(true)
                    
                  }}               
                >
                  
                    <PDFLogo width={50} height={50} />
                    <p className="mt-1 text-sm text-gray-500">Ver Trámite en PDF.</p>
                  
                </div>
          </div>
        }

        {verPDF && 
          <RenderPDF 
              tramiteId={tramiteId}
              titulo='Cambio de Unidad Académica' 
              matricula={retornarPrimerMat(auth?.usuario?.matricula!)} 
              nombre={auth?.usuario?.alumno.nomentalu}
              apellidos={auth?.usuario?.alumno?.apeentalu!}
              fechaCreacion={data?.obtenerTramitesAlumno?.fechaCreacion}
              unidadAcademica={tramitesState.procedimientos.bajaTemporal?.unidadAcademica}
              planEstudios={tramitesState.procedimientos.bajaTemporal?.planElegido}
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