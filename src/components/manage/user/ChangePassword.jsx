
import React, { useState } from 'react'
import { message, Modal, Form, Input, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { ValidateEmailAPI ,ChangePasswordAPI  } from '../../../apis/user'

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
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [seconds, setSeconds] = useState(60);

    const lg = useSelector((state)=>state.language.language);
    
    const sendValidateEmail = () => {
        useChangePasswordForm.validateFields(['Email']).then((result)=>{
            if(!sendEmailDisabled) {
                setSendEmailDisabled(true);
                ValidateEmailAPI(props.userData.Email, LT(lg, '国际大健康产业园修改密码', 'World Health Park Modify Password'), 
                LT(lg, '您正在修改账户的密码', 'You are modifing password of your accout, your validate code is '))
                .then(response=> { 
                    setEmailCode(response.data.data)
                }).catch(error=>console.log(error));
                
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
        }).catch(error=>console.log(error))
    };

    const onChangePasswordFinish = (values) => {
        useChangePasswordForm.validateFields(['Email']).then((result)=>{
            setSubmitLoading(true)
            ChangePasswordAPI(changePasswordForm.Email,props.userData.UserName,changePasswordForm.Password,)
            .then(response=> { 
                if(response.data.code==200){
                    setSubmitLoading(false)
                    props.setChangePasswordOpen(false)
                    message.success(LT(lg,'修改密码成功','Change password successfully'))     
                }else{}
            }).catch(error=>console.log(error));
            
            setTimeout(()=>{
                setSubmitLoading(false)
            }, 1000)
        }).catch((error)=>{console.log()})
    };

    return <Modal title={null} width={800} open={props.changePasswordOpen} onCancel={()=>{props.setChangePasswordOpen(false)}} footer={null} okText={false} cancelText={false} >
        <Form name="basic" form={useChangePasswordForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onChangePasswordFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg,'修改密码','Change Password ')}</div>
            </Form.Item>
            <Form.Item label={LT(lg,'邮箱','Email')} name="Email"         
                rules={[{type:'email', message:LT(lg,'请输入有效的邮箱','Please enter a valid email address')},
                        {required:true, message:LT(lg,'请输入邮箱','Please enter email')},
                    ]}
                validateTrigger={['onChange']}>
                <Input onChange={(e)=>setChangePasswordForm({ ...changePasswordForm,Email:e.target.value})}
                addonAfter={<a style={{pointerEvents:sendEmailDisabled?'none':'', color:sendEmailDisabled?'black':''}} onClick={sendValidateEmail}>{sendEmailDisabled?`请${seconds}秒后再发送`:'发送验证码'}</a>}
                />
            </Form.Item>
            <Form.Item label={LT(lg,"邮箱验证码",'Email verification code')} name="EmailCode" rules={[{required:true, message:LT(lg,"请输入您的验证码！",'Please enter your verification code!')},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(changePasswordForm.EmailCode!=emailCode){
                            return Promise.reject(new Error(LT(lg,'验证码错误','Verification code error')))
                        }
                        return Promise.resolve()
                    }
                })              
            ]}>
                <Input  onChange={(e)=>setChangePasswordForm({ ...changePasswordForm,EmailCode:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,'新密码','New password')} name="Password" rules={[{required:true, message:LT(lg,'请输入您的新密码！','Please enter your new password!')}]}>
                <Input.Password onChange={(e)=>setChangePasswordForm({ ...changePasswordForm, Password:e.target.value})}/>
            </Form.Item>
            {
            submitLoading
            ?
            <Spin indicator={<LoadingOutlined spin/>}/>
            :
            <Form.Item wrapperCol={{offset:0}} style={{marginBottom:0}}>
                <Button type="primary" htmlType="submit">{LT(lg,'提交','Submit')}</Button> 
            </Form.Item>
            }
        </Form>
    </Modal>
}

export default ChangePassword;