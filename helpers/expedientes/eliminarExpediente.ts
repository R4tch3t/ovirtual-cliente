import { eliminarDocumentoGQL } from "../../apollo-cliente/perfil"

export const eliminarExpediente = async (id:number,verificaToken:any) => {
    const expediente = {
      id
    }
    await eliminarDocumentoGQL(expediente)
    await verificaToken!()
}