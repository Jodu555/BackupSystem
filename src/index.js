const { CommandManager, Command } = require('@jodu555/command-manager');
const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);

commandManager.registerCommand(new Command('info', 'info', 'Displays Application Informations', (command, [...args], scope) => {
    //Prints Info
    return null;
}));

commandManager.registerCommand(new Command('make', 'make [partial:default/full]', 'Makes a Partial or Full Backup', (command, [...args], scope) => {
    //Makes backup
    return null;
}));

