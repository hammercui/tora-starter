// import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncByThunk } from '../../actions/counter'

import './index.less'
import { Icounter } from '../../reducers/counter';
import { ComponentClass } from 'react';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

interface IndexState{}

interface Iprops {
  counter: Icounter,
  add: (payload:number) => void
  dec: (payload:number) => void
  asyncByThunk: (payload:number) => any
}
// interface Index {
//   props: Iprops;
// }
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add (payload:number) {
    dispatch(add(payload))
  },
  dec (payload:number) {
    dispatch(minus(payload))
  },
  asyncByThunk (payload:number) {
    dispatch(asyncByThunk(payload))
  }
}))
class Index extends Component<Iprops,IndexState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  // componentWillUnmount () { }

  // componentDidShow () { }

  // componentDidHide () { }

  onHandleAdd = ()=>{
    this.props.add(1);
  }
  onHandleDesc = ()=>{
    this.props.dec(1);
  }

  onHandleThunkAdd = ()=>{
    this.props.asyncByThunk(1);
  }
  onHandleSagaAdd= ()=>{

  }

  onHandleNextPage = ()=>{
    //navigateTo可以使用navigateBack返回
    Taro.navigateTo({
      url: '/pages/second/second'
    });
    // Taro.redirectTo({
    //   url: '/pages/second/second'
    // })
  }


  render () {
    const {counter} = this.props;
    return (
      <View className='index'>
        <Button onClick={this.onHandleAdd}>+</Button>
        <Button onClick={this.onHandleAdd}>-</Button>
        <Button onClick={this.onHandleNextPage}>第二页</Button>
        <Button onClick={this.onHandleThunkAdd}>网络请求(redux-thunk)</Button>
        <Button onClick={this.onHandleSagaAdd}>网络请求(redux-sage)</Button>
        <View className='test'><Text className='txt'>{this.props.counter.num}</Text></View>
        <View><Text>{counter.loading?"loading":"loaded"}</Text></View>
        <View><Text>网络结果:{counter.netResult}</Text></View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<{}, IndexState>
//export default Index
