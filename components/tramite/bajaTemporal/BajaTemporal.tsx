import { FC, useState } from 'react'
import { guardarTramiteGQL, TramiteAlumnoInput } from '../../../apollo-cliente/tramites'
import { useAppContext } from '../../../auth/authContext'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
import { ObtenerTramiteAlumnoInput, useObtenerTramitesAlumno } from '../../../hooks/useQuery/tramites'
import { ModalError } from '../../ModalError'
import { ModalSuccess } from '../../ModalSucces';
import EstadoTramite from '../estadoTramite'
import { HeadTramite } from '../headTramite'
import { FormularioBajaTemporal } from './formulario'
import Fade from '@mui/material/Fade';
import { ConfirmarTramite } from '../../../helpers/ConfirmarTramite'
import { retornarPrimerMat } from '../../../helpers/retornarPrimerMat'
import { CatDocumentos } from '../../../helpers/expedientes'

type Props = {
  tramiteId: number,
  mapDocInit: CatDocumentos[]
}

/*const mapDocInit: CatDocumentos[] = [
  {id: null, nombre: 'CURP.pdf', descripcion: '',tipoDocumentoId:1,clave:'',activo:1},
  {id: null, nombre: 'ACTA DE NACIMIENTO.pdf',descripcion: '', tipoDocumentoId:1,clave:'',activo:1},
]*/

export const BajaTemporal: FC<Props> = ({tramiteId, mapDocInit}) => {
  const {auth} = useAppContext();
  const {tramitesState} = useTramitesContext();
  const tramiteAlumno: ObtenerTramiteAlumnoInput = {
    userAlumnoId: auth?.id!,
    tramiteId,
    plesxurRef: tramitesState?.procedimientos?.bajaTemporal?.plesXur!
  }
  const {data, refetch} = useObtenerTramitesAlumno(tramiteAlumno)
  const datosTramite = data?.obtenerTramitesAlumno?.datosTramite
  const {periodoLectivo,causaBaja} = JSON.parse(datosTramite?datosTramite:'{}')
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  const [clickEnviar, setClickEnviar] = useState(false)
  let btnDis:any = tramitesState?.procedimientos?.bajaTemporal?.validoParaTramitar!
  mapDocInit.map(doc=>{
    const findDoc = auth?.usuario?.expediente?.find((e)=>{return e.id===doc?.expedienteId!})
    btnDis = findDoc && btnDis
  });

  const onSubmit = async () => {
    const datosTramite = JSON.stringify({
      periodoLectivo: tramitesState?.procedimientos?.bajaTemporal?.periodoLectivo!,
      causaBaja: tramitesState?.procedimientos?.bajaTemporal?.causaBaja!
    });
    const tramite: TramiteAlumnoInput = {
      tramiteId,
      plesxurRef: tramitesState.procedimientos.bajaTemporal?.plesXur!,
      userAlumnoId: auth?.id!,
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
  
  return (
    <Fade in={true}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        
        {/*<ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
          txt={dataModal.txt} btn1={dataModal.btn1} />*/}
          
          <ConfirmarTramite onSubmit={onSubmit} open={clickEnviar} setOpen={setClickEnviar} 
            
          >
            <ModalSuccess open={modalS} setOpen={()=>{
                setModalS(false);
                setClickEnviar(false);
              }} 
              title={dataModal.title} 
              txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
          
            
          </ConfirmarTramite>

        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Baja temporal de estudios</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Permite a un estudiante estar fuera por un periodo de tiempo.</p>
        </div>

        {data?.obtenerTramitesAlumno && 
              <EstadoTramite />
        }

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            
            <HeadTramite />
            <FormularioBajaTemporal mapDocInit={mapDocInit} periodoBajaVal={periodoLectivo} causaBajaVal={causaBaja} />

          </dl>
        </div>



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