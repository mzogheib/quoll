const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.REACT_APP_PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))

// https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
)

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
