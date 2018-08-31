const assert =require('assert');
/**
 * describe 测试套件 test suite 表示一组相关的测试
 *it 测试用例 test case 表示一个单独的测试 
 * assert 断言 表示对结果的预期
 * 
 */
describe('Array',function(){
    describe('#indexOf()',function(){
        it('should return -1 when the value is not present',function(){
            assert.equal(-1,[1,3,2].indexOf(4));
        })

        it('length',()=>{
            assert.equal(2,[2,4].length);
        })
    })
})

/**
 * mocha  测试套件
 * mocha  默认运行test目录下的测试文件, 测试文件格式  XXXX.test.js 
 * 
 * 常用参数 --recursive  
 *        mocha 默认执行test目录下的测试脚本 ，但是不会运行test下的子目录中的脚本，
 *        想要执行子目录中的测试脚本，可以在运行时添加 --recursive
 * 
 *        --grep
 *        如果写了很多的测试用例，当你添加了一个新的测试，执行之后要在结果里面找半天
 *        这种情况可以考虑 --grep 参数
 *        -- grep 可以只执行单个测试用例，也就是执行某一个 it  
 *        添加一个 新的测试用例 ，想要单独执行这个用例 终端输入 it('string[name]',fn)
 *        mocha --grep 'string[name]'
 *        如果配置了  npm test，需要先输入-- 再输入参数
 *        npm test -- --grep 'string[name]'   
 * 
 * 
 * 
 */

 
/**
 * chai 断言库  
 * 支持三种断言方式  should expect assert    
 * 
 * 
 *  
 * 
 */

 /**
  * supertest 
  * 测试接口的响应数据
  * 主要功能是对http 进行测试 尤其是对rest api  get 请求容易模拟，
  * post 方法比较难 （可以使用postman）
  * 
  * supertest 可以模拟http 的各种请求 ，设置 header 添加请求数据 并对响应进行断言
  * 
  * 
  * 
  * 
  */