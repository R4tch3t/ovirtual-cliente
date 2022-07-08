import { getAvatarGQL } from "../../apollo-cliente/login/getAvatar"
import { detectMimeType } from "../../helpers/expedientes"

export const getAvatarApollo = async (idUser:number) => {
    //await client.cache.reset()
    let base64 = ''
    const user = {
      idUser,
      buffer: 0!
    }
    
    let respDoc = await getAvatarGQL(user)
    base64 += respDoc?.avatar?.part64!

    const tipo = detectMimeType(base64)
    base64 = `data:${tipo};base64,${base64}`
    
    while(!respDoc?.finalizado){
        user.buffer=respDoc?.avatar?.buffer!
        respDoc = await getAvatarGQL(user)
        base64 += respDoc?.avatar?.part64!
    }

    return base64
}