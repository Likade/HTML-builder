const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) =>
{
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            fs.stat(path.join(__dirname, 'secret-folder',file), (err, stats) => {
                if (err) {
                  console.error(err)
                  return
                }
                if(stats.isFile())
                {
                    console.log(`${path.basename(file).split('.')[0]} - ${path.extname(file).slice(1)} - ${(stats.size/(1024)).toFixed(3)}kb`)
                }
            });     
        })
    }
});


