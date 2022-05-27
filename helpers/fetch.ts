import { urlApi } from "../variables/url"
export const fetchSinToken = async (endpoint:any,data:any="", method="GET") => {
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

    headers['x-token'] = token
    if(method==="GET"){
        const resp = await fetch(baseUrl,{headers});
        return await resp.json()
    }else{        
        headers["Content-type"]="application/json"
        const resp = await fetch(baseUrl,{
            method,
            headers,
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}
