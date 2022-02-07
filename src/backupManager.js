const fs = require('fs');
const path = require('path');

const partial = (config) => {
    const backupPaths = [];

    const matcher = {
        dir: new RegExp(config.excluding.dirs.join('|'), 'gi'),
        file: new RegExp(config.excluding.files.join('|'), 'gi'),
    };
    config.entrys.forEach(entry => {
        let list = getFiles(matcher, entry, (elemPath) => {
            console.log(fs.statSync(list[0]));
            return true;
        });
        list = list.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 10);
            if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
            resultArray[chunkIndex].push(item);
            return resultArray
        }, [])
        console.log(list);
        // console.log(fs.statSync(list[0]));

    });
    return '';
};

const getFiles = (matcher, listPath, filter) => {
    let list = fs.readdirSync(listPath);
    list = list.map(e => path.join(listPath, e));
    list = list.filter(e => !matcher.dir.test(e) && !matcher.file.test(e))

    list.forEach(elem => {
        try {
            if (fs.statSync(elem).isDirectory()) {
                list = list.concat(getFiles(matcher, elem));
            } else {
                list.push(elem);
            }
        } catch (error) {
            console.log(error);
        }
    });
    list = [...new Set(list)];
    return list;
}



module.exports = {
    partial,
}