

const validarPlanIngresarId = (value:string,inputs:any) => {
    //const {value}:any = document.getElementById('causaBaja')
    const valida = value ? value.match(/^[0-9]/i):false;
    const name = 'causaBaja'
    if(!valida){
      inputs[1] = {...inputs[1],[name]:{
        color: 'error', 
        helper: 'Causa de baja INVALIDA',
        statusColor: 'error'
      }}
      return false
    }
  
    if(valida){
        inputs[1] = {...inputs[1],[name]:{
            color: 'primary', 
            helper: 'Causa de baja ¡VALIDA!',
            statusColor: 'primary'
        }}
    }
    
    return true
};

export {validarPlanIngresarId}