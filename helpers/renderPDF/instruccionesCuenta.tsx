import React, { FC } from "react";
import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image,
  Link
} from "@react-pdf/renderer";
import { types } from "../../types/tramites";
import { useTramitesContext } from "../../context/tramites/TramitesContext";
const LogoH = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_de_la_UAGro.svg/800px-Logo_de_la_UAGro.svg.png';
const LogoF = "/footTramite.jpg";

const RobT = "/Typography/Roboto-Thin.ttf";
const Rob = "/Typography/Roboto-Italic.ttf";
const RobB = "/Typography/Roboto-Bold.ttf";
const RobBI = "/Typography/Roboto-Bold.ttf";

   
Font.register
({
  family: 'Roboto',
  format: "truetype",
  fonts: [{
    src: RobT,
    fontWeight: 'thin'
  },
  {
    src: Rob,
    fontStyle: 'italic'
  }, {
    src: RobB,
    fontWeight: 'bold'
  }, {
    src: RobBI,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }]

});

interface Props {
  aspiranteId?: number,
  nombre?: string,
  matricula?: string,
  unidadAcademica?: string,
  planEstudios?: string,
  correo?: string,
  celular?: string,
  urlActivar?: string,
  linkGenerarPago?: string,
  urlTramite?: string,
  password?:string,
  dispatch?:any
}
interface State extends Props{
  url: string | null,
  d: Date | null
}

const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']


class RenderPDF extends React.Component<Props> {
  state:State = { url: null, d: null };
  constructor(props:Props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      d,
      //nombre: props.tramiteId,
      //titulo: props.titulo, 
      aspiranteId: props.aspiranteId,
      nombre: props.nombre,
      matricula: props.matricula,
      unidadAcademica: props.unidadAcademica,
      planEstudios: props.planEstudios,
      correo: props.correo,
      celular: props.celular,
      urlActivar: props.urlActivar,
      linkGenerarPago: props.linkGenerarPago,
      urlTramite: props.urlTramite,
      password: props.password,
      dispatch: props.dispatch
    }
  }

  onRender = async ({ blob }:any) => {
    const {dispatch} = this.state
    const titulo = `Instrucciones para activar cuenta - ${this.state!.nombre}`
    this.setState({ url: URL.createObjectURL(blob) });
    console.log(blob)
    let pdfWindow = window!.open(this.state.url!)!;

    const downloadLink = document.createElement("a");

    downloadLink.href = this.state.url!;
    downloadLink.download = titulo!+'.pdf';
    downloadLink.click();

    dispatch({
      type: types.confirmacionCompleta,
      payload: {urlPDF: this.state.url!}
    });

  };
 
  styles = StyleSheet.create({
    logoH: {
      position: "absolute",
      width: 50,
      height: 70,
      left: '45%'
    },
    logoF: {
      position: "absolute",
      width: '100%',
      height: 100,
      bottom: 0
    },
    headV: {
      textAlign: 'left',
      margin: 50,
      marginTop: 100
    },
    headV2: {
      textAlign: 'left',
      marginTop: -100,
      marginLeft: 50
    },
    headV3: {
      textAlign: 'right',
      marginRight: 50
    },
    headT: {
      fontFamily: "Roboto",
      fontWeight: 'thin'
    },
    headTB: {
      fontFamily: "Roboto",
      fontWeight: 'bold'
    },
    midV: {
      textAlign: 'justify',
      marginLeft: 50,
      marginRight: 50
    },
    midV2: {
      textAlign: 'center',
      marginLeft: 50,
      marginRight: 50,
      marginTop: 5
    },
    headTI: {
      fontFamily: "Roboto",
      fontStyle: 'italic'
    },
    cajaFirma: {
      width: "100%",
      backgroundColor: 'gray',
      opacity: 0.70,
      height: 25,
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0
    },
    footV: {
      textAlign: 'justify',
      marginTop: 10,
      marginLeft: 50,
      marginRight: 50
    },
    footVD: {
      position: 'absolute',
      bottom: 60,
      right: 120
    }
  });

  

  render() {
    const {
      aspiranteId,
      matricula, nombre,
      unidadAcademica, planEstudios,
      correo,
      celular,
      urlActivar,
      linkGenerarPago,
      urlTramite,
      password
    } = this.state
   
    const d = this.state.d?.toLocaleDateString()
    
    return (
                 <div> 

                  <PDFViewer style={{ width: 0, height: 0 }}  >
                  <Document  onRender={this.onRender} title={`Instrucciones para activar cuenta - ${this.state!.nombre}.pdf`} >
                    <Page size="LETTER" wrap>
                      
                        <Image src={LogoH}  style={this.styles.logoH} />
                      
                      <View style={this.styles.headV} >
                        
                        <Text>
                          <Text style={[this.styles.headT,{fontSize: 11}]} >Estimado: <Text style={[this.styles.headTB,{fontSize: 12}]} >{nombre}</Text>  por medio del presente hacemos 
                            de tu conocimiento que tu proceso de confirmación ha sido 
                            completado con los siguientes datos: </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}} >

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Nombre: <Text style={[this.styles.headTB,{fontSize: 12}]} >{nombre}</Text> </Text> 
                          
                        </Text>
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Escuela a ingresar: <Text style={[this.styles.headTB,{fontSize: 12}]} >{unidadAcademica}</Text> </Text> 
                          
                        </Text>
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Plan de estudios a ingresar: <Text style={[this.styles.headTB,{fontSize: 12}]} >{planEstudios}</Text> </Text> 
                          
                        </Text>
                        {matricula && 
                          <Text>

                            <Text style={[this.styles.headT,{fontSize: 11}]} >Matrícula: <Text style={[this.styles.headTB,{fontSize: 12}]} >{matricula}</Text> </Text> 
                            
                          </Text>
                        }
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Correo electrónico: <Text style={[this.styles.headTB,{fontSize: 12}]} >{correo}</Text> </Text> 
                          
                        </Text>
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Teléfono: <Text style={[this.styles.headTB,{fontSize: 12}]} >{celular}</Text> </Text> 
                          
                        </Text>                  

                        <Text style={{marginTop: 20}} >

                          <Text style={[this.styles.headT,{fontSize: 11}]} >A continuación, el siguiente paso es integrar tu expediente digital de inscripción de nuevo ingreso y generar el pago correspondiente en la página:  </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}} >

                          <Link style={[this.styles.headT,{fontSize: 11}]} src='https://tramitadae.uagro.mx' >https://tramitadae.uagro.mx  </Link> 
                          
                        </Text>

                        <Text style={{marginTop: 20}} >

                          <Text style={[this.styles.headT,{fontSize: 11}]} >1. Completar el registro confirmando tu cuenta a través del siguiente link.  </Text> 
                          
                        </Text>
                        <Text style={{marginTop: 20}} >

                          <Text style={[this.styles.headTB,{fontSize: 12}]} >{`Activar: `}
                            <Link style={[this.styles.headT,{fontSize: 11}]} src={urlActivar!} >{urlActivar}</Link> 
                          </Text> 
                          
                        </Text>
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Su correo de acceso es:{' '}
                            <Text style={[this.styles.headTB,{fontSize: 12}]} >{correo}</Text> 
                          </Text> 
                          
                        </Text>
                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Su contraseña es:{' '}  
                            <Text style={[this.styles.headTB,{fontSize: 12}]} >{password}</Text> 
                          </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}}>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >{`2. Una vez confirmada la cuenta, ingresa a la página `}    
                            <Link style={[this.styles.headT,{fontSize: 11}]} src={urlTramite!} >{urlTramite!}</Link> 
                          </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}}>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >
                            {`3. Selecciona el trámite Inscripción de nuevo ingreso (Nivel Medio superior, Nivel Superior, Maestría, Especialidad o Doctorado), según sea tu caso `}    
                          </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}}>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >
                            {`4. Genera tu formato de pago. `}    
                           
                          </Text> 
                          
                        </Text>

                        <Text>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >Link para Generar el Pago de Inscripción: {" "}
                            <Link style={[this.styles.headT,{fontSize: 11}]} src={linkGenerarPago!} >{linkGenerarPago}</Link> 
                          </Text> 

                        </Text>

                        <Text style={{marginTop: 20}}>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >
                            {`5. Integra los documentos que se solicitan. `}    
                           
                          </Text> 
                          
                        </Text>

                        <Text style={{marginTop: 20}}>

                          <Text style={[this.styles.headT,{fontSize: 11}]} >
                            {`6. envía el trámite a revisión `}    
                           
                          </Text> 
                          
                        </Text>

                      </View>                                                               

                    </Page>
                  </Document>
                  </PDFViewer>
                
      </div>
    );
                      
  }
}
export default RenderPDF;