const fs = require('fs');
const path = require('path');

const partial = (config) => {
    const backupPaths = [];

    config.entrys.forEach(entry => {

        let list = getFiles(entry);
        console.log(list);

    });
};

const getFiles = (path) => {
    let list = fs.readdirSync(path);
    list.forEach(elem => {
        try {
            console.log(fs.statSync(path.join(path, elem)).isDirectory());
            if (fs.statSync(path.join(path, elem)).isDirectory()) {
                list.concat(getFiles(path.join(path, elem)));
            } else {
                list.push(path.join(elem));
            }
        } catch (error) {
            console.log(error);
        }
    });
    return list;
}



module.exports = {
    partial,
}