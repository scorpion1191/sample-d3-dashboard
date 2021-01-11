const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
            next();
          });
        
app.use(express.static(path.join(__dirname, "public")))

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "public","index.html"));
        });

app.listen(port, function () {
            console.log('Example app listening on port 3000!');
        });