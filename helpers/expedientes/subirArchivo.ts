import { subirDocumentoGQL } from "../../apollo-cliente/perfil"
import { TypeDocumento } from "../../interfaces"

export interface CatDocumentos extends TypeDocumento {
  expedienteId?: number
  validado?: number
  cargado?: number
  bajando?: number
  enTramite?: number
  eliminando?: number
}

export const subirArchivo = async (
    expedienteId:number | null, 
    documentoId: number,
    userId: number,
    fileName: string,
    tipoDocumentoId:number,
    mapDoc: CatDocumentos[],
    setMapDoc: any,
    verificaToken:any,
    base64:string
) => {
      
    const bufferMax = 1024 * 64
    let buffer = 0
    let bufferLength = base64.length
    let part64 = ''
    const descripcion = ''
    let actualizar = expedienteId !== null!
    const alumno = {
      id: userId!,
      expedienteId
    }
    const archivo = {
      id: documentoId,
      actualizar,
      base64: part64//: result! as string  
    } 
    

    while(buffer<bufferMax&&buffer<bufferLength){
      part64 += base64[buffer++]
    }

    archivo.base64=part64

    const respDoc = await subirDocumentoGQL(alumno,archivo)
    if(!archivo.actualizar){
      //archivo.id = respDoc?.documento.id! as any
      alumno.expedienteId=respDoc?.documento?.expedienteId! as any
    }
    

    let newMap:any = []
      mapDoc.map((d)=>{
        if(d.id===archivo.id){
          d.cargado=buffer/bufferLength*100
          d.bajando=undefined
          d.eliminando=undefined
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)
    
    archivo.actualizar=false!

    while(buffer<bufferLength){
      const nextBuffer = buffer + bufferMax
      part64 = ''
      while(buffer<nextBuffer&&buffer<bufferLength){
        part64 += base64[buffer++]
      }
      
      archivo.base64 = part64
      await subirDocumentoGQL(alumno,archivo)
      
      const newMap:any = []
      mapDoc.map((d)=>{
        if(d.id===archivo.id){
          d.cargado=buffer/bufferLength*100
          
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)

    }
    
    mapDoc.map((d)=>{
        if(d.id===archivo.id){
          d.cargado=0
        }
      });
  
    await verificaToken!()

}