import xlsxtojson from 'xlsx-to-json-lc';

export default function (path) {
    return new Promise((resolve, reject) => {
        xlsxtojson({
            input: path,
            output: null,
            lowerCaseHeaders: true,
            // sheet
        }, function(err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}