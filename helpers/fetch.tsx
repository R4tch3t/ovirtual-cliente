import { urlApi } from "../variables/url"
export const fetchSinToken = async (endpoint:any,data:any, method="GET") => {
    const baseUrl = `${urlApi}/${endpoint}`
    
    if(method==="GET"){
        const resp = await fetch(baseUrl)
        return await resp.json()
    }else{
        const resp = await fetch(baseUrl,{
            method,
            headers:{ 
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}

export const fetchConToken = async (endpoint:any,data:any='', method="GET",headers:any={}) => {
    const baseUrl = `${urlApi}/${endpoint}`
    const token = localStorage.getItem("token")||'';

    console.log(token)
    headers['x-token'] = token
    if(method==="GET"){
        const resp = await fetch(baseUrl,{headers/*: {
                "x-token": token
            }*/
        });
        return await resp.json()
    }else{
        console.log(JSON.stringify(data))
        headers["Content-type"]="application/json"
        const resp = await fetch(baseUrl,{
            method,
            headers/*:{ 
                "Content-type": "application/json",
                "x-token": token
            }*/,
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}

export default ()=>null