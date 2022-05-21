const fs = require('fs');
const path = require('path');
const { stdin, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log('Введите текст для добавления в файл');
stdin.on('data', data => {
    if(data.toString().includes('exit'))
        {
            console.log('Пока');
            process.exit();
        }
    output.write(data);
});
process.on('SIGINT', () =>{
    console.log('Пока');
    process.exit();
});