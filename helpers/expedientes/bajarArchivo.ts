import { bajarDocumentoGQL } from "../../apollo-cliente/perfil"
import { TypeMapDoc } from "./subirArchivo"

export const bajarArchivo = async (userId:number,expedienteId:number,mapDoc:TypeMapDoc[],setMapDoc:any) => {
    let base64 = ''
    let fileName = ''
    const alumno = {
      id: userId!,
      expedienteId,
      buffer: 0!
    }
  
    let respDoc = await bajarDocumentoGQL(alumno)
    base64 += respDoc?.documento.part64

    let newMap:any = []
      mapDoc.map((d)=>{
        if(d.id===expedienteId){
          d.bajando=respDoc?.documento.bajando
          fileName=d.nombre   
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)

    while(!respDoc?.finalizado){
      alumno.buffer=respDoc?.documento.buffer!
      respDoc = await bajarDocumentoGQL(alumno)
      base64 += respDoc?.documento.part64
      
      const newMap:any = []
      mapDoc.map((d)=>{
        if(d.id===expedienteId){
          d.bajando=respDoc?.documento.bajando
          
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)
    }

    const downloadLink = document.createElement("a");

    downloadLink.href = base64;
    downloadLink.download = fileName;
    downloadLink.click();

    let pdfWindow = window!.open("")!;
    pdfWindow?.document?.write('<object name="file.pdf"  data="'+base64+'" type="application/pdf" width="100%" height="100%"></object>')
  }