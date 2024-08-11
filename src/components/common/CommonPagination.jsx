import React, { useEffect, useState } from 'react'
import { Table,  Tag, Button, Pagination, ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US'



const  CommonPagination = (props) => {


    const lg = useSelector((state) => state.language.language);
    const handlePageChange = (page, pageSize) => {
        props.setPageInfo((prev) => ({...prev,  PageNumber: page, PageSize: pageSize, }));
    };

    const handlePageSizeChange = (page, pageSize) => {
        props.setPageInfo((prev) => ({...prev, PageNumber: page, PageSize: pageSize, }))
    };

    return <ConfigProvider locale={lg==='Chinese'?zhCN:enUS}>
    <Pagination style={{float:"right", marginTop:"10px"}} showQuickJumper showSizeChanger current={props.pageInfo.PageNumber}  total={props.pageInfo.Total}  pageSize={props.pageInfo.PageSize}  onChange={handlePageChange} onShowSizeChange={handlePageSizeChange} />
</ConfigProvider>


}

export default CommonPagination;