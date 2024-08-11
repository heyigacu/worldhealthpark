
import React, { useState, useEffect } from 'react'
import { message,Modal, Form, Input, Spin, Button, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { UserUpdateAPI,UserAcqurieByID } from '../../../apis/user'
import { useSelector } from 'react-redux';

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }

const UpdateUser = (props) =>{
    const [useUpdateUserForm] = Form.useForm();
    const [updateUserForm, setUpdateUserForm] = useState([]); 
    const [submitLoading, setSubmitLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false)
    const [useEffectData, setUseEffectData] = useState()
    const lg = useSelector((state)=>state.language.language);
    
    useEffect(()=>{
        setRequestLoading(true)
        UserAcqurieByID(props.updateUserInfo.UpdateUserID)
        .then(response=> { 
            if(response.data.code==200){
                setUseEffectData(response.data.data)
                useUpdateUserForm.setFieldsValue(
                    {   UserName:response.data.data.UserName,
                        Email:response.data.data.Email,
                        Mobile:response.data.data.Mobile,
                        Rank:String(response.data.data.Rank),
                        Country:response.data.data.Country,
                    }
                )
                setUpdateUserForm(
                    {   UserName:response.data.data.UserName,
                        Email:response.data.data.Email,
                        Mobile:response.data.data.Mobile,
                        Rank:Number(response.data.data.Rank),   
                        Country:response.data.data.Country,                   
                    }
                )

                setRequestLoading(false)
            }else{}
        }).catch(error=>console.log(error)
        );
    },[])

    const onUpdateUserFinish = (values) => {
        useUpdateUserForm.validateFields(['Email']).then((result)=>{
            setSubmitLoading(true)
            UserUpdateAPI({...updateUserForm, UserName:updateUserForm.UserName, id:useEffectData.id})
            .then(response=> { 
                if(response.data.code==200){
                    setSubmitLoading(false)
                    message.success(LT(lg,'用户信息修改成功','User information modified successfully'))
                    props.setUpdateUserInfo({...props.updateUserInfo,UpdateUserInfoOpen:false})
                }else{}
            }).catch(error=> {
                message.error(LT(lg,'用户信息修改失败','User information modified faildly'))
                console.log(error)
            });
            setTimeout(()=>{
                setSubmitLoading(false)
            }, 1000)
        }).catch((error)=>{console.log(error)})
    };

    return <Modal title={null} width={1200} open={props.updateUserInfo.UpdateUserInfoOpen} onCancel={()=>{props.setUpdateUserInfo({...props.updateUserInfo, UpdateUserInfoOpen:false})}} footer={null} okText={false} cancelText={false} >
        {requestLoading?
        <div>Loading</div>
        :<Form name="basic" form={useUpdateUserForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onUpdateUserFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg,"修改用户信息",'Update user information')}</div>
            </Form.Item>
            <Form.Item label={LT(lg,"用户名",'User name')}  name="UserName" rules={[{type:'string',max:50,min:1,message:LT(lg,'用户名长度为2-50','User name length 2-50')},{required:true, message:LT(lg,'请输入用户名','Please enter your username')},]}>          
                <Input onChange={(e)=>setUpdateUserForm({ ...updateUserForm, UserName:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,"邮箱",'Email')} name="Email"         
                rules={[{type:'email', message:'Please enter a valid email address'},{required:true, message:LT(lg,'请输入邮箱','Please enter email')}]} validateTrigger={['onChange']}>
                <Input onChange={(e)=>setUpdateUserForm({ ...updateUserForm,Email:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,"手机号",'Phone number')} name="Mobile" rules={[{type:'string',max:50,min:1,message:LT(lg,'手机号长度为13位','The phone number is 13 digits long')},{required:false, message:LT(lg,'请输入手机号','Please enter your phone number')}]}>
                <Input onChange={(e)=>setUpdateUserForm({ ...updateUserForm, Mobile:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,"国家",'Country')}  name="Country" rules={[{type:'string',max:50,min:1,message:LT(lg,'国家长度最长50字','Country length up to 50 letters')},{required:false, message:LT(lg,'请输入国家','Please enter your country')}]}>
                <Input onChange={(e)=>setUpdateUserForm({ ...updateUserForm, Mobile:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg,"权限等级",'Authority level')} name="Rank" rules={[{required:true, message:LT(lg,'请选择权限','Please select permissions')}]} >
                <Radio.Group onChange={(e)=>setUpdateUserForm({ ...updateUserForm,Rank:e.target.value})} >
                <Radio value="1">{LT(lg,'超级管理员','Super administrator')}</Radio>
                <Radio value="2">{LT(lg,'普通管理员','General administrator')}</Radio>
                <Radio value="3">{LT(lg,'高级用户','Advanced user')}</Radio>
                <Radio value="4">{LT(lg,'普通用户','Ordinary user')}</Radio>
                </Radio.Group>
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
        </Form>}
    </Modal>
}
export default UpdateUser;




