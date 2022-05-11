
import { TipoAspirante, TipoAspRegistro, TipoAspDomiciliario, TipoAspMulticulturalidad, TipoAspSocioEconomicos } from '../../../../../hooks/useMutation';
import { TypeHomologacion } from '../../../../../interfaces/TypesTramitesContext';
import { validarFormulario2 } from "../paso2/helper";
import { validarFormulario3 } from "../paso3/helper";
import { validarFormulario4 } from "../paso4/helper";
import { validarFormulario5 } from '../paso5/helper';

//type Guardar = (options?: MutationFunctionOptions<Mutation, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<...>

const obtenerFormulario = (homologacion: TypeHomologacion, paso: number) => {
    //const {tramitesState} = useTramitesContext();
    const {aspiranteId, planID, paso1, paso2, paso3, paso4, paso5} = /*tramitesState.procedimientos.*/homologacion;
    const nacionalidad = paso1?.nacionalidadID! === 0 ? 'MX' : 'NE' ;

    const asp: TipoAspirante = {
        paisId: paso1?.paisID!,
        curp: paso1?.curp!,
        nombre: paso1?.nombre!,
        apellidoPaterno: paso1?.ape1!,
        apellidoMaterno: paso1?.ape2!,
        telefonoCelular: paso1?.celular?.toString()!,
        telefonoParticular: paso1?.telefono?.toString()!,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        correoElectronico: paso1?.email!,
        estado: 1,
        nacionalidad
    }
    
    const aspReg: TipoAspRegistro = {
        aspiranteId: null,
        planOfertadoId: planID,
        nivelIngresar: 5,
        egresadoUagro: null,
        claveEscuelaUagro: null,
        nombreEscuelaProcedencia: null,
        matricula: null,
        claveUnicaRegistro: null,
        ciclo: null,
        consecutivoPlesxures: null,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        cancelado: 0,
        folioCeneval: null,
        estado: 1,
        referencia: null,
    }

    let aspDomi: TipoAspDomiciliario | null = null
    
    if(paso===2 || validarFormulario2(paso2!)){
       // const {paso2} = homologacion
        aspDomi = {
            aspiranteIdId: aspiranteId!,
            localityId: paso2?.localidadID!,
            calleActual: paso2?.calle!,
            numExteriorActual: paso2?.numeroExt!,
            numInteriorActual: paso2?.numeroInt!,
            coloniaActual: paso2?.colonia!,
            codigoPostalActual: parseInt(paso2?.cp!.toString()!)!

        }
    }

    let aspMulti: TipoAspMulticulturalidad | null = null

    if(paso===3 || validarFormulario3(paso3!)){
        // const {paso2} = homologacion
        
        aspMulti = {
            puebloOriginarioIdId: paso3?.puebloID!,
            discapacidadIdId: paso3?.discapacidadID!,
            aspiranteIdId: aspiranteId!,
            pertenecePuebloOriginario: (paso3?.esPuebloOriginario! ? 1:0),
            tieneDiscapacidad: (paso3?.padeceDiscapacidad! ? 1:0),
            afroMexicanoGuerrerense: (paso3?.esAfroamericano! ? 1:0),
            residenteSierraGuerrero: (paso3?.esResidenteSierra! ? 1:0),
            hijoMigranteGuerrerense: (paso3?.esHijoMigrante! ? 1:0)!,
 
        }
     }

     if(paso===4 || validarFormulario4(paso4!)){
        // const {paso2} = homologacion
        
        aspReg.egresadoUagro = paso4?.esEgresadoUag ? 1:0
        aspReg.claveEscuelaUagro = paso4?.escuelaUagroClave!
        aspReg.nombreEscuelaProcedencia = paso4?.escuelaProcedencia!
        aspReg.matricula = paso4?.matricula!

     }
     
     let aspSocioEco: TipoAspSocioEconomicos | null = null
     if(paso===5 || validarFormulario5(paso5!)){
        aspSocioEco = {
            aspiranteIdId: aspiranteId!,
            tipoEmpleoMadre: paso5?.empleoMadreID!,
            tipoEmpleoPadre: paso5?.empleoPadreID!,
            promedioIngresoMensual: paso5?.ingresoMensualID!,
            porcentajeIngresoGastoFam: paso5?.porcentajeDependeID!,
            porcentajeFamIngresosMens: paso5?.porcentajeAportaID!,
            gastoPersonalSemanal: paso5?.dineroSemanalID!,
            trabaja: paso5?.esEmpleado ? 1 : 0
        }
     }
    //if(aspiranteId===null){
       //const [data, setData] = useNuevoAsp(asp,aspReg)
       //data({variables})
       return {asp, aspReg, aspDomi, aspMulti, aspSocioEco}
    //}
}

export {obtenerFormulario}
