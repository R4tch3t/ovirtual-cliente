import { TipoNivelEstudio } from '../apollo-cliente';
import { TypeTramite } from '../interfaces/TypesTramitesContext';

const filtroTramites = (tramites:TypeTramite[],nivelEstudio:TipoNivelEstudio[],catNivelEstudio:string) =>{
    let newTramites: TypeTramite[] = []
    const splitCatNivelEstudio = catNivelEstudio.split('[')[0]    
    tramites.map((t)=>{
                    
      if(
        t?.nivelAplica!.startsWith(splitCatNivelEstudio)
        ||t?.nivelAplica!.startsWith(splitCatNivelEstudio+"-")
        ||t?.nivelAplica!.includes("-"+splitCatNivelEstudio)
      ){
        
        let nivelEstudioStr = '* ';
        nivelEstudio.map((n) => {
          if(catNivelEstudio.includes(n?.id!+'')&&t?.nivelAplica?.includes(n?.id!+'')){
            nivelEstudioStr += ', ' + n.nombre
          }
        });

        nivelEstudioStr=nivelEstudioStr.replace('* ,','');
        /*if(nivelEstudioStr===''){
          nivelEstudioStr='*'
        }*/
        newTramites.push({...t,nivelEstudio:nivelEstudioStr});

      }

    });

    newTramites = newTramites.sort((a,b)=>{
      let splitA:any = a.nivelAplica?.split('[')
      splitA = splitA![1].split(',')
      splitA=parseInt(splitA[0])
      let splitB:any = b.nivelAplica?.split('[')
      splitB = splitB![1].split(',')
      splitB=parseInt(splitB[0])
      return splitA-splitB
    })

    return newTramites
}

export default filtroTramites