import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import { Menu, Icon, Button , Input,Table,Modal,Form} from 'antd';
import $ from "jquery";
class App extends React.Component {
  state={
    addFormVisible: false,
    currentMenuItem: 'young',
    userinfo:{
      username:"",
      phone:"",
      keyid:"",
      keyfor:"",
    },
    unbackKeyList: [],
  }
  formChange = (type,evt)=>{
    this.state.userinfo[type]=evt.target.value;
  }
  doAddKey = (e)=>{
    $.post("http://localhost:3000/api/create-key",this.state.userinfo,(resp)=>{
      this.setState({addFormVisible:false});
      this.fetchKeyUnbackList();
    });
  }
  cancelAddKey = (e) =>{
    this.setState({addFormVisible:false})
  }
  showAddKeyForm = (e) =>{
    this.setState({addFormVisible: true});
  }
  clickMenuItem=(e)=>{
    this.setState({currentMenuItem:e.key});
  }
  fetchKeyUnbackList(){
    $.get("http://localhost:3000/api/get-keys-unback",(resp)=>{
      if(!resp.ret){
        return;
      }
      this.setState({unbackKeyList:resp.data});
    });
  }
  componentWillMount(){
    this.fetchKeyUnbackList();
  }
  render () {
    const state = this.state;
    let tableColumns = [{
      title:"钥匙用途",
      dataIndex:"keyfor",
      key:"keyfor",
    },{
      title:"钥匙编号",
      dataIndex:"keyid",
      key:"keyid",
    },{
      title:"手机号码",
      dataIndex:"phone",
      key:"phone",
    },{
      title:"用户名",
      dataIndex:"username",
      key:"username",
    }];
    return (
      <div className="page">
        <header>
          <h1>钥匙管理系统</h1>
          <hr /><br />
          <Menu
            onClick={this.clickMenuItem} mode="horizontal"
            selectedKeys={[state.currentMenuItem]}>
              <Menu.Item key="young"><Icon type="user" />使用中的钥匙</Menu.Item>
              <Menu.Item key="old"><Icon type="team" />已归还的钥匙</Menu.Item>
            </Menu>
          </header>
          <div className="btn_group">
            <Input addonAfter={<Icon type="search" />} defaultValue="" />
          <Button className="btn" onClick={this.showAddKeyForm}><Icon type="plus"/>添加</Button>
        </div>
        <br />
        <Table columns={tableColumns} dataSource={state.unbackKeyList}></Table>

        <Modal title="有人来借钥匙啦" visible={state.addFormVisible}
          onOk={this.doAddKey}
          onCancel={this.cancelAddKey}
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
