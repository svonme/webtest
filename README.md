# mocha
unit test


describe  ：一个测试用列的入口 启动一个测试用列

it  包裹测试代码，把测试代码放在 it 函数里
it 函数会传一个 done 的回调函数进来，如果测试代码是异步的 需要主动调用 done 函数

断言模块，预计一个函数执行后返回的结果是多少
var assert = require("assert");

assert.equal (exp1, exp2) 比较两个表达式的结果是否一致


到此可以感受到 mocha 只是提供了一个运行环境，本身不关心测试，提供的是一个测试方法，测试代码结构



// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);




-----------------------
phantomjs

安装教材 ： http://docs.casperjs.org/en/latest/installation.html

npm install -g casperjs