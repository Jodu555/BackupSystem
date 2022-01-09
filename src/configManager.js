const fs = require('fs');

const configPath = 'config.json';

function load() {
    let config;
    if (!fs.existsSync(configPath)) {
        config = {
            lastBackup: -1,
            entrys: ['D:/'],
            excluding: {
                dirs: ['node_modules'],
                files: ['.env']
            },
            server: {
                host: 'localhost',
                user: 'root',
                password: 'yourPassword',
                destinationDirectory: '/media/all/BackupFlow/'
            }
        }
    } else {
        config = JSON.parse(fs.readFileSync(configPath));
    }
    return config;
}

function save(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 3), 'utf-8');
}

module.exports = {
    load,
    save
}