import {FC} from 'react';
import { PaperClipIcon } from '@heroicons/react/solid'

type Head = {
    nombre: string | null,
    descripcion: string | null,
    nivel: string | null
}

const TramiteHead: FC<Head> = ({nombre, descripcion, nivel}) => {

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">NOMBRE DEL TRÁMITE:</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{nombre}</p>
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