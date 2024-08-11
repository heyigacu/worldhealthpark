import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd';
import { useSelector } from 'react-redux';
import { CompanyChangeStatusAPI, CompanyStatusAPI } from '../../../apis/company'
import CompanyInfo from './CompanyInfo'
import CommonTable from '../../../components/common/CommonTable'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const CompanysStatusReview = (props) => {
    const [statusCompanyInfo, setStatusCompanyInfo] = useState({ CompanyInfoOpen: false, CompanyID: null })
    const lg = useSelector((state) => state.language.language);
    
    const status_switcher = (status) => {
        switch (status) {
            case 0:
                return LT(lg, '待审核', 'Pending Review');
            case 1:
                return LT(lg, '审核通过', 'Approved');
            case 2:
                return LT(lg, '审核退回', 'Rejected');
            default:
                return status;
        }
    }

    const columns = [
        { title: LT(lg, '公司名', 'Company Name'), dataIndex: 'CompanyName', key: 'CompanyName', width: "15%" },
        { title: LT(lg, '公司编号', 'Company ID'), dataIndex: 'id', key: 'id', width: "5%" },
        { title: LT(lg, '所有人', 'Owner'), dataIndex: 'Owner', key: 'Owner', width: "10%" },
        {
            title: LT(lg, '状态', 'Status'), dataIndex: 'Status', key: 'Status',
            render: (_, record) => (
                <a onClick={() => { }}>{status_switcher(record.Status)}</a>
            ),
            width: "10%"
        },
        {
            title: LT(lg, '审核', 'Review'), key: 'action1',
            render: (_, record) => (
                <>
                    <a onClick={() => {
                        CompanyChangeStatusAPI(record.id, 1)
                            .then(response => {
                                if (response.data.code == 200) {
                                    setStatusCompanyInfo(response.data.data)
                                    message.success(LT(lg, '审批通过成功', 'Approve Successfully'))
                                } else { }
                            }).catch()
                    }}>{LT(lg, '通过', 'Approve')}</a>&nbsp;&nbsp;
                    <a onClick={() => {
                        CompanyChangeStatusAPI(record.id, 2)
                            .then(response => {
                                if (response.data.code == 200) {
                                    setStatusCompanyInfo(response.data.data)
                                    message.error(LT(lg, '审批退回成功', 'Reject Successfully'))
                                } else { }
                            }).catch()
                    }}>{LT(lg, '退回', 'Reject')}</a>
                </>
            ),
            width: "10%"
        },
        {
            title: LT(lg, '查看', 'View'), key: 'action2',
            render: (_, record) => (
                <a onClick={() => {
                    setStatusCompanyInfo({ CompanyInfoOpen: true, CompanyID: record.id })
                }}>{LT(lg, '查看', 'View')}</a>
            ),
            width: "10%"
        },
    ]

    return <>
        <div style={{ fontSize: 20, marginBottom: 15 }}>{LT(lg, '申请的公司信息', 'Applied Company Information')}</div>
        <CommonTable columns={columns} fetchDataAPI={CompanyStatusAPI} user={props.user} SearchIndexList={['CompanyName','id','Owner']} 
          needUpdate={[statusCompanyInfo, props.manageKey]}
          SortIndexList={['CompanyName','id','Owner']} initAPIParmas={
            {
            PageSize: 10, 
            PageNumber: 1, 
            OrderField: 'id', 
            Total: 100, 
            Order: 'ascend',
            SearchField: 'id',
            SearchMethod: 'contains',
            SearchValue: ''
            }}
        />            
        {statusCompanyInfo.CompanyInfoOpen ? <CompanyInfo companyInfo={statusCompanyInfo} setCompanyInfo={setStatusCompanyInfo} /> : ''}
    </>
}

export default CompanysStatusReview;
