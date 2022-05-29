import { subirDocumentoGQL } from "../../apollo-cliente/perfil"

export type TypeMapDoc = {
    id: null | number,
    nombre: string,
    descripcion: string,
    tipoDocumentoId: number,
    validado?: number,
    cargado?: number,
    bajando?: number
}

export const subirArchivo = async (
    expedienteId:number | null, 
    userId: number,
    fileName: string,
    tipoDocumentoId:number,
    mapDoc: TypeMapDoc[],
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
      id: null,
      nombre: fileName!,
      descripcion: descripcion!,
      tipoDocumentoId,
      actualizar,
      base64: part64//: result! as string  
    } 
    

    while(buffer<bufferMax&&buffer<bufferLength){
      part64 += base64[buffer++]
    }

    archivo.base64=part64

    const respDoc = await subirDocumentoGQL(alumno,archivo)
    if(!archivo.actualizar){
      archivo.id = respDoc?.documento.id! as any
      alumno.expedienteId=respDoc?.documento?.expedienteId! as any
    }
    

    let newMap:any = []
      mapDoc.map((d)=>{
        if(d.nombre===archivo.nombre){
          d.cargado=buffer/bufferLength*100
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
        if(d.nombre===archivo.nombre){
          d.cargado=buffer/bufferLength*100
          
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)

    }
    
    mapDoc.map((d)=>{
        if(d.nombre===archivo.nombre){
          d.cargado=0
        }
      });
  
    await verificaToken!()

}