import Router from 'next/router';
import {FC} from 'react';
import { useTramitesContext } from '../../context/tramites/TramitesContext';
import { types } from '../../types/tramites';

type Head = {
    tramiteId: number;
    nombre: string | null;
    descripcion: string | null;
    nivel: string | null;
    linkChildren: string;
}

const TramiteHead: FC<Head> = ({tramiteId, nombre, descripcion, nivel, linkChildren}) => {
  const {dispatch}:any = useTramitesContext();
  //const {tramitesState} = useTramitesContext();
  //const tramite = tramitesState.tramites?.find((t)=>{return t.id=tramiteId})
  //nivel = tramite?.nivelEstudio!
  let btnState = {
    txt: 'Iniciar trámite',
    href: `/tramite/${tramiteId}/iniciarTramite`,
    onClick: ()=>{
      
      dispatch({
        type: types.ponerTramiteEnNulo,
        payload: null
      });
      
      Router.push(`/tramite/${tramiteId}/iniciarTramite`)
      
    },
    bgColor1: 'bg-sky-700',
    bgColor2: 'bg-sky-800'
  };
  
  if(linkChildren==='iniciarTramite'){
    btnState.txt='Cancelar'
    btnState.onClick=()=>{
      
      Router.push(`/tramite/${tramiteId}`)
    }
    btnState.href=`/tramite/${tramiteId}`
    btnState.bgColor1='bg-red-600'
    btnState.bgColor2='bg-red-700'
  }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">NOMBRE DEL TRÁMITE:</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{nombre}</p>
            
              <button
                type="button"
                onClick={btnState.onClick}
                style={{width: 150}}
                className={`${btnState.bgColor1} mt-5 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:${btnState.bgColor2} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
              >
                {
                    btnState.txt
                }
              </button>
            

          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">DESCRIPCIÓN</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{descripcion}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">NIVEL DE ESTUDIOS</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{nivel}</dd>
              </div>
              

            </dl>
          </div>
        </div>
      )
}

export {TramiteHead}