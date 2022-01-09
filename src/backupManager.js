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
    list = list.map(e => path.join(listPath, e));
    list.forEach(elem => {
        try {
            if (fs.statSync(elem).isDirectory()) {
                list = list.concat(getFiles(elem));
            } else {
                list.push(elem);
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