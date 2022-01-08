
const partial = (config) => {
    const backupPaths = [];

    config.entrys.forEach(entry => {

        let list = fs.readdirSync(entry);
        console.log(list);
        list.forEach(elem => {
            try {
                console.log(elem);
                console.log(fs.statSync(path.join(entry, elem)));
            } catch (error) {

            }
        });

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