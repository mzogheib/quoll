const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))

// https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
)

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
