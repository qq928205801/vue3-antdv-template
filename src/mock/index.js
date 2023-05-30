import Mock from 'mockjs' // 引入mockjs
// 用户相关功能的引入
import logInInfo from './user'
import route from './router'
import menu from './menu'


Mock.setup({
    timeout: '100-2000'
});

// 用户相关功能的模拟
Mock.mock(/.*user\/login.*/, 'post', logInInfo);
Mock.mock(/.*get\/router.*/, 'get', route);
Mock.mock(/.*get\/menu.*/, 'get', menu);
