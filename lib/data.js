const fs = require('fs');
const path = require('path');

const lib = {};
lib.basedir = path.join(__dirname, '../.data/');

// write data to file
lib.create = function (dir, file, data, callBack) {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function (err2) {
                if (!err2) {
                    fs.close(fileDescriptor, function (err3) {
                        if (!err3) {
                            callBack(false)
                        } else {
                            callBack('Error closing the new file')
                        }
                    });
                } else {
                    callBack('Error writing to new file')
                }
            })
        } else {
            callBack('There was an error, file may be alteredy exist')
        }
    })
}

// read data to file
lib.read = function (dir, file, callBack) {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', function (err, data) {
        callBack(err, data)
    })
}

// update exists file
lib.upadate = function (dir, file, data, callBack) {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, function (err1) {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, function (err2) {
                        if (!err2) {
                            callBack('successfully file upadate')
                        } else {
                            console.log(err2)
                        }
                    })
                } else {
                    console.log('Error truncating file')
                }
            })

        } else {
            callBack('Error updatin, file may not exist')
        }
    })
}

lib.selfUpadate = function (dir, file, data, callBack) {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            //const stringData = JSON.stringify(data);
            fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', function (err1, data2) {
                if (!err1) {
                    const parseData = JSON.parse(data2);
                    const newData = parseData.find((element) => element.id == data.id);

                    // const newData = [...parseData, data];
                    // const stringData = JSON.stringify(newData);
                    /* fs.ftruncate(fileDescriptor, function (err2) {
                        if (!err2) {
                            fs.writeFile(fileDescriptor, stringData, function (err3) {
                                if (!err2) {
                                    callBack('successfully file upadate')
                                } else {
                                    console.log(err3)
                                }
                            })
                            callBack('Successfully file truncate');
                        } else {
                            callBack(err2)
                        }
                    }) */
                } else {
                    callBack(err1)
                }
            })
        } else {
            callBack('Error updatin, file may not exist')
        }
    })
}

// delete exists file
lib.delete = function (dir, file, callBack) {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, function (err) {
        if (!err) {
            callBack(false)
        } else {
            callBack(err)
        }

    })
}



// lib.selfUpadate('test', 'newFile', { id: 1, name: "abu", age: 100 }, function (err) {
//     console.log(err)
// })


module.exports = lib