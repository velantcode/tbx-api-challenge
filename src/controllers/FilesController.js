const TbxService = require('../services/TbxService')

function parseData (data) {
  if (!data) return null

  const split = typeof data === 'string' ? data.split('\n') : []

  if (split?.length <= 1) return null

  const model = { file: '', lines: [] }

  split.forEach((s, index) => {
    if (index === 0) return

    const d = s?.split(',') || []

    if (d.length !== 4) return

    if (!/^[0-9]{1,}/.test(`${d[2]}`.trim()) || !/[0-9a-f]{32}/i.test(`${d[3]}`.trim())) return

    if (!model.file) model.file = d[0]
    model.lines.push({
      hex: d[3],
      number: Number.parseInt(`${d[2]}`.trim()),
      text: d[1]
    })
  })

  return model.lines.length > 0 ? model : null
}

// ==========================================
// actions

async function getFiles (req, res) {
  try {
    const { fileName } = req.query
    const ret = []
    const data = await (fileName ? TbxService.getFileDetails(fileName) : TbxService.getFiles())

    if (data) {
      if (fileName) {
        if (!data?.success && data?.status === 404) {
          return res.status(404).json({
            error: 'Not found!'
          })
        }

        const parsed = parseData(data)

        return res.json(parsed)
      }

      if (data?.length > 0) {
        const promises = []

        data.forEach(file => {
          promises.push(TbxService.getFileDetails(file))
        })

        if (promises.length > 0) {
          const result = await Promise.allSettled(promises)

          result.forEach(({ status, value }) => {
            if (status === 'fulfilled' && typeof value === 'string') {
              const parsed = parseData(value)
              if (parsed) ret.push(parsed)
            }
          })
        }
      }
    }

    return res.json(ret)
  } catch (e) {
    return res.status(500).json({
      error: `Error: ${e.toString()}`
    })
  }
}

async function getOriginalFilesData (req, res) {
  try {
    const files = await TbxService.getFiles()

    return res.json({ files })
  } catch (e) {
    return res.status(500).json({
      error: `Error: ${e.toString()}`
    })
  }
}

module.exports = {
  getFiles,
  getOriginalFilesData,
  parseData
}
