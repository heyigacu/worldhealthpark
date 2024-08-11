
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../../reduxs/userSlice';
import { UserAcqurieAPI } from '../../apis/user';
import ChangePassword from './user/ChangePassword';
import ChangeEmail from './user/ChangeEmail';

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
}

const ProcessTime=(time_string, language)=>{
    const strings = String(time_string).split('.')[0].replace('T', LT(language,'日',' ')).split('-')
    return strings[0]+LT(language,'年',' ')+strings[1]+LT(language,'月',' ')+strings[2]
}

const UserInfo = (props) => {
    const [userData, setUserData] = useState({})
    const [changeEmailOpen, setChangeEmailOpen] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    const dispatch = useDispatch()
    const lg = useSelector((state)=>state.language.language);

    const columns = [
        {title:LT(lg,'信息','Information'),dataIndex:'attribution',key:'attribution',width:"30%"},
        {title:LT(lg,'值','Value'),dataIndex:'value',key:'value',width:"30"},
        {title:LT(lg,'操作','Operate'),key:'action',
            render: (_, record) => (
                record.attribution===LT(lg,'创建时间','Creation time')
                ?
                ''
                :
                <a onClick={()=>{
                    if(record.attribution===LT(lg,'邮箱','Email')){
                        setChangeEmailOpen(true)
                    }else if(record.attribution===LT(lg,'密码','Password')){
                        setChangePasswordOpen(true)
                    }else{}
                }}>{LT(lg,'修改','Change')}</a>
            ),
            width: "30"
        },
      ]
      
    useEffect(()=>{
        UserAcqurieAPI(props.user.UserName)
        .then(response=> { 
            if(response.data.code==200){
                setUserData(response.data.data)
            }else{}
        }).catch(error=>console.log(error));
    },[])


    if(changeEmailOpen){
        return <ChangeEmail changeEmailOpen={changeEmailOpen} setChangeEmailOpen={setChangeEmailOpen} userData={userData} />
    }
    if(changePasswordOpen){
        return <ChangePassword changePasswordOpen={changePasswordOpen} setChangePasswordOpen={setChangePasswordOpen} userData={userData}/>
    }
    return <>
        <div style={{fontSize:20, marginBottom:15}}>
            <UserOutlined style={{marginLeft:10, marginRight:10}}/>
            {LT(lg,'亲爱的用户','Dear user ')}
            <span style={{fontWeight:"bold"}}>{userData.UserName}</span>
            {LT(lg,'，以下是您的个人信息：',', the following is your personal information:')}
            <Button style={{float:"right"}} onClick={()=>{dispatch(logout())}}>{LT(lg,'退出登录','Log out')}</Button>
        </div>
        <div><Table dataSource={[
            {attribution:LT(lg,'邮箱','Email'), value:userData.Email},
            {attribution:LT(lg,'密码','Password'), value:userData.Password},
            {attribution:LT(lg,'创建时间','Creation time'), value:ProcessTime(userData.CreatedTime, lg)},
        ]} columns={columns} pagination={false} style={{width:"100%"}}/></div>
        </>
}

export default UserInfo;