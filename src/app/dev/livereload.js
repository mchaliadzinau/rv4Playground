let fs = require('fs');
let reloadFn = function() {
    location.reload();
    this.close();
}

fs.watch('./', reloadFn);
fs.watch('./app/', reloadFn);
fs.watch('./app/dev', reloadFn);