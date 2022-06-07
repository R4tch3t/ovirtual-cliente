import { bajarDocumentoGQL } from "../../apollo-cliente/perfil"
import { CatDocumentos } from "./subirArchivo"

export const bajarArchivo = async (userId:number,expedienteId:number,mapDoc:CatDocumentos[],setMapDoc:any,download?:boolean) => {
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
        if(d.expedienteId===expedienteId){
          d.bajando=respDoc?.documento.bajando
          fileName=d.nombre!
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
        if(d.expedienteId===expedienteId){
          d.bajando=respDoc?.documento.bajando
          
        }
        newMap.push(d)
      });
      
      setMapDoc(newMap)
    }

    if(download){
      const downloadLink = document.createElement("a");

      downloadLink.href = base64;
      downloadLink.download = fileName+'.pdf';
      downloadLink.click();
      
      return
    }

    let pdfWindow = window!.open("")!;
    pdfWindow?.document?.write('<object name="file.pdf"  data="'+base64+'" type="application/pdf" width="100%" height="100%"></object>')
  }