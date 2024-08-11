import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Modal, Spin, message } from 'antd';
import { UserOutlined,LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../reduxs/userSlice';
import Register from './Register';

import { ValidateEmailAPI ,ChangePasswordAPI  } from '../../apis/user'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }
// LT(lg,'','')

const ChangePassword = (props) =>{
    const [useChangePasswordForm] = Form.useForm();
    const [changePasswordForm, setChangePasswordForm] = useState([]); 
    const [emailCode, setEmailCode] = useState(999999);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [emailMatched, setEmailMatched] = useState(false);
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const lg = useSelector((state)=>state.language.language);
    const sendValidateEmail = (values) => {
        useChangePasswordForm.validateFields(['Email']).then((result)=>{
            if(!sendEmailDisabled) {
                setSendEmailDisabled(true);
                ValidateEmailAPI(props.userData.Email, LT(lg, '国际大健康产业园修改密码', 'World Health Park Modify Password'), 
                LT(lg, '您正在修改账户的密码', 'You are modifing password of your accout, your validate code is '))
                .then(response=> { 
                    setEmailCode(response.data.data)
                }).catch(error=> { 
                    console.log()
                });
                let timer = setInterval(() => {
                    setSeconds((prevSeconds) => {
                    if (prevSeconds === 1) {
                        clearInterval(timer);
                        setSendEmailDisabled(false);
                        return 60;
                    } else {
                        return prevSeconds - 1;
                    }
                    });
                }, 1000);
            }
        }).catch(error=>{console.log(error)})
    };


    const onChangePasswordFinish = (values) => {
        useChangePasswordForm.validateFields(['Email']).then((result)=>{
            setSubmitLoading(true)
            ChangePasswordAPI(changePasswordForm.Email, changePasswordForm.UserName, changePasswordForm.Password)
            .then(response=> { 
                if(response.data.code==200){
                    props.setChangePasswordOpen(false)
                    props.setRegisterOpen(false)
                    setEmailMatched(true)
                    message.success(LT(lg,'注册成功','Registered successfully'))
                }else if(response.data.code==201){
                    setEmailMatched(true)
                    message.error(LT(lg,'用户不存在','User doesn\'t exist'))
                }else if(response.data.code==204){
                    setEmailMatched(false)
                    message.error(LT(lg,'邮箱和用户名不匹配','The email address doesn\'t match the user name'))
                }else{}
            }).catch(error=> { 
                console.log()
            });
            setTimeout(()=>{
                setSubmitLoading(false)
            }, 1000)
        }).catch((error)=>{console.log()})
    };

    const GoChangePassword = () => {
        props.setChangePasswordOpen(false)
    }
  

    return <Modal title={null} width={800} open={props.loginFlowOpen} onCancel={()=>{props.setLoginFlowOpen(false)}} footer={null} okText={false} cancelText={false} >
        <Form name="basic" form={useChangePasswordForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onChangePasswordFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg,"修改密码","Change Password")}</div>
            </Form.Item>
            <Form.Item style={{marginTop:20}} label={LT(lg,"用户名","User Name")} name="UserName" rules={[{required:true, message:LT(lg,'请输入您的用户名!',"Please input your user name!")},]}>
                <Input onChange={(e)=>{setChangePasswordForm({ ...changePasswordForm, UserName:e.target.value});setEmailMatched(true)}}/>
            </Form.Item>
            <Form.Item label={LT(lg,'邮箱','Email')} name="Email"         
                rules={[{type:'email', message:'请输入有效的邮箱'},
                        {required:true, message:'请输入邮箱'},
                        ({getFieldValue})=>({
                            validator(_,value){
                                if(!emailMatched){
                                    return Promise.reject(new Error('邮箱和用户名不匹配'))
                                }
                                return Promise.resolve()
                            }
                        })  
                    ]}
                validateTrigger={['onChange']}>
                <Input onChange={(e)=>setChangePasswordForm({ ...changePasswordForm,Email:e.target.value})}
                addonAfter={<a style={{pointerEvents:sendEmailDisabled?'none':'', color:sendEmailDisabled?'black':''}} onClick={sendValidateEmail}>{sendEmailDisabled?`请${seconds}秒后再发送`:'发送验证码'}</a>}
                />
            </Form.Item>
            <Form.Item label={LT(lg,'邮箱验证码','Email Verification Code')} name="EmailCode" rules={[{required:true, message:LT(lg,'请输入您的验证码！','Please enter your verification code!')},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(changePasswordForm.EmailCode!=emailCode){
                            return Promise.reject(new Error(LT(lg,'验证码错误','Verification code error!')))
                        }
                        return Promise.resolve()
                    }
                })              
            ]}>
                <Input  onChange={(e)=>setChangePasswordForm({ ...changePasswordForm,EmailCode:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,'新密码','New Password')} name="Password" rules={[{required:true, message:LT(lg,'请输入您的新密码！','Please enter your new password!')}]}>
                <Input.Password onChange={(e)=>setChangePasswordForm({ ...changePasswordForm, Password:e.target.value})}/>
            </Form.Item>
            {
            submitLoading
            ?
            <Spin indicator={<LoadingOutlined spin/>}/>
            :
            <Form.Item wrapperCol={{offset:0}} style={{marginBottom:0}}>
                <Button type="primary" htmlType="submit">{LT(lg,'提交','Submit')}</Button> <a style={{marginLeft:20}} onClick={GoChangePassword}>{LT(lg,'返回登录','Back to login')}</a>
            </Form.Item>
            }
        </Form>
    </Modal>
}

export default ChangePassword;