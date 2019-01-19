const fs = require('fs');
const path = require("path");

module.exports = readFile = () => {
    let data;
    try{
        return new Promise(function(resolve) {
            data = fs.readFileSync(path.resolve(__dirname, "../Data/data.csv"), {encoding: 'utf8'});
            resolve(data);
        });
    } catch(err){
        console.log(err)
    }

}
