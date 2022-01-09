const fs = require('fs');
const path = require('path');

const partial = (config) => {
    const backupPaths = [];

    config.entrys.forEach(entry => {

        let list = getFiles(entry);
        console.log(list);

    });
};

const getFiles = (listPath) => {
    let list = fs.readdirSync(listPath);
    list.forEach(elem => {
        try {
            if (fs.statSync(path.join(listPath, elem)).isDirectory()) {
                list = list.concat(getFiles(path.join(listPath, elem)));
            } else {
                list.push(path.join(listPath, elem));
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