var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
        
app.use(express.static(path.join(__dirname, "public")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public","index.html"));
});

app.listen(port, function () {
            console.log('Example app listening on port 3000!');
        });