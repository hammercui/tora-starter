import Taro,{ Component } from "@tarojs/taro";
import { ComponentClass } from 'react';
import { View,Text,Button } from '@tarojs/components';

class Second extends Component{

  onHandleBack = ()=>{
    Taro.navigateBack();
    //或者
  }

  render(){
    <View>
      <Text>i am second</Text>
      <Button onClick={this.onHandleBack}>返回第一页</Button>
    </View>
  }
}

export default Second as ComponentClass;
