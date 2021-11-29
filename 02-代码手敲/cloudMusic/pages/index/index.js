/*
 * @Author: liming
 * @Date: 2021-10-05 17:10:07
 * @LastEditTime: 2021-11-30 06:23:40
 * @FilePath: \cloudMusic\pages\index\index.js
 */
// pages/index/index.js

import request from '../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   * onLoad和onReady里面都可以发送请求，它们两个也只执行一次
   * 这里我们选择在 onLoad 里面发送请求
   */
  onLoad: async function (options) {
    // wx.request({
    //   // url: '/banner',
    //   url: 'http://localhost:3000/banner',
    //   // 继续报错：http://localhost:3000 不在以下 request 合法域名列表中，
    //   // 在小程序里面，你要发请求的话，服务器域名必须要备案，必须要在合法域名列表里面进行注册
    //   //url是开发者服务器接口地址
    //   data: {
    //     //data是求的参数，这里我们这里统一用对象
    //     type: 2
    //     //2表示iphone
    //   },
    //   success: res => {
    //     console.log('请求成功',res);
    //   },
    //   fail: err => {
    //     console.log('请求失败', err);
    //     //因为我们这里不是完整的url，只写了/banner，所以这里会报错
    //     //如果我们在H5(浏览器)里面发，是不会有这个问题的，因为浏览器检测到你前面没有写，它会帮你补齐的，而在小程序里面，它不会帮你补齐
    //   }
    // })

    //这里我们用自己封装的方式去发送请求
    // request('http://localhost:3000/banner', {type:2})
    let result = await request('http://localhost:3000/banner', {type:2})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
