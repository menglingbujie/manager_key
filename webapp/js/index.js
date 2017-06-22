import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import { Menu, Icon, Button , Input,Table,Modal,Form} from 'antd';
class App extends React.Component {
  state={
    addFormVisible: true,
    currentMenuItem: 'young',
  }
  doAddKey = (e)=>{
    alert("Well Add new key")
    this.setState({addFormVisible:false})
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
  render () {
    return (
      <div className="page">
        <header>
          <h1>钥匙管理系统</h1>
          <hr /><br />
          <Menu
            onClick={this.clickMenuItem} mode="horizontal"
            selectedKeys={[this.state.currentMenuItem]}>
              <Menu.Item key="young"><Icon type="user" />使用中的钥匙</Menu.Item>
              <Menu.Item key="old"><Icon type="team" />已归还的钥匙</Menu.Item>
            </Menu>
          </header>
          <div className="btn_group">
            <Input addonAfter={<Icon type="search" />} defaultValue="" />
          <Button className="btn" onClick={this.showAddKeyForm}><Icon type="plus"/>添加</Button>
        </div>

        <div className="">

        </div>

        <Modal title="有人来借钥匙啦" visible={this.state.addFormVisible}
          onOk={this.doAddKey}
          onCancel={this.cancelAddKey}
          okText="准了"
          cancelText="鬼才借"
          >
          <Form>
            <Form.Item>
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="你是谁" />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="联系方式" />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type="key" style={{ fontSize: 13 }} />} placeholder="钥匙编号" />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type="file-text  " style={{ fontSize: 13 }} />} placeholder="你拿钥匙作甚？" />
            </Form.Item>
            <Form.Item></Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
