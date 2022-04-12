import Input from "../Input"

const Contraseña = ({handleUp, auth}:any) => {
    return (
        <div className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Actualizar contraseña</h3>
            <p className="max-w-2xl text-sm text-gray-500">
              En está sección se editara la contraseña.
            </p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Contraseña actual </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/*<span className="flex-grow">Chelsea Hagon</span>*/}
                  <div className="flex-grow" ><Input l='' v={''} email={false} pass={true} id='password' /> </div>
                  
                </dd>
              </div>
      
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Nueva contraseña</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/*<span className="flex-grow">chelsea.hagon@example.com</span>*/}
                  <div className="flex-grow" ><Input l='' v={''} email={false} pass={true} id='newPass' /> </div>
                  
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Confirmar contraseña</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/*<span className="flex-grow">chelsea.hagon@example.com</span>*/}
                  <div className="flex-grow" ><Input l='' v={''} email={false} pass={true} id='confirmPass' /> </div>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500"></dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/*<span className="flex-grow">chelsea.hagon@example.com</span>*/}
                  <div className="flex-grow" > </div>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onMouseUp={handleUp}
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Actualizar
                    </button>
                  </span>
                </dd>
              </div>

            </dl>
          </div>
        </div>
    )
}

export default Contraseña