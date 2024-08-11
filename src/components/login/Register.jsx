
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Checkbox, Form, Input, Modal, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { ValidateEmailAPI,RegisterUserAPI } from '../../apis/user'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }
// LT(lg,'','')

const Register = (props) =>{
    const [useRegisterForm] = Form.useForm();
    const [registerForm, setRegisterForm] = useState([]); 
    const [emailCode, setEmailCode] = useState(999999);
    const [userRegistered, setUserRegistered] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const lg = useSelector((state)=>state.language.language);
    
    const sendValidateEmail = () => {
        useRegisterForm.validateFields(['Email']).then((result)=>{
            if(!sendEmailDisabled) {
                setSendEmailDisabled(true);
                ValidateEmailAPI(props.userData.Email, LT(lg, '国际大健康产业园注册', 'World Health Park Register'), 
                LT(lg, '您正在注册国际大健康产业园', 'You are registering World Health Park, your validate code is '))
                .then(response=> { 
                    setEmailCode(response.data.data)
                }).catch(error => { console.log(error) });
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

    const onRegisterFinish = () => {
        setRegisterLoading(true)
        RegisterUserAPI(registerForm.Email, registerForm.Password, registerForm.UserName)
        .then(response=> { 
            if(response.data.code==200){
                setUserRegistered(false)
                props.setRegisterOpen(false)
                props.setChangePasswordOpen(false)
                message.success(LT(lg,'注册成功','Registered successfully'))
            }else{
                message.error(LT(lg,'注册失败，用户名已经注册','Registration failed! The user name has been registered.'))
                setUserRegistered(true)
                console.log();
            }
        }).catch(error=>console.log(error))
        setTimeout(()=>{
            setRegisterLoading(false)
        }, 1000)
    };

    const CancelRegister = () => {
        props.setRegisterOpen(false)
    }

    return <Modal title={null} width={800} open={props.loginFlowOpen} onCancel={()=>{props.setLoginFlowOpen(false)}} footer={null} okText={false} cancelText={false} >
        <Form name="basic" form={useRegisterForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onRegisterFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg,'注册','Register')}</div>
            </Form.Item>
            <Form.Item style={{marginTop:20}} label={LT(lg,"用户名","User Name")} name="UserName" rules={[{required:true, message:LT(lg,'请输入您的用户名!',"Please input your user name!")},
                ({getFieldValue})=>({
                    validator(_,value){    
                        if(userRegistered){
                            return Promise.reject(new Error(LT(lg,'该用户名已经注册，请更换用户名','The user name has been registered, please change the user name')))
                        }
                        return Promise.resolve()
                    }
                })   
            ]}>
                <Input onChange={(e)=>{setRegisterForm({ ...registerForm, UserName:e.target.value});setUserRegistered(false)}}/>
            </Form.Item>
            <Form.Item label={LT(lg,'密码','Password')} name="Password" rules={[{required:true, message:'请输入您的密码!'}]}>
                <Input.Password onChange={(e)=>setRegisterForm({ ...registerForm,Password:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,'邮箱','Email')} name="Email"         
                rules={[{type:'email', message:LT(lg,'请输入有效的邮箱','Please enter a valid email address')},
                        {required:true, message:LT(lg,'请输入邮箱','Please enter email')}]}
                validateTrigger={['onChange']}>
                <Input onChange={(e)=>setRegisterForm({ ...registerForm,Email:e.target.value})}
                addonAfter={<a style={{pointerEvents:sendEmailDisabled?'none':'', color:sendEmailDisabled?'black':''}} onClick={sendValidateEmail}>{LT(lg,sendEmailDisabled?`请${seconds}秒后再发送`:'发送验证码',sendEmailDisabled?`Please send in ${seconds} seconds`:'Send verification code')}</a>}
                />
            </Form.Item>
            <Form.Item label={LT(lg,'邮箱验证码','Email verification code')} name="EmailCode" rules={[{required:true, message:LT(lg,'请输入您的验证码！','Please enter your verification code!')},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(registerForm.EmailCode!=emailCode){
                            return Promise.reject(new Error(LT(lg,'验证码错误','Verification code error')))
                        }
                        return Promise.resolve()
                    }
                })              
            ]}>
                <Input  onChange={(e)=>setRegisterForm({ ...registerForm,EmailCode:e.target.value})}/>
            </Form.Item>
            {
            registerLoading
            ?
            <Spin indicator={<LoadingOutlined spin/>}/>
            :
            <Form.Item wrapperCol={{offset:0}} style={{marginBottom:0}}>
                <Button type="primary" htmlType="submit">{LT(lg,'提交','Submit')}</Button> <a style={{marginLeft:20}} onClick={CancelRegister}>{LT(lg,'返回登录','Back to login')}</a>
            </Form.Item>
            }
        </Form>
    </Modal>
}

export default Register;