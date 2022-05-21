const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), (err, files) =>{
    if(err)
    {
        console.log(err);
        return;
    }
    else{
        files.forEach(file => {
            if(path.extname(file) == '.css')
            {
                const input = fs.createReadStream(path.join(__dirname, 'styles', path.basename(file)), 'utf-8');
                input.on('data', chunk => output.write(chunk));
                input.on('error', error => console.log('Error', error.message));
            }
        });
    }
});