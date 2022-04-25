import { TypeTramite } from '../interfaces/TypesTramitesContext';
const filtroTramites = (tramites:TypeTramite[],tta:number, ttb:number) =>{
    /*tramites = tramites!.filter((tramite) => {
        // console.log(tramite.nivelAplica)
         const tipoTramites = tramite.TipoTramites?.filter((tt)=>{
           return tt.tipoTramite > tta && tt.tipoTramite < ttb
         })

         return tipoTramites&&tipoTramites!.length>0
         //return tramite.nivelAplica! > 4 && tramite.nivelAplica! < 9
       }).sort((a,b)=>{
         const ta = a.TipoTramites && a.TipoTramites.length>0 && a.TipoTramites[0]?.id ? a.TipoTramites[0].id : a.id
         const tb = b.TipoTramites && b.TipoTramites.length>0 && b.TipoTramites[0]?.id ? b.TipoTramites[0].id : b.id 
         return ta-tb
       });*/

    return tramites
}

export default filtroTramites