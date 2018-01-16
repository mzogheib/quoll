const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3001));

//something

// Listen for requests on this port
const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log('Listening on port ' + port);
});