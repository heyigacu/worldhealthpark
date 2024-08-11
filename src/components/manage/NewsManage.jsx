import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NewsesAcqurieAPI } from '../../apis/news'
import CreateNews from './news/CreateNews';
import DeleteNews from './news/DeleteNews';
import UpdateNews from './news/UpdateNews';
import CommonTable from '../../components/common/CommonTable'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }

const NewsManage = (props) => {
    const [createNewsOpen, setCreateNewsOpen] = useState(false)
    const [updateNewsInfo, setUpdateNewsInfo] = useState({UpdateNewsInfoOpen:false, UpdateNewsID:null})
    const [deleteNewsInfo, setDeleteNewsInfo] = useState({DeleteNewsInfoOpen:false, DeleteNewsID:null})
    const lg = useSelector((state)=>state.language.language);


    const columns = [
        { title: LT(lg, '主题', 'Subject'), dataIndex: 'Subject', key: 'Subject', width: "15%" },
        { title: LT(lg, '时间', 'Time'), dataIndex: 'Time', key: 'Time', width: "5%" },
        { title: LT(lg, '发布人', 'Publisher'), dataIndex: 'Owner', key: 'Owner', width: "5%" },
        { title: LT(lg, '编号', 'ID'), dataIndex: 'id', key: 'id', width: "5%" },
        { title: LT(lg, '摘要', 'Abstract'), dataIndex: 'Abstract', key: 'Abstract', width: "5%" },
        { title: LT(lg, '详细介绍', 'Detailed Introduction'), dataIndex: 'Introduction', key: 'Introduction', width: "5%" },
        {
            title: LT(lg, '编辑', 'Edit'), key: 'action2',
            render: (_, record) => (
                <a onClick={() => {
                    setUpdateNewsInfo({ UpdateNewsInfoOpen: true, UpdateNewsID: record.id })
                }}>{LT(lg, '编辑', 'Edit')}</a>
            ),
            width: "10%"
        },
        {
            title: LT(lg, '删除', 'Delete'), key: 'action3',
            render: (_, record) => (
                <a onClick={() => {
                    setDeleteNewsInfo({ DeleteNewsInfoOpen: true, DeleteNewsID: record.id })
                }}>{LT(lg, '删除', 'Delete')}</a>
            ),
            width: "10%"
        },
    ]


    return <>
        <div style={{ fontSize: 20, marginBottom: 15 }}>{LT(lg, '新闻信息', 'News Information')} &nbsp;<Button onClick={() => { setCreateNewsOpen(true) }}>{LT(lg, '新建新闻', 'Create News')}</Button></div>
        <CommonTable columns={columns} fetchDataAPI={NewsesAcqurieAPI} user={props.user} SearchIndexList={['Subject','Time','id','Owner']} 
        needUpdate = {[updateNewsInfo,deleteNewsInfo,createNewsOpen]}
        SortIndexList={['Subject','id','Owner','Time']} initAPIParmas={
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
        {createNewsOpen ? <CreateNews user={props.user} createNewsOpen={createNewsOpen} setCreateNewsOpen={setCreateNewsOpen}/> : ''}
        {updateNewsInfo.UpdateNewsInfoOpen ? <UpdateNews user={props.user} updateNewsInfo={updateNewsInfo} setUpdateNewsInfo={setUpdateNewsInfo}/> : ''}
        {deleteNewsInfo.DeleteNewsInfoOpen ? <DeleteNews user={props.user} deleteNewsInfo={deleteNewsInfo} setDeleteNewsInfo={setDeleteNewsInfo}/> : ''}
    </>
}

export default NewsManage;
