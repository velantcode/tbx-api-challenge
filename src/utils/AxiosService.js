const Axios = require('axios')
const ENV = require('../environmets')

const urlApi = ENV.URL_API || null

const axiosService = Axios.create({
  baseURL: urlApi,
  headers: {
    authorization: 'Bearer aSuperSecretKey'
  },
  withCredentials: false
})

const getErrorCatch = (error) => {
  const ret = {
    error: 'Error desconocido.',
    status: null,
    extraData: null
  }

  if (error) {
    // console.error('error', error);
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response) {
      if (error.response.status) ret.status = error.response.status

      if (error.response.data) {
        const { data } = error.response

        if (data) {
          if (ret.status === 401) ret.error = (data.error || error.toString())
          else if (data.errors?.length > 0) {
            ret.error = (data.errors[0].error || data.errors[0].msg || 'No se logró determinar el problema.')
          } else ret.error = data.error || error.toString()

          ret.extraData = data // if exist other data assignate;

          delete ret.extraData.error
        } else ret.error = (data.error || error.toString() || 'Error desconocido.')
      } else ret.error = error.toString() || 'Error desconocido.'
    } else ret.error = error.toString()
  }

  return ret
}

/**
 * @function getData
 * @param {String} endpoint Endpoint to request.
 * @param {Object|Null} params Query params (optional).
 * @return {Object} response Response data or error.
 */
const getData = async (endpoint, params = {}) => {
  try {
    const res = await axiosService.get(endpoint, { params })
    return { success: true, data: res.data }
  } catch (e) {
    return { success: false, ...getErrorCatch(e) }
  }
}

/**
 * @function postData
 * @param {String} endpoint Endpoint to request.
 * @param {Object|Null} data Request body data (optional).
 * @return {Object} response Response data or error.
 */
const postData = async (endpoint, data = {}) => {
  try {
    const res = await axiosService.post(endpoint, data)
    return { success: true, data: res.data }
  } catch (e) {
    return { success: false, ...getErrorCatch(e) }
  }
}

/**
 * @function putData
 * @param {String} endpoint Endpoint to request.
 * @param {Object|Null} data Request body data (optional).
 * @return {Object} response Response data or error.
 */
const putData = async (endpoint, data = {}) => {
  try {
    const res = await axiosService.put(endpoint, data)
    return { success: true, data: res.data }
  } catch (e) {
    return { success: false, ...getErrorCatch(e) }
  }
}

/**
 * @function deleteData
 * @param {String} endpoint Endpoint to request.
 * @return {Object} response Response data or error.
 */
const deleteData = async (endpoint) => {
  try {
    const res = await axiosService.delete(endpoint)
    return { success: true, data: res.data }
  } catch (e) {
    return { success: false, ...getErrorCatch(e) }
  }
}

module.exports = {
  getData,
  postData,
  putData,
  deleteData
}
