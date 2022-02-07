const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const partial = async (config) => {
    const backupPaths = [];

    const matcher = {
        dir: new RegExp(config.excluding.dirs.join('|'), 'gi'),
        file: new RegExp(config.excluding.files.join('|'), 'gi'),
    };
    for (const entry of config.entrys) {
        let list = listFiles(entry, '/home/Backup', matcher, (elemPath) => {
            console.log(fs.statSync(list[0]));
            return true;
        });
        list = list.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 10);
            if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
            resultArray[chunkIndex].push(item);
            return resultArray
        }, [])
        console.log(`Info: ${list.length} Chunk's with 10 items per Chunk!`);
        console.log('Started to Upload!');

        let i = 0;
        for (const chunk of list) {
            i++;
            console.log(`Uploading Chunk Nr. ${i} of ${list.length}`);
            await delay(1000)
        }

    }
};

// const getFiles = (matcher, listPath, filter) => {
//     let list = fs.readdirSync(listPath);
//     list = list.map(e => path.join(listPath, e));
//     list = list.filter(e => !matcher.dir.test(e) && !matcher.file.test(e))

//     list.forEach(elem => {
//         try {
//             if (fs.statSync(elem).isDirectory()) {
//                 list = list.concat(getFiles(matcher, elem));
//             } else {
//                 list.push(elem);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     });
//     list = [...new Set(list)];
//     return list;
// }

const listFiles = (lcPath, rmPath, matcher, filter) => {
    const files = [];
    fs.readdirSync(lcPath)
        .filter(e => !matcher.dir.test(e) && !matcher.file.test(e) && console.log)
        .map(e => { return { name: e, path: path.join(lcPath, e) } })
        .forEach(entity => {
            // console.log(entity.path, !matcher.dir.test(entity.path) && !matcher.file.test(entity.path));
            if (fs.statSync(entity.path).isDirectory()) {
                files.push(...listFiles(path.join(entity.path), path.join(rmPath, entity.name), matcher, filter));
            } else {
                files.push({ lc: entity.path, rm: path.join(rmPath, entity.name) });
            }
        });
    return files;
}


module.exports = {
    partial,
}