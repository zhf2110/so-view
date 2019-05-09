import React from 'react';
import {connect} from 'dva';

import { Table, Divider, Tag } from 'antd';


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
        <span>
      {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
              color = 'volcano';
          }
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
    ),
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
    ),
}];

const namespace = "userList";

@connect((state)=>{
    //state 是全局的，需要根据namespace指向对应的model,便可以使用model的state对象中的数据
    const listData = state[namespace].list;
    //返回一个对象到this.props中，组建就可以使用返回的对象属性做数据的显示
    return {datas:listData}
},(dispatch)=>{
    //返回一个对象（属性为函数，用来修改model中的数据），绑定到this.props中，根据namespace+/函数名，定位到model中reducers的对应方法。
    return {
        initData:()=>{
            dispatch({type:namespace+"/initData"})
        }
    }
})
class UserList extends React.Component{
    //生命周期函数，初始化
    componentDidMount(){
        this.props.initData();
    }

    render(){
        return(
            <Table columns={columns} dataSource={this.props.datas} />
        )
    }
}

export default UserList;