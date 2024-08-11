


import React, { useEffect, useState } from 'react'
import { Table, } from 'antd';
import { UsersAcqurieAPI } from '../../apis/user'
import { useSelector } from 'react-redux';
import UpdateUser from './user/UpdateUser'
import DeleteUser from './user/DeleteUser';

import CommonTable from '../../components/common/CommonTable'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
}

const UsersManage = (props) => {
    const [updateUserInfo, setUpdateUserInfo] = useState({UpdateUserInfoOpen:false, UpdateUserID:null})
    const [deleteUserInfo, setDeleteUserInfo] = useState({DeleteUserInfoOpen:false, DeleteUserID:null})
    const lg = useSelector((state)=>state.language.language);


    const columns = [
        {title:LT(lg,'用户名','User name'),dataIndex:'UserName',key:'UserName',width:"15%"},
        {title:LT(lg,'用户编号','User number'),dataIndex:'id',key:'id',width:"5%"},
        {title:LT(lg,'国家','Country'),dataIndex:'Country',key:'Country',width:"5%"},
        {title:LT(lg,'邮箱','Email'),dataIndex:'Email',key:'Email',width:"5%"},
        {title:LT(lg,'手机号','Mobile'),dataIndex:'Mobile',key:'Mobile',width:"5%"},
        {title:LT(lg,'用户权限','Rank'),dataIndex:'Rank',key:'Rank',width:"5%"},
        {title:LT(lg,'编辑','Edit'),key:'action2',
            render: (_, record) => (
                <a onClick={()=>{
                    setUpdateUserInfo({UpdateUserInfoOpen:true, UpdateUserID:record.id})
                }}>{LT(lg,'编辑','Edit')}</a>
            ),
            width: "10%"
        },
        {title:LT(lg,'删除','Delete'),key:'action3',
            render: (_, record) => (
                <a onClick={()=>{
                    setDeleteUserInfo({DeleteUserInfoOpen:true, DeleteUserID:record.id})
                }}>{LT(lg,'删除','Delete')}</a>
            ),
            width: "10%"
        },
    ]


    return  <>
    <div style={{fontSize:20, marginBottom:15}}>{LT(lg,'用户信息','Users information')}</div>
    <CommonTable columns={columns} fetchDataAPI={UsersAcqurieAPI} user={props.user} SearchIndexList={['CompanyName','id','Status']} 
        needUpdate = {[updateUserInfo, deleteUserInfo]}
        SortIndexList={['UserName','id','Status','Country','Rank']} initAPIParmas={
            {
            PageSize: 10, 
            PageNumber: 1, 
            OrderField: 'id', 
            Total: 100, 
            Order: 'ascend',
            SearchField: 'id',
            SearchMethod: 'contains',
            SearchValue: ''
            }}/>
    {updateUserInfo.UpdateUserInfoOpen?<UpdateUser setUpdateUserInfo={setUpdateUserInfo} updateUserInfo={updateUserInfo}/>:''}
    {deleteUserInfo.DeleteUserInfoOpen?<DeleteUser setDeleteUserInfo={setDeleteUserInfo} deleteUserInfo={deleteUserInfo} />:''}
    </>
}

export default UsersManage;