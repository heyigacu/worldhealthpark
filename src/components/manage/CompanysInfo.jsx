import React, { useEffect, useState } from 'react'
import { Table,  Tag, Button, } from 'antd';
import { useSelector } from 'react-redux';
import { CompanysAcqurieAPI } from '../../apis/company';
import RegisterCompany from './company/RegisterCompany';
import CompanyInfo from './company/CompanyInfo';
import UpdateCompany from './company/UpdateCompany';
import DeleteCompany from './company/DeleteCompany';
import CommonTable from '../../components/common/CommonTable'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}


const CompanysInfo = (props) => {
    const [registerCompanyOpen, setRegisterCompanyOpen] = useState(false)
    const [viewCompanyInfo, setViewCompanyInfo] = useState({ CompanyInfoOpen: false, CompanyID: null })
    const [updateCompanyInfo, setUpdateCompanyInfo] = useState({ UpdateCompanyInfoOpen: false, UpdateCompanyID: null })
    const [deleteCompanyInfo, setDeleteCompanyInfo] = useState({ DeleteCompanyInfoOpen: false, DeleteCompanyID: null })
    const [width, setWidth] = useState(window.innerWidth);
    const lg = useSelector((state) => state.language.language);
    useEffect(() => {
        setWidth(window.innerWidth);
      }, []);
      
    const status_switcher = (code) => {
        switch (code) {
            case 1:
                return <Tag color="green">{LT(lg, '已审核', 'Reviewed')}</Tag>
            case 2:
                return <Tag color="red">{LT(lg, '退回', 'Returned')}</Tag>
            default:
                return <Tag color="blue">{LT(lg, '申请中', 'Pending')}</Tag>
        }
    }

    const columns = [
        { title: LT(lg, '公司名', 'Company Name'), dataIndex: 'CompanyName', key: 'CompanyName', width: "15%" },
        { title: LT(lg, '公司编号', 'Company ID'), dataIndex: 'id', key: 'id', width: "10%" },
        { title: LT(lg, '所有人', 'Owner'), dataIndex: 'Owner', key: 'Owner', width: "10%" },
        { title: LT(lg, '状态', 'Status'), dataIndex: 'Status', key: 'Status',
            render: (_, record) => (
                <a onClick={()=>{}}>{status_switcher(record.Status)}</a>
            ),
            width: "10%"
        },
        { title: LT(lg, '查看', 'View'), key: 'action1',
            render: (_, record) => (
                <a onClick={() => {
                    setViewCompanyInfo({ CompanyInfoOpen: true, CompanyID: record.id })
                }}>{LT(lg, '查看', 'View')}</a>
            ),
            width: "10%"
        },
        { title: LT(lg, '编辑', 'Edit'), key: 'action2',
            render: (_, record) => (
                <a onClick={() => {
                    setUpdateCompanyInfo({ UpdateCompanyInfoOpen: true, UpdateCompanyID: record.id })
                }}>{LT(lg, '编辑', 'Edit')}</a>
            ),
            width: "10%"
        },
        { title: LT(lg, '删除', 'Delete'), key: 'action3',
            render: (_, record) => (
                <a onClick={() => {
                    setDeleteCompanyInfo({ DeleteCompanyInfoOpen: true, DeleteCompanyID: record.id })
                }}>{LT(lg, '删除', 'Delete')}</a>
            ),
            width: "10%"
        },
    ]

    return <>
        <div style={{ fontSize: 20, marginBottom: 15 }}>
            <span>{LT(lg, '公司信息', 'Company Information')} <Button onClick={() => { setRegisterCompanyOpen(true) }}>{LT(lg, '注册公司', 'Register Company')}</Button></span> 
        </div>
        <CommonTable columns={columns} fetchDataAPI={CompanysAcqurieAPI} user={props.user} SearchIndexList={['CompanyName','id','Status','Owner']} 
        needUpdate = {[registerCompanyOpen, updateCompanyInfo, deleteCompanyInfo, props.manageKey]}
        SortIndexList={['CompanyName','id','Status','Owner']} initAPIParmas={
            {UserName:props.user.UserName, 
            All:(props.user.Rank < 3) ? true : false, 
            PageSize: 10, 
            PageNumber: 1, 
            OrderField: 'id', 
            Total: 100, 
            Order: 'ascend',
            SearchField: 'id',
            SearchMethod: 'contains',
            SearchValue: ''
            }}/>
        {registerCompanyOpen ? <RegisterCompany registerCompanyOpen={registerCompanyOpen} setRegisterCompanyOpen={setRegisterCompanyOpen} user={props.user} /> : ''}
        {viewCompanyInfo.CompanyInfoOpen ? <CompanyInfo companyInfo={viewCompanyInfo} setCompanyInfo={setViewCompanyInfo} /> : ''}
        {updateCompanyInfo.UpdateCompanyInfoOpen ? <UpdateCompany user={props.user} updateCompanyInfo={updateCompanyInfo} setUpdateCompanyInfo={setUpdateCompanyInfo} /> : ''}
        {deleteCompanyInfo.DeleteCompanyInfoOpen ? <DeleteCompany deleteCompanyInfo={deleteCompanyInfo} setDeleteCompanyInfo={setDeleteCompanyInfo} /> : ''}
    </>
}

export default CompanysInfo;

