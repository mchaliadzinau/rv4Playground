var package = require('./package.json');
var fs = require('fs');

function appendScript2Index(libFullPath) {
    console.log("appendScript2Index",libFullPath)
    var data = fs.readFileSync('src/index.html').toString().split("\n");
    var libScriptString = "<script src='"+libFullPath+"'></script>"
    var scriptLine = 0;
    
    
    for(var i=0; i< data.length; i++) {
        if(data[i].indexOf(libScriptString)>-1) {
            break;
        } else if (!scriptLine && data[i].indexOf("</head>")>-1) {
            data.splice(i, 0, libScriptString);
            break;
        }
    }

    var text = data.join("\n");

    fs.writeFile('src/index.html', text, function (err) {
        if (err) return console.log(err);
    });
}

Object.keys(package.dependencies).forEach(function(element) {
    fs.createReadStream('node_modules/'+element+'/'+element+'.js').pipe(fs.createWriteStream('src/libs/'+element+'.js'));
    // appendScript2Index('libs/'+element+'.js') // programmatically add <script> tags (rough implementation)
}, this);
