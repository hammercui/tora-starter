/**
 * @name: 公共dispath映射函数
 * @msg:
 * @param {type}
 * @return:
 */
export const mapDispatchToProps  = (dispatch, ownProps)=>{
  return {dispatch}
}

/**
 * @name: action工具类
 * @msg:
 * @param {type}
 * @return:
 */
const action = (type:string, payload?:any) => ({type, payload});
export default action
