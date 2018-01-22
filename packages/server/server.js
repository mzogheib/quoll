const express = require('express');
const app = express();
const routes = require('./routes');

app.set('port', (process.env.PORT || 3001));

app.use('/api', routes)

// Listen for requests on this port
const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log('Listening on port ' + port);
});