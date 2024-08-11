import React, { useEffect, useState } from 'react'
import { Table,  Tag, Button, } from 'antd';
import { useSelector } from 'react-redux';
import { CompanysAcqurieByClassAPI } from '../../apis/company';
import CompanyInfo from '../manage/company/CompanyInfo';
import CommonTable from '../common/CommonTable'
import moment from 'moment';

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const DateFormatter = ({isoDate}) => {
    const formattedDate = moment(isoDate).format('YYYY-MM-D, HH:mm:ss');
    return <div>{formattedDate}</div>;
  };
  
const TableShow = ({currentKey}) => {
    const [viewCompanyInfo, setViewCompanyInfo] = useState({ CompanyInfoOpen: false, CompanyID: null })
    const lg = useSelector((state) => state.language.language);
    const columns = [
        { title: LT(lg, '公司名', 'Company Name'), dataIndex: 'CompanyName', key: 'CompanyName', width: "15%" },
        { title: LT(lg, '创建时间', 'Created Time'), dataIndex: 'CreatedTime', key: 'CreatedTime', width: "15%", render: (text) => <DateFormatter isoDate={text} />},
        { title: LT(lg, '简介', 'Abstract'), dataIndex: 'Abstract', key: 'Abstract', width: "15%" },
        { title: LT(lg, '查看', 'View'), key: 'action1',
            render: (_, record) => (
                <a onClick={() => {
                    setViewCompanyInfo({ CompanyInfoOpen: true, CompanyID: record.id })
                }}>{LT(lg, '查看', 'View')}</a>
            ),
            width: "10%"
        },
    ]
    return <>
        <CommonTable columns={columns} fetchDataAPI={CompanysAcqurieByClassAPI}  
        SearchIndexList={['CompanyName','CreatedTime','Abstract',]} 
        needUpdate = {[currentKey]}
        needAPIAdd = {{'Class':currentKey}}
        SortIndexList={['CompanyName','CreatedTime','Abstract',]} initAPIParmas={
            {
            Class:currentKey,
            PageSize: 10, 
            PageNumber: 1, 
            OrderField: 'id', 
            Total: 100, 
            Order: 'ascend',
            SearchField: 'id',
            SearchMethod: 'contains',
            SearchValue: ''
            }}/>
        {viewCompanyInfo.CompanyInfoOpen ? <CompanyInfo companyInfo={viewCompanyInfo} setCompanyInfo={setViewCompanyInfo} /> : ''}
    </>
}

export default TableShow;

