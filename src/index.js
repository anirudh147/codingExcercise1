const express = require('express')
const app = express()
const replaceableChars = require('./const')
const PORT = 8080

app.use(express.json({ limit: '10mb' }))

app.post('/', (req, res) => {
  const inputValue = JSON.stringify(req.body)
  const replacedOutput = inputValue.replace(
    /{REF_MSISDN}|{REF_IMSI}|{REF_SERVPROFID}/g,
    (match) => {
      return replaceableChars[match]
    },
  )
  const { payload } = JSON.parse(replacedOutput)

  res.status(200).json(payload)
})

app.listen(PORT, () => {
  console.log(`Server-up at:${PORT}`)
})
