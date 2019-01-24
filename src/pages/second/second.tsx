import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, Text, Button,Video} from '@tarojs/components';
class Second extends Component {
  private videoContext: Taro.VideoContext;
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

  componentDidMount(){
    this.videoContext = Taro.createVideoContext('video')
  }
	render() {
		return (
			<View>
				<Text>i am second</Text>
				<Button onClick={this.onHandleBack}>返回第一页</Button>
        <Video
        src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
        controls={true}
        autoplay={false}
        poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
        initialTime={0}
        id='video'
        loop={false}
        muted={false}
        />
			</View>
		);
	}
}

export default Second as ComponentClass;
