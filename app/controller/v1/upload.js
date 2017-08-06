'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

module.exports = function* () {
  const stream = yield this.getFileStream();
  let filepath = path.join(this.app.config.baseDir, `app/uploads/${stream.filename}`);
  if (stream.fields.title === 'mock-error') {
    filepath = path.join(this.app.config.baseDir, `logs/not-exists/dir/${stream.filename}`);
  } else if (stream.fields.title === 'mock-read-error') {
    filepath = path.join(this.app.config.baseDir, `logs/read-error-${stream.filename}`);
  }
  this.logger.warn('Saving %s to %s', stream.filename, filepath);
  try {
    yield saveStream(stream, filepath);
  } catch (err) {
    yield sendToWormhole(stream);
    throw err;
  }

  console.log('get upload request');
  const result = yield this.service.v1.question.readTemplate(`app/uploads/questions.docx`);
  // console.log('~~~~~~--------------');
  // console.log(result);

  yield this.service.v1.question.createBash(result);   //插入解析后的数据

  var exam_id = this.request.query.exam_id;
  console.log('has exam_id = ' + exam_id);
  
  if(exam_id){
    console.log('will insert into q_exam');
    for(let i = 0;i < result.length;i++){
      yield this.app.mysql.insert('q_exam',{exam_id:exam_id,q_id:result[i],score:5});  //若是考试试题还要插入q_exam表
    }
  }else{
    console.log('will not insert into q_exam');
  }
  this.body = {
    success:1,
    data:result,
    msg:''
  };
};

function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    if (filepath.indexOf('/read-error-') > 0) {
      stream.once('readable', () => {
        const buf = stream.read(10240);
        console.log('read %d bytes', buf.length);
        setTimeout(() => {
          reject(new Error('mock read error'));
        }, 1000);
      });
    } else {
      const ws = fs.createWriteStream(filepath);
      stream.pipe(ws);
      ws.on('error', reject);
      ws.on('finish', resolve);
    }
  });
}