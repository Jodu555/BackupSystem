const fs = require('fs');

function load() {
    let config;
    if (!fs.existsSync('../config.json')) {
        config = {
            lastBackup: -1,
            entrys: ['D:/'],
            server: {
                host: 'localhost',
                user: 'root',
                password: 'yourPassword',
                destinationDirectory: '/media/all/BackupFlow/'
            }
        }
    } else {
        config = JSON.parse(fs.readFileSync('../config.json'));
    }
    return config;
}

function save(config) {
    fs.writeFileSync('../config.json', JSON.stringify(config, null, 3), 'utf-8');
}

module.export = {
    load,
    save
}