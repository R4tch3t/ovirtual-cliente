import { FC, useState } from 'react'
import { guardarTramiteGQL, TramiteAlumnoInput } from '../../../apollo-cliente/tramites'
import { useAppContext } from '../../../auth/authContext'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
import { ModalError } from '../../ModalError'
import { ModalSuccess } from '../../ModalSucces'
import { HeadTramite } from '../headTramite'
import { FormularioBajaTemporal } from './formulario'

type Props = {
  tramiteId: number
}

const mapDocInit = [
  {id: null, nombre: 'CURP.pdf', descripcion: '',tipoDocumentoId:1},
  {id: null, nombre: 'ACTA DE NACIMIENTO.pdf',descripcion: '', tipoDocumentoId:1},
]

export const BajaTemporal: FC<Props> = ({tramiteId}) => {
  const {auth} = useAppContext();
  const {tramitesState} = useTramitesContext()
  const [modalE, setModalE] = useState(false)
  const [modalS, setModalS] = useState(false)
  const [dataModal, setDataModal] = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalE}})
  
  let btnDis:any = tramitesState?.procedimientos?.bajaTemporal?.validoParaTramitar!
  mapDocInit.map(doc=>{
    const findDoc = auth?.usuario?.expediente?.find((e)=>{return e.id===doc.id})
    btnDis = findDoc && btnDis
  })

  const onSubmit = async () => {
    const tramite: TramiteAlumnoInput = {
      tramiteId,
      plesxurRef: tramitesState.procedimientos.bajaTemporal?.plesXur!,
      userAlumnoId: auth?.id!,
      matricula: auth?.usuario?.matricula!
    }
    const resp = await guardarTramiteGQL(tramite)
    if(resp){
        setDataModal({title: 'Éxito', txt: "El trámite fue enviado con éxito.", btn1: {txt:"Aceptar", onClose:setModalE} })
        setModalS(true);
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {modalS && <ModalSuccess open={modalS} setOpen={setModalS} title={dataModal.title} 
            txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />}
      {modalE && <ModalError open={modalE} setOpen={setModalE} title={dataModal.title} 
        txt={dataModal.txt} btn1={dataModal.btn1} />}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Baja temporal de estudios</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Permite a un estudiante estar fuera por un periodo de tiempo.</p>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

          <HeadTramite />
          <FormularioBajaTemporal mapDocInit={mapDocInit} />

         
        </dl>
      </div>

      
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-12">
            <button
                type="button"
                onMouseUp={onSubmit}
                style={{width: 150}}
                className={`ml-5 ${!btnDis?'bg-gray-500':'bg-sky-700'} border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:${!btnDis?'bg-gray-500':'bg-sky-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                disabled={!btnDis}
            >
                {
                    'Enviar trámite'
                }
            </button>
      </div>
        
    </div>
  )
}