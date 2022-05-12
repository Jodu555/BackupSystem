const fs = require('fs');
const path = require('path');
const { CommandManager, Command } = require('@jodu555/commandmanager');
const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);
const configManager = require('./configManager');
const config = configManager.load();
configManager.save(config);
const BackupManager = require('./backupManager');


commandManager.registerCommand(new Command('info', 'info', 'Displays Application Informations', (command, [...args], scope) => {
    //Prints Info
    return null;
}));

commandManager.registerCommand(new Command(['make', 'm'], 'make [partial:default/full]', 'Makes a Partial or Full Backup', async (command, [...args], scope) => {
    //Makes backup
    if (args[1] == 'full' || args[1] == 'f') {
        await BackupManager.full(config);
    } else {
        await BackupManager.partial(config);
        config.lastBackup = Date.now();
        configManager.save(config);
    }
    return '';
}));

//TODO: Some config editing commands: load, save, edit