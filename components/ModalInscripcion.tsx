import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Input, Loading, Spacer } from "@nextui-org/react";

export const ModalInscripcion=({open, setOpen, dataModal, children}:any)=>{
  const cancelButtonRef = useRef(null)
  const {title, txt, txt2, txt3, txt4, txt5, txt6, txt7, celular, correo, btn1, btn2} = dataModal
  const [btn2State, setBtn2State] = useState({...btn2, disabled:false})
  const [inputs, setInputs]:any = useState({
    celular: {color: 'success'},
    correo: {color: 'success'},
  });
  
  const onChange = async ({target}:any) => {
        const {name, value} = target;
        let valido: any = false
        switch(name){
          case 'celular':
            
            valido = value.match(/^[0-9]{10,10}$/i);
              if(valido){
                  setInputs({...inputs,[name]:{
                      color: 'success', 
                      helper: 'El número es valido...',
                      statusColor: 'success'
                  }})

              }else{
                  setInputs({...inputs,[name]:{
                      color: 'error', 
                      helper: 'El número es inválido...',
                      statusColor: 'error'
                  }})
              }
            break;
            case 'correo':
            
              valido = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i)
              if(valido){
                  setInputs({...inputs,[name]:{
                      color: 'success', 
                      helper: 'El correo es valido...',
                      statusColor: 'success'
                  }})

              }else{
                  setInputs({...inputs,[name]:{
                      color: 'error', 
                      helper: 'El correo es inválido...',
                      statusColor: 'error'
                  }})
              }
            break;
        }
        setBtn2State({...btn2State,
            disabled:valido?false:true
          })
        
    }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" style={{zIndex: 999}} initialFocus={cancelButtonRef} onClose={btn1.onClose} >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {children}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {txt}
                    </p>
                    <div className="mt-5">
                      {txt2 && <p className="text-sm text-gray-500">
                        {txt2}
                      </p>}
                      {txt3 && <p className="text-sm text-gray-500">
                        {txt3}
                      </p>}
                      {txt4 && <p className="text-sm text-gray-500">
                        {txt4}
                      </p>}
                      {txt5 && <p className="text-sm text-gray-500">
                        {txt5}
                      </p>}
                      {txt6 && <p className="text-sm text-gray-500">
                        {txt6}
                      </p>}
                      {txt7 && <p className="text-sm text-gray-500">
                        {txt7}
                      </p>}
                        <div>
                          <Spacer y={2} />
                          <Input id='celularModalInscripcion' 
                              width={"100%"} 
                              name='celular'
                              onChange={onChange}
                              clearable bordered labelPlaceholder="Telefono" 
                              initialValue={celular}
                              css={{
                                  '.nextui-input-helper-text':{fontSize: '$xs'},
                                  '.nextui-input-helper-text-container':{top:40}
                              }}
                              helperColor={inputs.celular.color}
                              helperText={inputs.celular.helper}
                              color={inputs.celular.color} />
                              <Spacer y={3} />
                              <Input id='correoModalInscripcion' 
                                  width={"100%"} 
                                  name='correo'
                                  onChange={onChange}
                                  clearable bordered labelPlaceholder="Correo" 
                                  initialValue={correo}
                                  css={{
                                      '.nextui-input-helper-text':{fontSize: '$xs'},
                                      '.nextui-input-helper-text-container':{top:40}
                                  }}
                                  helperColor={inputs.correo.color}
                                  helperText={inputs.correo.helper}
                                  color={inputs.correo.color} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  {btn1.txt}
                </button>                                
              </div>
              
              {btn2&&<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${btn2State.disabled?'bg-gray-500':'bg-indigo-500'}  text-base font-medium text-white hover:${btn2State.disabled?'bg-gray-500':'bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm`}
                  onClick={async()=>{
                    setBtn2State({...btn2State,
                      txt:<Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />,
                      disabled:true
                    })
                    await btn2.onClick()
                    setBtn2State({...btn2State,txt:'Aceptar',disabled:false})
                  }}
                  disabled={btn2State.disabled}
                >
                  {btn2State.txt}
                </button>
              </div>
              }

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
