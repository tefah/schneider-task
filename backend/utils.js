const fs = require('fs')

const errorFile = 'error.txt'

//just a simple error logging into a file 
exports.errorLogging = (ip, error) => {
    const stream = fs.createWriteStream(errorFile, {flags:'a'});
    stream.write(`\n Error in the request from ${ip} \n ${error}`
    , err => { console.error(err)})
    stream.end()

}