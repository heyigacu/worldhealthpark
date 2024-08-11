

import React, { useState } from 'react'
import { Modal, Button } from 'antd';

import { UserDeleteByID } from '../../../apis/user'
import { useSelector } from 'react-redux';

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }


const DeleteUser = (props) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const lg = useSelector((state)=>state.language.language);
    const OnDeleteUser = () => {
        setSubmitLoading(true)
        UserDeleteByID(props.deleteUserInfo.DeleteUserID)
        .then(response=> { 
            if(response.data.code==200){
                setSubmitLoading(false)
                props.setDeleteUserInfo({...props.deleteUserInfo, DeleteUserInfoOpen:false})
            }else{}
        }).catch(error=>console.log(error));
    }
    return <Modal style={{textAlign:"center"}} title={null} width={1200} open={props.deleteUserInfo.DeleteUserID} onCancel={()=>{props.setDeleteUserInfo({...props.deleteUserInfo, DeleteUserInfoOpen:false})}} footer={null} okText={false} cancelText={false} >
        <div style={{margin:"10px"}}>{LT(lg,'是否删除','Delete or not')}</div>
        <div>{submitLoading?<Button type="primary" danger loading>{LT(lg,'删除中','Deleting...')}</Button>:<Button type="primary" danger onClick={OnDeleteUser}>{LT(lg,'确定删除','Definitive deletion')}</Button>} <Button type="primary" onClick={()=>{props.setDeleteUserInfo({...props.deleteUserInfo, DeleteUserInfoOpen:false})}} >{LT(lg,'取消删除','Undelete')}</Button></div>
    </Modal>
}

export default DeleteUser;