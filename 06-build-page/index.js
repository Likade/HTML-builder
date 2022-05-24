function nthChar(string, character, n){
    var count= 0, i=0;
    while(count<n && (i=string.indexOf(character,i)+1)){
        count++;
    }
    if(count== n) return i-1;
    return NaN;
}

function copyDir(src, dest)
{
    const fs = require('fs');
    const path = require('path');

    fs.rm(path.join(__dirname,dest),{force: true, recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
        fs.mkdir(path.join(__dirname,dest), (err) => {
            if (err) {
                console.log(err);
            }
            else{
                fs.readdir(path.join(__dirname, src), (err, files) =>
                {
                    if (err)
                        console.log(err);
                    else {
                        files.forEach(file => {
                            fs.open(path.join(__dirname,dest, path.basename(file)), function (){});
                            fs.copyFile(path.join(__dirname, src, file), path.join(__dirname, dest, path.basename(file)), (err) => {
                                if (err) {
                                    console.log("Error Found:", err);
                                }
                                else{
                                    
                                }
                            });  
                        })
                    }
                });
            }
        });
    });
}

const fs = require('fs');
const path = require('path');
//html
fs.mkdir(path.join(__dirname,'project-dist'),{ recursive: true}, (err) => {
    if (err) {
        console.log(err);
    }
    const output = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'));
    const mhtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    fs.truncate(path.join(__dirname,'project-dist','index.html'), (err) =>{
        mhtml.on('data', chunk => {
            output.write(chunk.slice(0, chunk.indexOf('{{')));
            for(let i = 1 ;i<chunk.split("{{").length-1; i++)
            {
                const outhtml = fs.createReadStream(path.join(__dirname, 'components', `${chunk.substring(nthChar(chunk, '{{', i)+2, nthChar(chunk, '}}', i))}.html`), 'utf-8');    
                outhtml.on('data', text =>{
                    output.write(text + chunk.substring(nthChar(chunk, '}}', i)+2, nthChar(chunk, '{{', i+1)-1));
                });
                outhtml.on('error', error => console.log('Error', error.message));
            }
            const outhtml = fs.createReadStream(path.join(__dirname, 'components', `${chunk.substring(chunk.lastIndexOf('{{')+2, chunk.lastIndexOf('}}'))}.html`), 'utf-8');    
                outhtml.on('data', text =>{
                    output.write(text + chunk.substring(chunk.lastIndexOf('}}')+2));
                });
                outhtml.on('error', error => console.log('Error', error.message));
        });
        mhtml.on('error', error => console.log('Error', error.message));
    });

    //css
    const out = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'));
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
                    input.on('data', chunk => out.write(chunk));
                    input.on('error', error => console.log('Error', error.message));
                }
            });
        }
    });


    fs.rm(path.join(__dirname,'project-dist','assets'),{ recursive: true}, (err) => {
        if (err) {
            // console.log(err);
        }
        fs.mkdir(path.join(__dirname,'project-dist','assets'), (err) => {
            if (err) {
                // console.log(err);
            }
                fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
                    if (err)
                        console.log(err);
                    else {
                        files.forEach(file => {copyDir(`assets\\${file}`, `project-dist\\assets\\${file}`)});
                    }
                });
        });
    });
});

