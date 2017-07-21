const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public', 'dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

app.listen(3316, ()=> {console.log('Listening on 6789')})
