
import { BajaTemporal } from '../tramite/bajaTemporal';

type Props = {
    tramiteId: number
}

export default function RetornarTramite({tramiteId}:Props){
    return (
        <>
          {tramiteId===1 && <BajaTemporal tramiteId={tramiteId} />}
        </>
      )
}