const fs = require('fs');
const path = require('path');

const partial = (config) => {
    const backupPaths = [];

    const matcher = {
        dir: new RegExp(config.excluding.dirs.join('|'), 'gi'),
        file: new RegExp(config.excluding.files.join('|'), 'gi'),
    };
    // console.log(matcher);
    // console.log(matcher.dir.test('D:\\Allgemein\\Ich\\Hobbys\\Programmieren\\Web Development\\NodeJS\\AmazonPriceTracker\\node_modules\\concat-map'));
    // return;
    config.entrys.forEach(entry => {
        let list = getFiles(matcher, entry);
        console.log(list);

    });
};

const getFiles = (matcher, listPath) => {
    let list = fs.readdirSync(listPath);
    list = list.map(e => path.join(listPath, e));
    list = list.filter(e => !matcher.dir.test(e) && !matcher.file.test(e))
    list.forEach(elem => {
        try {
            if (fs.statSync(elem).isDirectory()) {
                // if (!matcher.dir.test(elem)) {
                list = list.concat(getFiles(matcher, elem));
                // }
            } else {
                // if (!matcher.file.test(elem) && !matcher.dir.test(elem)) {
                list.push(elem);
                // }
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