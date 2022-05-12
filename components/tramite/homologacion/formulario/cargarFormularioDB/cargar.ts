import {useEffect} from 'react';
import { useTramitesContext } from "../../../../../context/tramites/TramitesContext";
import { QueryPreregistro, usePreregistroPorCurp } from "../../../../../hooks/useQuery";
import { TypePaso1, TypePaso2, TypePaso3, TypePaso4, TypePaso5 } from '../../../../../interfaces/pasos/homologacion';
import { types } from "../../../../../types/tramites";


const cargarHomologacionDB = (data:QueryPreregistro, dispatch: any) => {
    //const {dispatch}:any = useTramitesContext();
    
    //const curp = auth.usuario ? auth.usuario?.alumno.crpentalu : ''
    //console.log(curp)
    //curp = curp ? curp : ''
    
    //const {aspirante} = data?.preregistroPorCurp!
    if(data?.preregistroPorCurp?.aspirante){
        const {aspirante, aspRegistro, aspDomiciliarios, aspMulticulturalidad, aspSocioEconomicos} = data?.preregistroPorCurp!
        const {planOfertado} = aspRegistro
        console.log('cargarHomologacionDB: ',data?.preregistroPorCurp!.aspirante)
        const aspiranteId = aspirante.id
        const planID = aspRegistro.planOfertadoId
        const planElegido = planOfertado?.nombrePlanEstudios + " - " + planOfertado?.nombreUnidadAcademica;
        const localidad = planOfertado?.localidad
        
        //paso1
        const nacionalidadID = aspirante.nacionalidad==='MX' ? 0 : 1
        const paisID = aspirante.paisId!
        const curp = aspirante.curp
        const nombre = aspirante.nombre
        const ape1 = aspirante.apellidoPaterno
        const ape2 = aspirante.apellidoMaterno!
        const celular = aspirante.telefonoCelular
        const telefono = aspirante.telefonoParticular!
        const email = aspirante.correoElectronico
        const paso1: TypePaso1 = {
            nacionalidadID,
            paisID,
            curp,
            nombre,
            ape1,
            ape2,
            celular,
            telefono,
            email,
            confirmEmail: email,
            completo: true
        }

        //paso2
        let paso2: TypePaso2 | null = null
        if(aspDomiciliarios){
            const calle = aspDomiciliarios?.calleActual
            const numeroExt = aspDomiciliarios?.numExteriorActual
            const numeroInt = aspDomiciliarios?.numInteriorActual?.toString()
            const colonia = aspDomiciliarios?.coloniaActual
            const entidadFedID = aspDomiciliarios?.locality?.municipio?.entidadFederativaId
            const municipioID = aspDomiciliarios?.locality?.municipioId
            const localidadID = aspDomiciliarios?.localityId
            const cp = aspDomiciliarios?.codigoPostalActual
            paso2 = {
                calle,
                numeroExt,
                numeroInt,
                colonia,
                entidadFedID,
                municipioID,
                localidadID,
                cp,
                completo: true

            }
        }

        //paso3
        let paso3: TypePaso3 | null = null

        //if(aspMulticulturalidad.aspiranteIdId!==undefined&&aspMulticulturalidad.aspiranteIdId!==null){
        if(aspMulticulturalidad){
            const esPuebloOriginario = aspMulticulturalidad?.pertenecePuebloOriginario === 1 
            let puebloID:any = aspMulticulturalidad?.puebloOriginarioIdId!
            puebloID = puebloID===null?undefined:puebloID
            const padeceDiscapacidad = aspMulticulturalidad?.tieneDiscapacidad === 1
            let discapacidadID:any = aspMulticulturalidad?.discapacidadIdId!
            discapacidadID = discapacidadID===null?undefined:discapacidadID
            const esAfroamericano = aspMulticulturalidad?.afroMexicanoGuerrerense===1
            const esResidenteSierra = aspMulticulturalidad?.residenteSierraGuerrero===1
            const esHijoMigrante = aspMulticulturalidad?.hijoMigranteGuerrerense === 1
            paso3 = {
                esPuebloOriginario,
                puebloID,
                padeceDiscapacidad,
                discapacidadID,
                esAfroamericano,
                esResidenteSierra,
                esHijoMigrante,
                completo: true

            }
        }
        
        
        //paso4
        let paso4: TypePaso4 | null = null

        if(aspRegistro.egresadoUagro !== null&&aspRegistro.egresadoUagro !== undefined){
            const esEgresadoUag = aspRegistro?.egresadoUagro === 1;
            const escuelaProcedencia=aspRegistro?.nombreEscuelaProcedencia!
            const escuelaUagroClave=aspRegistro?.claveEscuelaUagro!
            const matricula=aspRegistro?.matricula!
            paso4 = {
                esEgresadoUag,
                escuelaProcedencia,
                escuelaUagroClave,
                matricula,
                completo: true
            }
        }
        

        //paso5
        let paso5: TypePaso5 | null = null
        if(aspSocioEconomicos){
            const esEmpleado = aspSocioEconomicos?.trabaja===1
            let porcentajeAportaID:any = aspSocioEconomicos?.porcentajeFamIngresosMens!
            porcentajeAportaID = porcentajeAportaID === null ? undefined : porcentajeAportaID
            let porcentajeDependeID:any = aspSocioEconomicos?.porcentajeIngresoGastoFam!
            porcentajeDependeID = porcentajeDependeID === null ? undefined : porcentajeDependeID
            const ingresoMensualID = aspSocioEconomicos?.promedioIngresoMensual!
            const dineroSemanalID = aspSocioEconomicos?.gastoPersonalSemanal!
            const empleoMadreID = aspSocioEconomicos?.tipoEmpleoMadre!
            const empleoPadreID = aspSocioEconomicos?.tipoEmpleoPadre!
            paso5 = {
                esEmpleado,
                porcentajeAportaID,
                porcentajeDependeID,
                ingresoMensualID,
                dineroSemanalID,
                empleoMadreID,
                empleoPadreID,
                completo: true
            }
        }
        dispatch({
            type: types.cargarHomologacionDB,
            payload: {aspiranteId, planID, planElegido, localidad, paso1, paso2, paso3, paso4, paso5}
        });
        //},[dispatch])
    }/*else{
        dispatch({
            type: types.cargarHomologacionDB,
            payload: {aspiranteId:undefined, planID:undefined, planElegido:undefined, localidad:undefined, paso1:null, paso2:null}
        });
    }*/
}

export { cargarHomologacionDB }