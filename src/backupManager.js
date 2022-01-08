
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
            if (fs.statSync(path.join(path, elem)).isDirectory()) {
                list.concat(getFiles(path.join(path, elem)));
            } else {
                list.push(path.join(elem));
            }
        } catch (error) {

        }
    });
    return files;
}



module.exports = {
    partial,
}