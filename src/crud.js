const axios = require('axios')
const { baseApiUrl } = require('./global')

const get = async (route, params = {}) => {
  let url = `${baseApiUrl}/${route}`
  axios.defaults.withCredentials = true

  const result = await axios
    .get(url, params)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return []
    })

  return result
}

// const getCep = async (route) => {
//   // let url = `cep/${route}`
//   let url = `https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep/${route}`
//   console.log(url);
//   axios.defaults.withCredentials = true

//   const result = await axios
//     .get(url)
//     .then((res) => {
//       return res.data
//     })
//     .catch((err) => {
//       console.error(err)
//       return []
//     })

//   return result
// }

const getById = async (route, id) => {
  let url = `${baseApiUrl}/${route}/${id}`

  axios.defaults.withCredentials = true

  const result = await axios
    .get(url)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return null
    })

  return result
}

// const search = async () => {
//   return console.log('pesquisa')
// }

const search = async (route, objectParams) => {
  let url = `${baseApiUrl}/${route}`

  axios.defaults.withCredentials = true

  const result = await axios
    .get(url, { params: objectParams })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return null
    })
  return result
}

const insert = async (route, object) => {
  axios.defaults.withCredentials = true
  const url = `${baseApiUrl}/${route}`
  const result = await axios
    .post(url, object)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })

  return result
}

const update = async (route, id, object) => {
  axios.defaults.withCredentials = true

  const url = `${baseApiUrl}/${route}/${id}`
  const result = await axios
    .patch(url, object)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
      return err
    })

  return result
}

const remove = async (route, id) => {
  axios.defaults.withCredentials = true

  let url = `${baseApiUrl}/${route}/${id}`
  const result = await axios
    .delete(url)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return false
    })

  return result
}

const validateCurrentPassword = async (route, object) => {
  axios.defaults.withCredentials = true

  const url = `${baseApiUrl}/${route}`
  const result = await axios
    .post(url, object)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })

  return result
}

const insertFile = async (route, object) => {
  axios.defaults.withCredentials = true

  const url = `${baseApiUrl}/${route}`

  const formData = new FormData()

  if (Array.isArray(object.file)) {
    object.file.forEach((file) => {
      formData.append('file', file)
    })
  } else {
    formData.append('file', object.file)
  }

  delete object.file

  Object.keys(object).forEach((el) => {
    formData.append(el, object[el])
  })

  const result = await axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
      return false
    })

  return result
}

const getFile = async (route, object) => {
  let url = `${baseApiUrl}/${route}?tableName=${object.tableName}&startDate=${object.startDate}&endDate=${object.endDate}${object.service}`

  axios.defaults.withCredentials = true

  const result = await axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  })
    .then((res) => {
      const href = URL.createObjectURL(res.data)

      const link = document.createElement('a')

      link.href = href
      link.setAttribute('download', `${object.tableName}_${object.startDate}_${object.endDate}.xlsx`)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)

      URL.revokeObjectURL(href)

      return res
    })
    .catch((err) => {
      console.error(err)
      return []
    })

  return result
}

module.exports = {
  get,
  // getCep,
  getById,
  search,
  update,
  remove,
  insert,
  validateCurrentPassword,
  insertFile,
  getFile,
}
