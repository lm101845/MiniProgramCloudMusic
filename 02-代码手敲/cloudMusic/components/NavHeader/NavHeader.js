/*
 * @Author: liming
 * @Date: 2021-12-01 06:25:55
 * @LastEditTime: 2021-12-01 06:47:40
 * @FilePath: \cloudMusic\components\NavHeader\NavHeader.js
 */
// components/NavHeader/NavHeader.js
Component({
  /**
   * 组件的属性列表--由组件外部传入的数据，等同于Vue中的props
   */
  properties: {
    //类似于Vue中的props
    title: {
      type:String,
      value: '我是title默认值'
    },
    nav: {
      type: String,
      value: '我是nav默认值'
    },
  },

  /**
   * 组件的初始数据--相当于组件内部的使用
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
