var fs = require('fs');
class SaveHashPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('emit', (compilation) => {
            const json = JSON.stringify({ chunkhash: compilation.hash });
            fs.writeFile('chunkhash.json', json, 'utf8', (error) => {
                if (error) console.error(error);
                console.log('=============HASH SAVED=================', compilation.hash);
            });
        });
    }
}
module.exports = SaveHashPlugin;
