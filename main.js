const yargs = require('yargs');
const crud = require('./crud.js');

yargs.version('2.2.0');

//Add new Notes
yargs.command(
    {
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            console.log('Title: '+argv.title);
            console.log('Body: '+argv.body);
            crud.addNote(argv.title,argv.body);
        }
    }
);

//read command
yargs.command(
    {
        command: 'read',
        describe: 'Read a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            crud.readNote(argv.title)
        }
    }
);

//Listing the Notes
yargs.command(
    {
        command: 'list',
        describe: 'Listing the Notes',
        handler(){
            crud.listNodes();
        }
    }
);

//Remove Note from file
yargs.command(
    {
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            crud.removeNote(argv.title);
        }
    }
);

//action to call all the commands
yargs.parse();