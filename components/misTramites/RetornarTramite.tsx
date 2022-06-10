import { CatDocumentos } from '../../helpers/expedientes';
import { TramiteAlumno } from '../../hooks/useQuery/tramites/todosTramitesAlumno';
import { BajaTemporal } from '../tramite/bajaTemporal';
import { Homologacion } from '../tramite/homologacion';

type Props = {
    tramiteId: number
    tramites: TramiteAlumno[]
}

export default function RetornarTramite({tramiteId, tramites}:Props){
    const mapDocInit: CatDocumentos[] = []
    const tramSelec = tramites.find((t)=>{return t.tramiteId===tramiteId}) 
    tramSelec?.requisitos!.map((r)=>{
        mapDocInit.push({
            id: r.documento.id,
            nombre: r.documento.nombre,
            descripcion: r.documento.descripcion,
            tipoDocumentoId: r.documento.tipoDocumentoId,
            clave: r.documento.clave,
            activo: r.documento.activo
        })
    });

    if(tramiteId===1){
        
        return (
            <>
                <BajaTemporal tramiteId={tramiteId} mapDocInit={mapDocInit} />
            </>
        )
    }

    if(tramiteId===15){
        
        return (
            <>
                <Homologacion tramiteId={tramiteId} mapDocInit={mapDocInit} />
            </>
        )
    }

      return <></>
}