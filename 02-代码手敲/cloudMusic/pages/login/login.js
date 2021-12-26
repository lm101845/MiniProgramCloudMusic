/*
 * @Author: liming
 * @Date: 2021-12-26 12:04:20
 * @LastEditTime: 2021-12-27 05:50:33
 * @FilePath: \cloudMusic\pages\login\login.js
 */

// 说明：登陆流程
// 1.收集表单项数据
// 2.前端验证
//   1) 验证用户信息(账号、密码)是否合法
//   2) 前端验证不通过就提示用户，不需要发请求给后端
//   3) 前端验证通过了，就发送请求(携带账号、密码)给服务器端
// 3.后端验证
//   1) 验证用户是否存在
//   2) 用户不存在直接返回，告诉前端用户不存在
//   3) 用户存在需要验证密码是否正确
//   4) 密码不正确返回给前端提示密码不正确
//   5) 密码正确返回给前端数据，提示用户登陆成功(会携带用户的相关信息)

import request from '../../utils/request.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '', //手机号
        password: '' //密码
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    // 表单项内容发生改变的回调
    handleInput(event) {
        // handleInput() {
        // event是默认参数，定义的时候可以不写，你需要的时候可以传
        console.log(event);
        // console.log(event.detail.value);
        //方法1：使用id传值
        //let type = event.currentTarget.id; //取值只有2种：phone 或password
        //方法2：使用data-key="value"来传值
        //id是唯一的，当只传一个唯一的标识用id，而data-后面的key可以自定义,就没有什么限制了，即data-x可以传多个数据进去
        let type = event.currentTarget.dataset.type;
        console.log(type, event.detail.value);
        this.setData({
            //我们要更新的数据是phone和password，正好和id一模一样
            // type是变量，所以用[]
            [type]: event.detail.value
        })
    },

    //登陆的回调
    async login() {
        //1.收集表单项数据
        let { phone, password } = this.data;
        //2.前端验证
        /**
         * 手机号验证：
         *  1.内容为空
         *  2.格式不正确
         *  3.手机号格式正确，验证通过
         */
        if (!phone) {
            // alert("111")
            //报错：alert is not a function
            // 我们当前在小程序开发环境，不是在浏览器环境，没有全局对象window，只有全局对象wx
            // 所以我们可以使用wx.showToast来报错
            //提示用户
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none'
            });
            return;
            // wx.showToast是一个异步任务，有成功回调和失败回调，为了保险起见，我们可以使用return，让它后续代码不会执行
        }
        //定义正则表达式验证手机号是否正确
        let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
            //\d表示数字，{9}表示9位数字
        if (!phoneReg.test(phone)) {
            // 它的返回值是一个布尔值，通过为true,不通过为false
            wx.showToast({
                title: '手机号格式错误',
                icon: 'none'
            });
            return;
            // wx.showToast是一个异步任务，有成功回调和失败回调，为了保险起见，我们可以使用return，让它后续代码不会执行
        }

        //如果前2个If都没有进去，说明手机号正确，接下来我们验证密码
        //接下来提供的接口是网易云音乐提供的真实的接口
        // 我们这里只是简单验证一些密码不为空
        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none'
            });
            return;
        }

        //前端验证通过，开始后端验证，这里开始调用后端接口
        let result = await request('/login/cellphone', { phone, password })
            // params单独写，同名属性可以省略不写
            // 建议先写成功的，后写失败的，因为失败的情况太多
        if (result.code === 200) {
            wx.showToast({
                    title: '登陆成功'
                })
                //登陆成功后，跳转到个人中心之前，我们需要做一件事情——将用户的信息存储至本地
            wx.setStorageSync('userInfo', JSON.stringify(result.profile));
            // 我们给它存成JSON格式
            //setStorageSync这个是同步存储
            //这个本地的数据，只要你不清空，它就一直在，也就是说任何页面它都可以访问

            //登陆成功后我们还要跳转到个人中心页
            // wx.navigateTo({
            // wx.switchTab({
            wx.reLaunch({
                //报错：errMsg: "navigateTo:fail can not navigateTo a tabbar page"，不能用navigateTo跳转tabBar
                url: '/pages/personal/personal',
            });
        } else if (result.code === 400) {
            //这里写else if因为有很多错误码，我们这里不会全部都判断了，只判断其中一部分
            wx.showToast({
                title: '手机号错误',
                icon: 'none'
            })
        } else if (result.code === 502) {
            wx.showToast({
                title: '密码错误',
                icon: 'none'
            })
        } else {
            wx.showToast({
                title: '登陆失败，请重新登陆',
                icon: 'none'
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})