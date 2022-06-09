const fs = require('fs');


// removing a directory folder
if(fs.existsSync('./newfile')){

    fs.rmdir('./newfile',(error) => {
        if(error) throw error;
        console.log('directory folder removed');
    });

};

