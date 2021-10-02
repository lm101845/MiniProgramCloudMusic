/*
 * @Author: liming
 * @Date: 2021-10-02 18:45:05
 * @LastEditTime: 2021-10-02 19:02:03
 * @FilePath: \扩展知识\01-数据劫持代理\index.js
 */
// Vue数据劫持代理
// 模拟Vue中的data选项
let data = {
    username: 'tom',
    age:10
}

//模拟组件的实例
let _this = {
    //最终目标：在_this身上有username,age这些属性
    test:'测试'
}

// _this.username = data.username;
// 这个不叫数据的劫持代理，这个叫直接赋值

//它是利用Object.defineProperty()来实现的
//首先我们要对data中的属性进行枚举

for (let item in data) {
    console.log(item, data[item]);
    //for...in遍历对象的时候，遍历的是对象的key！！！
    Object.defineProperty(_this, item, {
        //get函数作用：用来获取扩展属性值的，当获取该属性值的时候调用get方法
        get() {
            console.log('get被调用了');
            return data[item]
        },
        //set是用来监视当前扩展属性的，只要一修改就调用
        set(newValue) {
            console.log('set被调用了', newValue);
            // _this.username = newValue
            // 这样写就是一个死循环，千万不要在set方法中直接修改当前扩展属性值，会出现死循环
            //set方法扮演的角色是修饰
            //item是一个变量，对象操作变量的时候，你应该用中括号
            data[item] = newValue;
            // 这种属于迂回写法
        }
    })
}

console.log(_this);
_this.username = 'jerry'
console.log('这样是没有办法修改成功的，还是tom！！！必须用set方法才能修改成功！！！', _this.username);
// 通过 Object.defineProperty的get方法添加的扩展属性不能直接通过【对象.属性】这种方式进行修改