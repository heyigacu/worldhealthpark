


import React, { useState } from 'react'
import { message,Modal, Form, Input, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ValidateEmailAPI,ChangeEmailAPI } from '../../../apis/user'
import { useSelector } from 'react-redux';

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }

const ChangeEmail = (props) =>{
    const [useChangeEmailForm] = Form.useForm();
    const [changeEmailForm, setChangeEmailForm] = useState([]); 
    const [emailCode, setEmailCode] = useState(999999);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const lg = useSelector((state)=>state.language.language);
    const sendValidateEmail = () => {
        useChangeEmailForm.validateFields(['Email']).then((result)=>{
            if(!sendEmailDisabled) {
                setSendEmailDisabled(true);
                    ValidateEmailAPI(changeEmailForm.NewEmail, LT(lg, '国际大健康产业园修改邮箱', 'World Health Park Modify Email'), 
                    LT(lg, '您正在修改账户的邮箱', 'You are modifing email of your accout, your validate code is '))
                    .then(response=> { 
                    setEmailCode(response.data.data)
                }).catch(error=> { 
                    console.log(error)
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
        }).catch(error=>console.log(error))
    };

    const onSubmitFinish = (values) => {
        setSubmitLoading(true)
        ChangeEmailAPI(props.userData.UserName, changeEmailForm.NewEmail, lg, )
        .then(response=> { 
            if(response.data.code==200){
                setTimeout(()=>{
                    setSubmitLoading(false)
                    message.success(LT(lg,'修改邮箱成功','Succeeded in modifying the email address'))
                    props.setChangeEmailOpen(false)
                }, 1000)
            }else{
                console.log();
            }
        }).catch(error=> console.log(error));
    };

    return <Modal title={null} width={800} open={props.changeEmailOpen} onCancel={()=>{props.setChangeEmailOpen(false)}} footer={null} okText={false} cancelText={false} >
        <Form name="basic" form={useChangeEmailForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onSubmitFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg,'修改邮箱','Change email')}</div>
            </Form.Item>
            <Form.Item label={LT(lg,"新邮箱",'New Email')} name="NewEmail"         
                rules={[{type:'email', message:LT(lg,'请输入有效的邮箱','Please enter a valid email address')},
                        {required:true, message:LT(lg,'请输入邮箱','Please enter email')}]}
                validateTrigger={['onChange']}>
                <Input onChange={(e)=>setChangeEmailForm({ ...changeEmailForm,NewEmail:e.target.value})}
                addonAfter={<a style={{pointerEvents:sendEmailDisabled?'none':'', color:sendEmailDisabled?'black':''}} onClick={sendValidateEmail}>{sendEmailDisabled?LT(lg,`请${seconds}秒后再发送`,`please send in ${seconds} seconds`):LT(lg,'发送验证码','Send verification code')}</a>}
                />
            </Form.Item>
            <Form.Item label={LT(lg,"邮箱验证码",'Email verification code')} name="EmailCode" rules={[{required:true, message:LT(lg,'请输入您的验证码！','Please enter your verification code!')},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(changeEmailForm.EmailCode!=emailCode){
                            return Promise.reject(new Error(LT(lg,'验证码错误','Verification code error')))
                        }
                        return Promise.resolve()
                    }
                })              
            ]}>
                <Input  onChange={(e)=>setChangeEmailForm({ ...changeEmailForm,EmailCode:e.target.value})}/>
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

export default ChangeEmail;