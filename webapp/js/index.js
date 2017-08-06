import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import { Menu, Icon, Button , Input,Table,Modal,Form} from 'antd';
import $ from "jquery";
function UserInfo(props){
  function doLogout(evt){
    evt.preventDefault();
    $.post('/api/user/logout',(resp)=>{
      location.replace("/");
    });
  }
  return <div className="userinfo">
    <em className="uname">你好，{props.userinfo.cellphone}</em>
  <Button shape="circle" icon="logout" type="primary" onClick={doLogout} size="small"></Button>
  </div>;
}
class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      addFormVisible: false,
      currentMenuItem: 'young',
      userinfo:{
        username:"",
        phone:"",
        keyid:"",
        keyfor:"",
        key:"",
      },
      unbackKeyList: [],
    }
  }
  formChange(type,evt){
    this.state.userinfo[type]=evt.target.value;
  }
  doAddKey(){
    this.state.userinfo['key']=(new Date()).getTime();
    $.post("/api/create-key",this.state.userinfo,(resp)=>{
      this.setState({addFormVisible:false});
      this.fetchKeyUnbackList();
    });
  }
  cancelAddKey(){
    this.setState({addFormVisible:false})
  }
  showAddKeyForm(){
    this.setState({addFormVisible: true});
  }
  clickMenuItem(d){
    this.setState({currentMenuItem:d.key});
  }
  fetchKeyUnbackList(){
    $.get("/api/get-keys-unback",(resp)=>{
      if(!resp.ret){
        return;
      }
      this.setState({unbackKeyList:resp.data});
    });
  }
  doBackKey(d,evt){
    console.log("doBackKey item==",d,evt)
  }
  showMore(d,evt){
    console.log("showMore item==",d,evt)
  }
  componentWillMount(){
    this.fetchKeyUnbackList();
  }
  render () {
    const state = this.state;
    let tableColumns = [
      {
        key:1,
        title:"用户名",
        dataIndex:"username",
        key:"username",
      },{
        key:2,
        title:"手机号码",
        dataIndex:"phone",
        key:"phone",
      },{
        key:3,
        title:"钥匙编号",
        dataIndex:"keyid",
        key:"keyid",
      },{
        key:4,
        title:"借用时间",
        dataIndex:"keystart_date",
        key:"keyfor",
      },{
        key:5,
        title:"归还时间",
        dataIndex:"keyend_date"
      },{
        key:6,
        title:"操作",
        dataIndex:"control",
        key:"control",
        render: (text, record) => (
          <span className="btn_control">
            <a className="btn edit" onClick={this.doBackKey.bind(this,record)} href="javascript:void(0)">归还</a>
          <a className="btn delete" onClick={this.showMore.bind(this,record)} href="javascript:void(0)">更多</a>
          </span>
        ),
      }
    ];
    return (
      <div className="page">
        <header>
          <h1>钥匙管理系统</h1>
          <UserInfo userinfo={gUserInfo} />
          <hr />
        </header>
        <Menu
          onClick={this.clickMenuItem.bind(this)} mode="horizontal"
          selectedKeys={[state.currentMenuItem]}>
            <Menu.Item key="young"><Icon type="user" />使用中的钥匙</Menu.Item>
            <Menu.Item key="old"><Icon type="team" />已归还的钥匙</Menu.Item>
        </Menu>
        <div className="btn_group">
          <Input addonAfter={<Icon type="search" />} defaultValue="" />
          <Button className="btn" onClick={this.showAddKeyForm.bind(this)}><Icon type="plus"/>添加</Button>
        </div>
        <br />
        <Table columns={tableColumns} dataSource={state.unbackKeyList}></Table>

        <Modal title="有人来借钥匙啦" visible={state.addFormVisible}
          onOk={this.doAddKey.bind(this)}
          onCancel={this.cancelAddKey.bind(this)}
          okText="准了"
          cancelText="鬼才借"
          >
          <Form>
            <Form.Item>
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="你是谁"
                onChange={this.formChange.bind(this,'username')} />
            </Form.Item>

            <Form.Item>
              <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />}
              placeholder="联系方式"
              onChange={this.formChange.bind(this,'phone')} />
            </Form.Item>

            <Form.Item>
              <Input prefix={<Icon type="key" style={{ fontSize: 13 }} />}
              placeholder="钥匙编号"
              onChange={this.formChange.bind(this,"keyid")} />
            </Form.Item>

            <Form.Item>
              <Input prefix={<Icon type="file-text  " style={{ fontSize: 13 }} />}
              placeholder="你拿钥匙作甚？"
              onChange={this.formChange.bind(this,"keyfor")} />
            </Form.Item>

            <Form.Item></Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
