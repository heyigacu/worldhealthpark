


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input, Modal, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { loginSuccess } from '../../reduxs/userSlice';
import { LoginAPI } from '../../apis/user'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
}


const Login = (props) =>{
    const [loginForm, setLoginForm] = useState([]); 
    const [submitLoading, setSubmitLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lg = useSelector((state)=>state.language.language);

    const onLoginFinish = (values) => {
        setSubmitLoading(true)
        
        LoginAPI(loginForm.UserName,loginForm.Password)
        .then(response=> { 
            if(response.data.code==200){
                message.success(LT(lg, '登录成功', 'Login successfully'))
                dispatch(loginSuccess({UserName:loginForm.UserName,id:response.data.data.id,Rank:response.data.data.Rank}));
                props.setLoginFlowOpen(false)
                navigate('/manage/')
            }else if(response.data.code==201){
                message.error(LT(lg, '用户不存在', 'User doesn\'t exist'))
            }else if(response.data.code==202){
                message.error(LT(lg, '密码错误', 'Password error'))
            }else{}
        }).catch(error=> { 
            console.log()
        });
        setTimeout(()=>{
            setSubmitLoading(false)
        }, 1000)
    };

    const GoChangePassword = () => {
        props.setChangePasswordOpen(true)
    }

    const GoRegister = () => {
        props.setRegisterOpen(true)
    }
      
    return <Modal title={null} open={props.loginFlowOpen} onCancel={()=>{props.setLoginFlowOpen(false)}} footer={null} okText={false} cancelText={false} >
        <Form name="basic" width={1200} labelCol={{span:5,}} wrapperCol={{span:15,}} style={{maxWidth: 800,textAlign:"center"}} initialValues={{remember: true,}} onFinish={onLoginFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}}>{LT(lg,'登录','Login')}</div>
            </Form.Item>
            <Form.Item style={{marginTop:20}} label={LT(lg,'用户名','User Name')} name="UserName" rules={[{required:true, message:'请输入您的用户名!'}]}>
                <Input onChange={(e)=>{setLoginForm({ ...loginForm, UserName:e.target.value})}}/>
            </Form.Item>
            <Form.Item label={LT(lg,'密码','Password')} name="Password" rules={[{required:true, message:'请输入您的密码!'}]}>
                <Input.Password onChange={(e)=>{setLoginForm({ ...loginForm, Password:e.target.value})}} addonAfter={<a onClick={GoChangePassword}>{LT(lg,'忘记密码？','Forgot?')}</a>}/>
            </Form.Item>
            {
            submitLoading
            ?
            <Spin indicator={<LoadingOutlined spin/>}/>
            :
            <Form.Item wrapperCol={{offset:0}} style={{marginBottom:0}}>
                <Button type="primary" htmlType="submit">{LT(lg,'提交','Submit')} </Button>
            </Form.Item>
            }
            <Form.Item wrapperCol={{offset:0}}>
                <div>{LT(lg,'没有账户？','No account?')} <a style={{marginLeft:20}} onClick={GoRegister}>{LT(lg,'立即注册','Register now')}</a></div>
            </Form.Item>
        </Form>
    </Modal>
}

export default Login;