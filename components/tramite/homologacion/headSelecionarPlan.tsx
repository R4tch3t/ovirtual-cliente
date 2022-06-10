import { FC } from "react"

const HeadSeleccionarPlan:FC = ({children}) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Homologación</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Permite a un estudiante solicitar la <b>HOMOLOGACIÓN DE ESTUDIOS</b>.</p>
          </div>

            {children}

        </div>
    )
}

export default HeadSeleccionarPlan