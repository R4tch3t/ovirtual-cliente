import { CatDocumentos } from '../../helpers/expedientes';
import { TramiteAlumno } from '../../hooks/useQuery/tramites/todosTramitesAlumno';
import { BajaTemporal } from '../tramite/bajaTemporal';
import { Equivalencia } from '../tramite/equivalencia';
import { Homologacion } from '../tramite/homologacion';
import { Inscripcion } from '../tramite/inscripcion';
import { Revalidacion } from '../tramite/revalidacion';

type Props = {
    tramiteId: number
    tramites: TramiteAlumno[]
}

export default function RetornarTramite({tramiteId, tramites}:Props){
    const mapDocInit: CatDocumentos[] = []
    let tramSelec = tramites.find((t)=>{return t.tramiteId===tramiteId}) 
    tramSelec?.requisitos?.map((r)=>{        
        mapDocInit.push({
            id: r.documento.id,
            nombre: r.documento.nombre,
            descripcion: r.documento.descripcion,
            tipoDocumentoId: r.documento.tipoDocumentoId,
            clave: r.documento.clave,
            activo: r.documento.activo,
            estadoId: r.documento.estadoId
        })
    });

    if(tramiteId===1){
        
        return (
            <>
                <BajaTemporal tramiteId={tramiteId} mapDocInit={mapDocInit} />
            </>
        )
    }

    if(tramiteId===5||tramiteId===40||
        tramiteId===46||tramiteId===47||
        tramiteId===48){
        
        return (
            <>
                <Inscripcion 
                    tramiteId={tramiteId} 
                    titulo={tramSelec?.tramite?.nombre!} 
                    descripcion={tramSelec?.tramite?.descripcion!} 
                    mapDocInit={mapDocInit} />
            </>
        )
    }

    if(tramiteId===14){
        
        return (
            <>
                <Equivalencia tramiteId={tramiteId} mapDocInit={mapDocInit} 
                    titulo={tramSelec?.tramite?.nombre!} 
                    descripcion={tramSelec?.tramite?.descripcion!}
                 />
            </>
        )
        
    }

    if(tramiteId===15){
        
        return (
            <>
                <Homologacion tramiteId={tramiteId} mapDocInit={mapDocInit} 
                    titulo={tramSelec?.tramite?.nombre!} 
                    descripcion={tramSelec?.tramite?.descripcion!}
                 />
            </>
        )

    }

    if(tramiteId===16){
        
        return (
            <>
                <Revalidacion tramiteId={tramiteId} mapDocInit={mapDocInit} 
                    titulo={tramSelec?.tramite?.nombre!} 
                    descripcion={tramSelec?.tramite?.descripcion!}
                 />
            </>
        )
        
    }

      return <></>
}