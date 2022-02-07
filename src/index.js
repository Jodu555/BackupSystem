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

commandManager.registerCommand(new Command('make', 'make [partial:default/full]', 'Makes a Partial or Full Backup', async (command, [...args], scope) => {
    //Makes backup

    await BackupManager.partial(config);

    return '';
}));

//TODO: Some config editing commands: load, save, edit


