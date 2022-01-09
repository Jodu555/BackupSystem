const fs = require('fs');
const path = require('path');

const partial = (config) => {
    const backupPaths = [];


    config.entrys.forEach(entry => {

        let list = getFiles({
            dir: new RegExp(config.excluding.dirs.join('|'), 'gi'),
            file: new RegExp(config.excluding.files.join('|'), 'gi'),
        }, entry);
        console.log(list);

    });
};

const getFiles = (matcher, listPath) => {
    let list = fs.readdirSync(listPath);
    list = list.map(e => path.join(listPath, e));
    list.forEach(elem => {
        try {
            if (fs.statSync(elem).isDirectory()) {
                if (!matcher.dir.test(elem))
                    list = list.concat(getFiles(matcher, elem));
            } else {
                if (!matcher.file.test(elem))
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