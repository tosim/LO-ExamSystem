'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function* () {
    var filename = this.params.filename;
    console.log(filename);
    this.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename='+"questions.docx"
    });
    // var src = fs.createReadStream(path.join(this.app.config.baseDir, `app/uploads/questions.docx`));
    var filepath = path.join(this.app.config.baseDir, `app/uploads/questions.docx`);

    var src = yield new Promise(function(resolve,reject){  
        fs.readFile(filepath,function(err,data){  
            if(err){  
                reject(err);//文件存在返回true  
            }else{  
                resolve(data);//文件不存在，这里会抛出异常  
            }  
        });  
    })
    this.body = src;
};

