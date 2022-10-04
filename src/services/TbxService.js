const { getData } = require('../utils/AxiosService')

const pt = '/secret/'

/* PUBLIC QUIZ */

async function getFiles () {
  const res = await getData(`${pt}/files`)
  if (res && res.success) return res.data.files || []
  return res
}

async function getFileDetails (name) {
  const res = await getData(`${pt}/file/${name}`)
  if (res && res.success) return res.data || null
  return res
}

module.exports = {
  getFiles,
  getFileDetails
}
