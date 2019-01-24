import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, Text, Button } from '@tarojs/components';

class Second extends Component {
	config: Config = {
		navigationBarTitleText: '第二页'
	};

	onHandleBack = () => {
    // navigateTo时使用
    Taro.navigateBack();
    //其他
    Taro.redirectTo({
      url: '/pages/second/second'
    })
	};

	render() {
		return (
			<View>
				<Text>i am second</Text>
				<Button onClick={this.onHandleBack}>返回第一页</Button>
			</View>
		);
	}
}

export default Second as ComponentClass;
