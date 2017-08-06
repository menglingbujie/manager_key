import React from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import '../../css/user.css';
import $ from "jquery";
class NormalLoginForm extends React.Component {
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        $.post('/api/user/login',values,(resp)=>{
          console.log(resp);
          if(!resp.ret){
            message.error(resp.msg);
            return false;
          }
          message.success("登陆成功！");
          setTimeout(()=>{location.replace("/")},1e3);
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container login">
        <h1 className="title">钥匙管理系统后台</h1>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('cellphone', {
              rules: [{ required: true, message: '登录手机号码不能为空!' }],
            })(
              <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="手机号码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="登录密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="/user/forget_password">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <a href="/user/register" className="login_form-register">立即注册!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById("root"));
