/**
 * Created by xx on 5/9/19.
 *
 * 用来作为组建的数据模板:
 *    model -- dav -- Component
 *
 */
import request from '../util/request';

export default {
  // 类似package
  namespace:'userList',
  // 数据体，属性列表
  state:{
    list:[]
  },
  //异步操作
  effects:{
    *initData(params,sageEffects){
      const {call,put} = sageEffects;
      const url = "/user/allInfo";
      let data = yield call(request,url);
      yield put({
         type:"queryList",
         data:data
      });
  },
    reducers:{
      //state 更新之前的state
      queryList(state,result){
        let data = [...result.data];
        //更新之后的数据
        return {
          list:data
        }
      }
    }}
}