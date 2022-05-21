function copyDir(src, dest)
{
    const fs = require('fs');
    const path = require('path');
    
    fs.rm(path.join(__dirname,dest),{ recursive: true}, (err) => {
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
copyDir('files', 'copy-files');