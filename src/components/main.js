import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Table, Input, Menu, Select, Cascader, Tag, Form, Modal} from 'antd';
import { Link } from 'dva/router';
import $ from 'jquery'

var self;
class main extends React.Component{
  constructor(props) {
    super(props);
    self = this.props;
    this.state = {
      specialList:[],
      comInfo:0,
      recId:"",
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.commodity  !=[]) {
      // const com = nextProps.commodity;
      // const comInfo = com.comInfo;
      // const recId = comInfo.recId;
      // this.setState({
      //   recId:recId,
      //   specialList:specialList,
      //   comInfo:comInfo,
      // });
    }
  }
  ggClick = ()=>{
    this.props.dispatch({type:'commodity/queryList',payload:{perPageNum:100,currentPageIndex:1,recID:this.props}})
  }
  render() {
    const url=location.pathname.replace("/comInfo/","");
    var qurl=location.pathname;
    return (
      <div className="main">
        <div className="d1">
          <img className="img1"/>
        </div>
        <Button className="btn1" onClick={this.ggClick} >规格</Button>
      </div>
    );
  }

};


function mapStateToProps(commodityModel) {
  return commodityModel;
}
export default connect(mapStateToProps)(main);
