/*
 * @Author: liming
 * @Date: 2021-11-30 06:08:53
 * @LastEditTime: 2021-11-30 06:25:01
 * @FilePath: \cloudMusic\utils\request.js
 */

// 封装一个函数，专门用于发送ajax请求
/**
 * 1.封装功能函数
 *    1.功能点明确
 *    2.函数内部应该保留固定代码(静态的)
 *    3.将动态的额数据抽取成形参，由使用者根据自身的的情况动态的传入实参
 *    4.一个良好的功能函数应该设置形参的默认值(ES6的形参默认值即可)
 * 2.封装功能组件
 *    1.功能点明确
 *    2.函数内部应该保留固定代码(静态的)
 *    3.将动态的数据抽取成props参数，由使用者根据自身情况以标签属性的形式动态传入props数据
 *    4.一个良好的组件应该设置组件的必要性及数据类型
 *        props:{
 *          msg:{
 *           required:true,
 *           default:'hello',
 *           type:String,   
 *          }
 * }
 *  
 */


export default (url, data = {}, method = 'GET') => {
  //data的默认值为{}，表示没有形参
  //设置形参的默认值为GET
  //我们这个是异步任务，非阻塞任务，所以不能直接返回结果，而是返回一个promise对象
  return new Promise(() => {
    // 我们返回一个Promise实例，而且在它的执行器里面，我们去执行这个异步任务
    //当我们new Promise，相当于初始化Promise实例的状态为pending
    wx.request({
      url,
      data,
      method,
      success: res => {
        console.log('请求成功', res);
      },
      fail: err => {
        console.log('请求失败', err);
      }
    })
  })
  // return result
}
