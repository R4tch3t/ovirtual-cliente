

const validarTelefono = (inputs:any) => {
    const {value}:any = document.getElementById('telefono')
    const valida = value ? value.match(/^[0-9]{10,10}$/i):false;
    const name = 'telefono'
    if(!valida){
      inputs[1] = {...inputs[1],[name]:{
        color: 'error', 
        helper: 'Telefono INVALIDO',
        statusColor: 'error'
      }}
      return false
    }

    if(valida){
        inputs[1] = {...inputs[1],[name]:{
            color: 'primary', 
            helper: 'Telefono ¡VALIDO!',
            statusColor: 'primary'
        }}
    }
    
    return true
};

export {validarTelefono}