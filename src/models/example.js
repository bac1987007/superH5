import {queryList,querySpecial,queryCom,queryPrice,addCar} from "../services/commodity";
import { routerRedux } from 'dva/router';
import Utils from "../utils/Util";

export default {
  namespace: 'commodity',
  state: {
    recId:"",
    specialList:[],
    comInfo:[],
    data:"",
    priceObj:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('special')) {
          const key=location.pathname.replace("/special/","");
          const recId = key;
          dispatch({type:'query',payload:{json:{perPageNum:100,currentPageIndex:1},recId:key}});
        }
      });
    },
  },
  effects: {
    *queryList({payload}, {call, put}){
      const data = "1";
      yield put({type: 'textMeth',payload: {data}});
      yield put(routerRedux.push(`/special/1`));
    },
    *query({payload}, {call, put}){
      const info = yield call(queryList, payload.json);
      const comInfoList = info.body;
      const key=location.pathname.replace("/special/","");
      const recId = payload.recId;
      console.log("recId="+recId)
      // const recId = comInfoList.itemList[0].recId;
      yield put({type: 'recIdMeth',payload: {recId}});
      const data = yield call(querySpecial,{recId:recId,itemId:recId});
      const specialList = data.body;
      console.log(specialList)
      const com = yield call(queryCom,{recId:recId});
      const comInfo = com.body;
      yield put({type: 'comInfoMeth',payload: {comInfo}});
      yield put({type: 'specialListMeth',payload: {specialList}});
    },
    *queryPrice({payload}, {call, put}){
      const data =  yield call(queryPrice, payload);
      const priceObj = data.body;
      console.log(priceObj)
      yield put({type: 'queryPriceMeth',payload: {priceObj}});
    },
    *addCar({payload}, {call, put}){
      const data =  yield call(addCar, payload);
      alert("加入购物车后返回的key="+data.body)
      // yield put({type: 'queryPriceMeth',payload: {priceObj}});
    },
    //根据主键查询规格
    // *querySpecial({payload}, {call, put}){
    //   const com = yield call(queryCom,{recId:payload.recId});
    //   const info = yield call(querySpecial, {recId:payload.recId,itemId:payload.recId});
    //   const comInfo = com.body;
    //   const specialList = info.body;
    //   const data = payload.data;
    //   yield put({type: 'comInfoMeth',payload: {comInfo}});
    //   yield put({type: 'dataMeth',payload: {data}});
    //   yield put({type: 'specialListMeth',payload: {specialList}});
    // },
  },
  reducers: {
    recIdMeth(state, action) {
      return { ...state, ...action.payload };
    },
    comInfoMeth(state, action) {
      return { ...state, ...action.payload };
    },
    specialListMeth(state, action) {
      return { ...state, ...action.payload };
    },
    queryPriceMeth(state, action) {
      return { ...state, ...action.payload };
    },
    textMeth(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
