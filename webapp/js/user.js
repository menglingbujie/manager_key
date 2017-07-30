import React from 'react';
import ReactDOM from 'react-dom';
import '../css/user.css';
import { Menu, Icon, Button , Input,Table,Modal,Form} from 'antd';
import $ from "jquery";
class UserCenter extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <h1>Hello {this.props.name}</h1>
    );
  }
}

ReactDOM.render(<UserCenter name="usercenter" />, document.getElementById('root'));
