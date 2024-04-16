const express = require('express');
const app = express();
const port = 8080;
app.listen(port, () => console.log("EXPRESS LISTENING ON 8080"))
app.get('/', (req, res) => res.send('Server is up'))