const validateRequired = (value, required, object, messageRequired, minLength, messageLength) => {
  if (!value && required) {
    setError(object, messageRequired)
    return false
  }
  
  else if (value && typeof(value) == 'number') {
    setValid(object)
    return true
  }
  
  else if (value && (value.trim().length < minLength)) {
    setError(object, messageLength)
    return false
  }


  else {
    setValid(object)
    return true
  }
}

const validateDate = (value, required, object, messageRequired) => {
  if (!value && required) {
    setError(object, messageRequired)
    return false
  }

  else {
    setValid(object)
    return true
  }
}

const validateTime = (value, required, object, messageRequired) => {
  if (!value && required) {
    setError(object, messageRequired);
    return false;
  }

  // Adicione sua validação específica de hora aqui, se necessário.

  // Por exemplo, você pode verificar se a hora está em um formato HH:mm
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(value)) {
    setError(object, "Hora inválida. Use o formato HH:mm.");
    return false;
  }

  // Se a validação de hora não passar, defina o erro.
  // Caso contrário, defina como válido.

  setValid(object);
  return true;
};



const validateFile = (value, required, object, messageRequired) => {
  if (!value && required) {
    setError(object, messageRequired)
    return false
  }

  else {
    setValid(object)
    return true
  }
}

const validateEmail = (value, object, message) => {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  !reg.test(value)
    ? setError(object, message)
    : setValid(object)
}

const setError = (object, message) => {
  object.error = message
  object.hasError = true
}

const setValid = (object) => {
  object.error = ''
  object.hasError = false
}

module.exports = {
  validateRequired,
  validateTime,
  validateEmail,
  validateFile,
  validateDate,
  setError,
  setValid,
}