import React, { useState }from 'react';
import { Input } from 'antd';
import css from './index.module.scss';

enum ActionType{
  Login = 0,
  Regist
}
const LoginPage = () => {
  const [type, setType] = useState(ActionType.Login);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    user: '',
    pwd: '',
  });

  const formChange = (val: string, key: string) => {
    setForm({
      ...form,
      [key]: val,
    });
  };

  const showAction = (type: ActionType) => {
    setShow(true);
    setType(type);
    setForm({
      user: '',
      pwd: '',
    });
  };

  const toSubmit = (type: ActionType) => {
    if(type === ActionType.Login){
      // todoLogin
    }else{
      // todoRegist
    }
  };
  return (
    <div className={css['login']}>
      <div className={css['login-card']}>
        <div
          className={css['btn']}
          onClick={() => {
            showAction(ActionType.Login);
          }}>登录
        </div>
        <div
          className={css['btn']}
          onClick={() => {
            showAction(ActionType.Regist);
          }}
        >注册
        </div>
      </div>
      {
        show && (
          <div
            className={css['login-content']}
            onClick={(e) => {
              if(e.target !== e.currentTarget){
                return;
              }
              setShow(false);
            }}>
            <div className={css['login-body']} >
              <div className={css.title}>{type === ActionType.Login ? '登录系统' : '注册账号'}</div>
              <Input
                style={{ margin: '20px 0', height: 40 }}
                placeholder="请输入账号"
                value={form.user}
                onChange={(e) => {
                  formChange(e.target.value, 'user');
                }}
                prefix={<span className={css['site-form-item-icon']}>帐号：</span>}
              />
              <Input
                style={{ height: 40 }}
                placeholder="请输入密码"
                type="password"
                value={form.pwd}
                onChange={(e) => {
                  formChange(e.target.value, 'pwd');
                }}
                prefix={<span className={css['site-form-item-icon']}>密码：</span>}
              />
              <div
                className={css['action']}
                onClick={() => {
                  toSubmit(type);
                }}>{type === ActionType.Login ? '登录' : '注册'}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};
export default LoginPage;
