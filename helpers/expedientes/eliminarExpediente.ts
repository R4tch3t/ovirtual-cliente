import client from "../../apollo-cliente";
import { eliminarDocumentoGQL } from "../../apollo-cliente/perfil"
import { CatDocumentos } from "./subirArchivo";

export const eliminarExpediente = async (
  id:number,
  mapDoc: CatDocumentos[],
  setMapDoc: any,
  verificaToken:any,
  setEliminando:any) => {
    const expediente = {
      id
    }
    
    let newMap:any = []
    mapDoc.map((d)=>{
      if(d.expedienteId===id){
        d.eliminando=1
      }
      newMap.push(d)
    });
    setMapDoc(newMap)

    await client.cache.reset()
    await eliminarDocumentoGQL(expediente)
    setEliminando(id)
    
}