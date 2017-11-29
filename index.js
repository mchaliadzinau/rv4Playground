var package = require('./package.json');
var fs = require('fs');
var less = require('less');

// TASK for building CSS from LESS
fs.readFile('./src/index.less',function(error,data){
    if(error) {
        console.log(error);
        return;
    }
    data = data.toString();
    less.render(data, function (e, css) {
        fs.writeFile('./src/index.css', css.css, function(err){
            console.log('done index.less to index.css');
        });
    });
});

// TASK for adding client-side libraries
// TO DO distinguish server-side from client-side libraries
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
    appendScript2Index('libs/'+element+'.js') // programmatically add <script> tags (rough implementation)
}, this);




// var nodes = require('./src/app/nodes/nodes.json');