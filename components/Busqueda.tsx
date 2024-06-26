import { useState, useEffect } from 'react'
import Router from 'next/router';
import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { DocumentAddIcon, FolderAddIcon, HashtagIcon, TagIcon, ClipboardListIcon } from '@heroicons/react/outline'
import Fade from "@mui/material/Fade";
import { obtenerTramites } from '../apollo-cliente';

type TypeSection = {
    nombre: string
}

const sections: TypeSection[] = [
    {nombre: 'Trámites'},
    {nombre: 'Otros'}
] 

interface TipoBusqueda {
    id: number,
    name: string,
    url: string,
    icon: any,
    section?: number 
}

const iconSection = (s?:number) => {
    if(s===0){
        return ClipboardListIcon
    }

    return HashtagIcon
}

/*const projects:TipoBusqueda[] = [
  //{ id: 1, name: 'Workflow Inc. / Website Redesign', 
    //icon: iconSection() , url: '#', section: 1 },
  { id: 0, name: 'Tramite / Homologación', 
    icon: iconSection(0),url: '#', section: 0 },
]*/

let recent:TipoBusqueda[] = [/*projects[0]*/]

const quickActions = [
  { name: 'Add new file...', icon: DocumentAddIcon, shortcut: 'N', url: '#' },
  { name: 'Add new folder...', icon: FolderAddIcon, shortcut: 'F', url: '#' },
  { name: 'Add hashtag...', icon: HashtagIcon, shortcut: 'H', url: '#' },
  { name: 'Add label...', icon: TagIcon, shortcut: 'L', url: '#' },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const Busqueda = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [projects, setProjects]:[TipoBusqueda[]|undefined,any] = useState()
  let lastSection = -1
  const filteredProjects:TipoBusqueda[] | undefined =
    query === ''
      ? []
      : projects?.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase())
        });

    
    useEffect(()=>{
        obtenerTramites().then(resp=>{
            const tramites: TipoBusqueda[] = []
            resp.map((t:any,i:number)=>{
                tramites.push({
                    id: tramites.length,
                    name: t.nombre,
                    icon: iconSection(0),
                    url: "/tramite/"+t.id,
                    section: 0
                })
            });
            const localRecent = localStorage.getItem('recent') 
            
            if(localRecent){
                recent=JSON.parse(localRecent!)!
                recent.map((r)=>{
                    r.icon = iconSection(r.section!)
                })
            }
            setProjects(tramites)
        })
    },[])

    const handleChange=(item:TipoBusqueda)=>{
        
    }

    const downHandle = (item:TipoBusqueda) => {
        const existItem = recent.find((ex)=>{return ex.id===item.id})
        if(!existItem){
            recent.push(item)
            localStorage.setItem('recent',JSON.stringify(recent))
        }
    }

  return (
        <Fade in={true}>
            
            <Combobox as="div" value={undefined} onChange={handleChange}  >
                
                <div className="relative">
                    <SearchIcon
                        className="pointer-events-none absolute top-2.5 left-4 h-5 w-5 text-gray-900 text-opacity-40"
                        aria-hidden="true"
                    />
                    <Combobox.Input
                        id='buscar'
                        className="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Buscar..."
                        autoComplete='off'
                        onClick={(event:any)=>{
                            event.preventDefault()
                            setOpen(true)
                        }}
                        onFocus={(event:any)=>{
                            event.preventDefault()
                            setOpen(true)
                        }}
                        onBlur={()=>setOpen(false)}
                        onChange={(event) => { 
                            setQuery(event.target.value)
                            if(event.target.value===''){
                                setOpen(true)
                            }else if(!open){
                                setOpen(true)
                            }
                        }}
                    />
                </div>

                
                {((query === '' && recent.length>0) || filteredProjects?.length! > 0) && (
                  <Fade in={open}>
                    <div className='relative z-999' >       
                        <Combobox.Options
                            static
                            className="absolute rounded-md bg-white bg-opacity-80 w-full max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                        >
                            <li className="p-2">
                                {query === '' && (
                                    <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-blue-900">Busquedas recientes</h2>
                                )}
                                
                            <ul className="text-sm text-gray-700">
                                {(query === '' ? recent : 
                                    ( filteredProjects?.sort((a,b)=>{return a.section!-b.section!})! ))
                                    .map((project,i) => {

                                        const showSection = lastSection !== project.section! 
                                        lastSection = project.section!

                                        return (<div key={project.id} >
                                        {showSection && (
                                            <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-900">{sections![project?.section!]?.nombre}</h2>
                                        )}
                                            <a href={undefined} >
                                            <Combobox.Option
                                                
                                                value={project}
                                                onMouseDown={(event:any)=>{ 
                                                    event.preventDefault()
                                                    setOpen(false)
                                                    downHandle(project) 
                                                    Router.push(project.url)
                                                }}
                                            
                                                className={({ active }) =>
                                                classNames(
                                                    'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                                    active && 'bg-gray-900 bg-opacity-5 text-gray-900 cursor-pointer'
                                                )+' z-999'
                                                }
                                            >
                                                {({ active }) => (
                                                <>
                                                    
                                                        <project.icon 
                                                            className={classNames(
                                                                'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                                                active && 'text-opacity-100'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <span className="ml-3 flex-auto truncate">{project.name}</span>
                                                        {active && <span className="ml-3 flex-none text-gray-500">Ir a...</span>}
                                                    
                                                </>
                                                )}
                                            </Combobox.Option>
                                            </a>
                                        </div>)
                                    })}
                            </ul>
                            </li>
                            
                            {/*query === '' && (
                            <li className="p-2">
                                <h2 className="sr-only">Quick actions</h2>
                                <ul className="text-sm text-gray-700">
                                {quickActions.map((action) => (
                                    <Combobox.Option
                                    key={action.shortcut}
                                    value={action}
                                    className={({ active }) =>
                                        classNames(
                                        'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                        active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                                        )
                                    }
                                    >
                                    {({ active }) => (
                                        <>
                                        <action.icon
                                            className={classNames(
                                            'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                            active && 'text-opacity-100'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="ml-3 flex-auto truncate">{action.name}</span>
                                        <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                            <kbd className="font-sans">⌘</kbd>
                                            <kbd className="font-sans">{action.shortcut}</kbd>
                                        </span>
                                        </>
                                    )}
                                    </Combobox.Option>
                                ))}
                                </ul>
                            </li>
                            )*/}

                        </Combobox.Options>
                    </div>
                  </Fade>
                )}
                
            </Combobox>

        </Fade>
        )
    
  
}

export default Busqueda