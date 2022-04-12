import type {NextPage} from 'next'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from '../context/chat/ChatContext';
import {fetchConToken} from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { diffDate } from '../helpers/spellDate';
import {types} from '../types/types';
import {useEffect} from 'react';
import { Loading } from '@nextui-org/react';
/*const people = [
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg',
    },
    // More people...
  ]
const activityItems = [
{ id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
// More items...
]*/
let lastFeed:any = null;
export const Feed: NextPage = () => {
    const {chatState, dispatch} = useChatContext()
    const {auth}:any = useAppContext()
    const imageUrl='https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg';
    

    const onClick = async ({currentTarget}:any,user:any) => {
        //document.getElementById("id")?.classList.
       
        /*if(lastFeed!==null){
            lastFeed.classList.remove(["selected-feed"]);
        }
        lastFeed=currentTarget;
        lastFeed.classList.add("selected-feed");*/

        dispatch({
            type: types.activarChat,
            payload: user
        });
        const resp = await fetchConToken(`mensajes/${user.id}`);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });
        
        //user.lastMsg=null
        /*dispatch({
            type: types.usuariosCargados,
            payload: chatState.usuarios
        });*/ //On chatBox more optimus

        console.log(chatState.usuarios);
        scrollToBottom('chatBox');
    }
    /*const people = [{
        name: 'Victor',
        imageUrl:'https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg',
      }]
    let [activityItems, setActivityItems]: any = useState([{id:0,person: people[0],msj:'Hola mundo', time: '1h'},{id:2,person: people[0],msj:'Hola mundo2', time: '2h'}]);
    */
    /*const socket: Socket = io();
    socket.on("msjfromserver", (data)=>{
        //const listmsj: any = document.getElementById("mensajes");
        //listmsj.innerHTML += `<li>${data.msj}</li>`
        const {msj, time, name} = data;
        //const name = "Victor"
        const imageUrl='https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg';
        const id = activityItems.length+1;
        
        //const time = '1h'
        people.push({name,imageUrl});
        const person = people[people.length-1];
        activityItems=activityItems.concat([{id,person,msj,time}]);
        setActivityItems(activityItems);
    });*/
    console.log(chatState.usuarios)
    useEffect(()=>{
        scrollToBottom('chatBox');
    },[]);

    if(chatState.usuarios.length===0){
        return (
        <div className='h-full wMid' >
            <h2 className='rightH2' >Lista de usuarios</h2>
            <Loading type="spinner" size="lg" />
        </div>)
    }

    if(chatState.usuarios.length>0){
        return (
            <div>
                <h2 className='rightH2' >Lista de usuarios</h2>
                <ul role="list" className="divide-y divide-gray-200">
                    {chatState.usuarios
                    .filter((user:any)=>user.id!==auth.id)
                    .map((user: any) => (
                    <li key={user.id} className="py-4">
                        <div 
                            className={`border-2 border-gray-200 border-dashed rounded-lg select-feed relative${user.id===chatState.chatActivo.id?' selected-feed':''}`}
                            onMouseEnter={(e)=>{}}  onMouseUp={(e)=>{onClick(e,user)}} 
                            style={{height: 50}}
                        >
                        <div className="flex space-x-3">
                        <img className="h-6 w-6 rounded-full" src={imageUrl/*activityItem.person.imageUrl*/} alt="" />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">{user.alumno?user.alumno.nomentalu:user.nombre}</h3>
                                {(user.online===true||user.online===1)&&<>
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
                                    <p className="text-sm text-green-500"><b>En linea</b></p>
                                </>}
                                {(user.online===false||user.online===0)&&<>
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-gray-400" />
                                    <p className="text-sm text-gray-500">{diffDate(user.lastConn,new Date())}</p>
                                </>}
                            </div>
                            {user.lastMsg && user.lastMsg.para === auth.id && <p className="text-sm text-blue-500">
                            {/*Deployed {activityItem.project} ({activityItem.commit} in master) to {activityItem.environment}*/}
                            {user.lastMsg.mensaje}
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-blue-400" />
                            </p>
                            }
                            {/*((!user.lastMsg && !user.writing) || (user.lastMsg && user.lastMsg.para !== auth.id))&&<br/>*/}
                            {user.writing &&
                            <span className="text-sm text-green-500">
                                escribiendo...
                            </span>
                            }
                        </div>
                        </div>
                        
                        
                        
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        )
    }else{
        return <></>
    }
}

export default ()=>null