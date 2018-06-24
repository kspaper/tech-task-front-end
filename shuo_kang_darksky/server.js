const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

require ('es6-promise/auto');
require('isomorphic-fetch');
const port = 3001;

const server = require('http').createServer(app); 
app.use(bodyParser.json());

app.get('/api/', function(req, res) {
    res.json();   
});

const API_KEY = 'edad3e763982445bb173440addea3daf';
const orginURL = 'https://api.darksky.net/forecast/'+API_KEY+'/';

app.get('/api/darksky', function(req, res) {
    try{
        const coords = req.query.latitude+','+req.query.longitude;
        const url = orginURL + coords;
        console.log('Requesting: '+url);

        fetch(url).then(function(response){
            if(response.status != 200) {
                res.status(response.status).json({'Error' : 'Invalid Response'});
            }
            return response.json();
        }).then(function(payload){
            res.status(200).json(payload);
        });
    } catch(e) {
        res.status(500).json({'Error':'500','Details': e});
    }
});

server.listen(port);
console.log('Server is listening on port:' +port);


