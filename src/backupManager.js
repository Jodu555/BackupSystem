const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const partial = async (config) => {
    const backupPaths = [];
    const remote = config.destinationDirectory;
    delete config.destinationDirectory;
    const ssh = new NodeSSH();
    await ssh.connect(config.server);

    const matcher = {
        dir: new RegExp(config.excluding.dirs.join('|'), 'gi'),
        file: new RegExp(config.excluding.files.join('|'), 'gi'),
    };
    for (const entry of config.entrys) {
        let list = listFiles(entry, remote, matcher, (elemPath) => {
            const modTime = new Date(fs.statSync(elemPath).mtime).getTime();
            return (modTime - config.lastBackup > 0);
        });

        await upload(list);

    }
    ssh.dispose();
};

const upload = async (list) => {
    const perChunk = 50;
    list = chunkIt(list, perChunk);

    console.log(`Info: ${list.length} Chunk's with ${perChunk} items per Chunk!`);
    console.log('Started to Upload!');

    let i = 0;
    const failed = [];
    const succeeded = [];
    for (let chunk of list) {
        i++;
        console.log(`Uploading Chunk Nr. ${i} of ${list.length}`);
        chunk = chunk.map(e => { return { local: e.lc, remote: e.rm } })
        await ssh.putFiles(chunk).then(() => {
            succeeded.push(chunk)
        }, (error) => {
            failed.push({ ...chunk, error });
        });
        console.log('  Finished!');
    }

    console.log(`Finish Informations: Succedded: ${succeeded.length} & Failed: ${failed.length}`);
}

const listFiles = (lcPath, rmPath, matcher, filter) => {
    const files = [];
    fs.readdirSync(lcPath)
        .filter(e => !matcher.dir.test(e) && !matcher.file.test(e) && filter(path.join(lcPath, e)))
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

const chunkIt = (list, size) => {
    list = list.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);
        if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
        resultArray[chunkIndex].push(item);
        return resultArray
    }, [])
    return list;
}


module.exports = {
    partial,
}