export default (usuarios:any,de:any,stat:any) => {
    usuarios.map((u:any)=>{
        if(u.id===de){
            u.writing=stat
        }
    });
    return usuarios;
}