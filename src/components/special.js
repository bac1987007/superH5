import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Table, Input, Menu, Select, Cascader, Tag, Form, Modal} from 'antd';
import { Link } from 'dva/router';
import $ from 'jquery'

var self;
class special extends React.Component{
  constructor(props) {
    super(props);
    self = this.props;
    this.state = {
      recId:"",
      type:"",
      value1:"",
      value2:"",
      value3:"",
      value4:"",
      name1:"",
      name2:"",
      name3:"",
      name4:"",
      vallist1:[],
      vallist2:[],
      vallist3:[],
      vallist4:[],
      comInfo:{},
      color1:"",
      color2:"",
      color3:"",
      price:"0",
      comNum:"0",
      priceObj:{},
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.commodity.comInfo!=[]) {
      const com = nextProps.commodity;
      const comInfo = com.comInfo;
      let list = com.specialList;
      let vallist1 = [],vallist2 = [],vallist3 = [],vallist4 = [];
      var value1,value2,value3,value4,name1,name2,name3,name4;
      let price,priceObj;
      if(com.priceObj!={}) {
        price=com.priceObj.priceOnline;
      }
      priceObj=com.priceObj;
      console.log(price)
      if(list.length>0){
        for (var i = 0; i < list[0].values.length; i++) {
          vallist1.push({"str":list[0].values[i],"color":""})
        }
        value1 = list[0].value;
        name1 = list[0].name;
      }
      if(list.length>1){
        value2 = list[1].value;
        name2 = list[1].name;
        for (var i = 0; i < list[1].values.length; i++) {
          vallist2.push({"str":list[1].values[i],"color":""})
        }
      }
      if(list.length>2){
        value3 = list[2].value;
        name3 = list[2].name;
        for (var i = 0; i < list[2].values.length; i++) {
          vallist3.push({"str":list[2].values[i],"color":""})
        }
      }
      if(list.length>3){
        value4 = list[3].value;
        name4 = list[3].name;
        for (var i = 0; i < list[3].values.length; i++) {
          vallist4.push({"str":list[3].values[i],"color":""})
        }
      }
      this.setState({
        recId:com.recId,
        price:price,
        comInfo:comInfo,
        vallist1:vallist1,
        vallist2:vallist2,
        vallist3:vallist3,
        vallist4:vallist4,
        name1:name1,
        name2:name2,
        name3:name3,
        name4:name4,
        value1:value1,
        value2:value2,
        value3:value3,
        value4:value4,
        priceObj:priceObj,
      })

    }
  }
  swClick1 = (i)=>{
    let vallist = this.state.vallist1;
    vallist[i].color = vallist[i].color=="primary"?"":"primary";
    var k1=0,k2=0,k3=0,m1=-1,m2=-1;
    for(var j=0;j<this.state.vallist1.length;j++){
      if(this.state.vallist1[j].color=="primary"){
        k1++;
        m1=j;
      }
    }
    for(var j=0;j<this.state.vallist2.length;j++){
      if(this.state.vallist2[j].color=="primary") {
        k2++;
        m2=j;
      }
    }
    if(k1==1&&k2==1){
      console.log(this.state.vallist1[m1].str+"||"+this.state.vallist2[m2].str)
      this.props.dispatch({type:'commodity/queryPrice',payload:{specialValue1:this.state.vallist1[m1].str,
          specialValue2:this.state.vallist2[m2].str}})
    }
    this.setState({
      vallist1:vallist
    })
  }
  swClick2 = (i)=>{
    let vallist = this.state.vallist2;
    vallist[i].color = vallist[i].color=="primary"?"":"primary";
    var k1=0,k2=0,k3=0,m1=-1,m2=-1;
    for(var j=0;j<this.state.vallist1.length;j++){
      if(this.state.vallist1[j].color=="primary"){
        k1++;
        m1=j;
      }
    }
    for(var j=0;j<this.state.vallist2.length;j++){
      if(this.state.vallist2[j].color=="primary") {
        k2++;
        m2=j;
      }
    }
    if(k1==1&&k2==1){
      console.log(this.state.vallist1[m1].str+"||"+this.state.vallist2[m2].str)
      this.props.dispatch({type:'commodity/queryPrice',payload:{specialValue1:this.state.vallist1[m1].str,
          specialValue2:this.state.vallist2[m2].str,recId:this.state.recId}})
    }
    this.setState({
      vallist2:vallist
    })

  }
  swClick3= (i)=>{
    let vallist = this.state.vallist3;
    vallist[i].color = vallist[i].color=="primary"?"":"primary";
    this.setState({
      vallist3:vallist
    })
  }
  addNumClick = ()=>{
    var comNum = parseInt(this.state.comNum);
    comNum=comNum+1;
    this.setState({
      comNum:comNum
    })
  }
  decNumClick = ()=>{
    var comNum = parseInt(this.state.comNum);
    comNum=comNum-1;
    this.setState({
      comNum:comNum
    })
  }
  addCarClick = ()=>{
    var arr = [{"num":this.state.comNum,"skuId":this.state.priceObj.recId,"itemId":this.state.priceObj.itemId,"storeId":-999}]
    this.props.dispatch({type:'commodity/addCar',payload:arr})
  }
  render() {
    return (
      <div className="main">
        <div className="d2">
          <p>价格:{this.state.price}</p>
        </div>
        <div className="d2">
          <Button onClick={this.addNumClick.bind(null)}>加</Button>
          <p className="p2">数量:{this.state.comNum}</p>
          <Button onClick={this.decNumClick.bind(null)}>减</Button>
        </div>
        <div className="d2">
          <p>{this.state.name1}</p>
        </div>
        <div className="listDiv">
          <ul className="ul1">
            {
              this.state.vallist1.map((item,i) => (
                <li className="li1" key={i}>
                  <div><Button type={item.color} onClick={this.swClick1.bind(null,i)}>{item.str}</Button></div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="d2">
          <p>{this.state.name2}</p>
        </div>
        <div className="listDiv">
          <ul className="ul1">
            {
              this.state.vallist2.map((item,i) => (
                <li className="li1" key={i}>
                  <div><Button type={item.color} onClick={this.swClick2.bind(null,i)}>{item.str}</Button></div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="d2">
          <p>{this.state.name3}</p>
        </div>
        <div className="listDiv">
          <ul className="ul1">
            {
              this.state.vallist3.map((item,i) => (
                <li className="li1" key={i}>
                  <div><Button type={item.color} onClick={this.swClick3.bind(null,i)}>{item.str}</Button></div>
                </li>
              ))
            }
          </ul>
        </div>
        <Button onClick={this.addCarClick.bind(null)}>加入购物车</Button>
      </div>
    );
  }

};


function mapStateToProps(commodityModel) {
  return commodityModel;
}
export default connect(mapStateToProps)(special);
