var str = 'abcd12';

console.log(str.match(/([a-z]+)(\d+)/));
console.log(/([a-z]+)(\d+)/.exec(str));