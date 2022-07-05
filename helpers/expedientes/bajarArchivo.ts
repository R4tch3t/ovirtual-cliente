import { bajarDocumentoGQL } from "../../apollo-cliente/perfil"
import { CatDocumentos } from "./subirArchivo"


let signatures:any = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};

export const detectMimeType=(b64:string) => {
  for (let s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

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

    const tipo = detectMimeType(base64)
    base64 = `data:${tipo};base64,${base64}`

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

    const tipoS = tipo.split('/')
    if(download){
      const downloadLink = document.createElement("a");
      downloadLink.href = base64;
      downloadLink.download = `${fileName}.${tipoS[1]}`;
      downloadLink.click();
      return
    }

    let pdfWindow = window!.open("")!;
    pdfWindow?.document?.write('<object name="'+fileName+"."+tipoS[1]+'"  data="'+base64+'" type="'+tipo+'" width="100%" height="100%"></object>')
  }