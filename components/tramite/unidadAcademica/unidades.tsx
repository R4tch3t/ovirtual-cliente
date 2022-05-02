
    /*import {
        AcademicCapIcon,
        BadgeCheckIcon,
        CashIcon,
        ClockIcon,
        ReceiptRefundIcon,
        UsersIcon,
    } from '@heroicons/react/outline'*/

    import Image from 'next/image'
    import { FC } from 'react'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
    import { TypeUnidadesAcademicas } from '../../../interfaces'

    import IconUni from '../../../public/iconUni.png'
import { types } from '../../../types/tramites'

    type Props = {
      unidadesAcademicas: TypeUnidadesAcademicas[]
    }

    const icon = <Image src={IconUni} width={60} height={60} />
    const colores = [
      {
          iconForeground: 'text-teal-700',
          iconBackground: 'bg-teal-50',
      },
      {
          iconForeground: 'text-purple-700',
          iconBackground: 'bg-purple-50',
      },
      {
          iconForeground: 'text-sky-700',
          iconBackground: 'bg-sky-50',
      },
      {  
          iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
      {
          iconForeground: 'text-rose-700',
          iconBackground: 'bg-rose-50',
      },
      {
          iconForeground: 'text-indigo-700',
          iconBackground: 'bg-indigo-50',
      },
    ]

    

    /*const actions = [
        {
            title: 'Request time off',
            href: '#',
            icon,
            iconForeground: 'text-teal-700',
            iconBackground: 'bg-teal-50',
        },
        {
            title: 'Benefits',
            href: '#',
            icon,
            iconForeground: 'text-purple-700',
            iconBackground: 'bg-purple-50',
        },
        {
            title: 'Schedule a one-on-one',
            href: '#',
            icon,
            iconForeground: 'text-sky-700',
            iconBackground: 'bg-sky-50',
        },
        { 
            title: 'Payroll', href: '#', 
            icon, 
            iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
        {
            title: 'Submit an expense',
            href: '#',
            icon,
            iconForeground: 'text-rose-700',
            iconBackground: 'bg-rose-50',
        },
        {
            title: 'Training',
            href: '#',
            icon,
            iconForeground: 'text-indigo-700',
            iconBackground: 'bg-indigo-50',
        },
    ]*/
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

const UnidadesAcademicas:FC<Props> = ({unidadesAcademicas}) => {
  const {dispatch}:any = useTramitesContext();
  let c = -1
  
  const seleccionarPlan = (planID: number, planElegido: string, localidad: string) => {
    dispatch({
      type: types.seleccionarPlan,
      payload: {planID, planElegido, localidad}
    });
  }
    return (
        <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px">
          {unidadesAcademicas.map((unidad, unidadIdx) => {
            c = colores.length-1 === c ? 0 : c+1
            return(
            <div
              key={unidad.id}
              onMouseDown={()=>{
                const {id, localidad} = unidad;
                const planElegido = unidad.nombrePlanEstudios + " - " + unidad.nombreUnidadAcademica;
                seleccionarPlan(id, planElegido, localidad) 
              }}
              className={classNames(
                unidadIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                unidadIdx === 1 ? 'sm:rounded-tr-lg' : '',
                unidadIdx === unidadesAcademicas.length - 2 ? 'sm:rounded-bl-lg' : '',
                unidadIdx === unidadesAcademicas.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
              )}
            >
              <div style={{textAlign: 'center'}} >
                <span
                  className={classNames(
                    /*action.iconBackground,
                    action.iconForeground,*/
                    //'text-teal-700',
                    //'bg-teal-50',
                    colores[c].iconBackground,
                    colores[c].iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-white'
                  )}
                  
                >
                     {icon} 
                  {/*<action.icon className="h-6 w-6" aria-hidden="true" />*/}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href={undefined} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {unidad.nombrePlanEstudios}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {unidad.nombreUnidadAcademica}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Ubicación: <b>{unidad.localidad}</b>
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          )}
          
          )
        }
        </div>
      )
}

export  {
    UnidadesAcademicas
}