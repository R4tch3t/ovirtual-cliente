export default (usuarios:any,de:any,stat:any) => {
    const newMap:any = []

    usuarios.map((u:any)=>{
        
        if(u.id===de){
            //u.writing=stat
            newMap.push({...u, writing:stat })
        }else{
            newMap.push({...u})
        }
    });

    return newMap;
}