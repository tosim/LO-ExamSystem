const path = require('path');
const baseDir = path.join(__dirname, '..');
module.exports = {
  baseDir,
  build: {
<<<<<<< HEAD
    template: path.join(baseDir, 'app/view/view/layout.html')
=======
    template: path.join(baseDir, 'app/web/view/layout.html')
>>>>>>> master
  }
};