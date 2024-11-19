const path = require('path');

module.exports = {
  entry: './index.js', // 실제 엔트리 파일 경로
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development', // 필요에 따라 설정
};