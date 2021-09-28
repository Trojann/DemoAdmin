var fs = require('fs');

function SaveHashPlugin() {
    
}

SaveHashPlugin.prototype.apply = function(compiler) {

    compiler.plugin('emit', (compilation, callback)=> {
        //console.log('tesssssssssst', compilation.hash);
        var json = JSON.stringify({chunkhash: compilation.hash});
        fs.writeFile('chunkhash.json', json, 'utf8', callback);
        callback();
    });
};

module.exports = SaveHashPlugin;