import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined,SortAscendingOutlined,SortDescendingOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popover, Select, Spin, Divider, Dropdown } from 'antd';
import Highlighter from 'react-highlight-words';
import {useSelector} from 'react-redux';
import axios from 'axios';
import CommonPagination from './CommonPagination';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}


const DateFormatter = ({ isoDate }) => {
  const formattedDate = moment(isoDate).format('MMMM D, YYYY, HH:mm:ss');
  return <div>{formattedDate}</div>;
};


const NewsList = (props) => {
  const [listData, setListData] = useState([]);
  const [APIParams, setAPIParams] = useState(props.initAPIParmas)
  const [loading, setLoading] = useState([]);
  const [SearchSort, setSearchSort] = useState({OrderField:props.initAPIParmas.OrderField, Order:props.initAPIParmas.Order, SearchField:props.initAPIParmas.SearchField, SearchValue:props.initAPIParmas.SearchValue});
  const navigate = useNavigate();
  const lg = useSelector((state) => state.language.language);

  const fetchData = async (params={}) => {
    setLoading(true);
    try {
      const response = await props.fetchDataAPI({...params, ...props.needAPIAdd});
      setListData(response.data.data);
      setAPIParams({...APIParams, Total:response.data.total})
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(APIParams);
  }, [APIParams.PageNumber, APIParams.PageSize, APIParams.SearchField, APIParams.SearchValue, APIParams.Order, APIParams.OrderField,...props.needUpdate]);


  return <>
  {
    loading?
    <div style={{textAlign:"center",marginTop:"40vh"}}><Spin /></div>
    :
    <div>
        <div style={{float:"right"}}>
            <Popover placement="bottomRight"  content={
                    <Space.Compact style={{width: '100%',}}>
                    <Select style={{width:200}} defaultValue={SearchSort.SearchField} onChange={(e)=>{setSearchSort({...SearchSort,SearchField:e})}}>
                        {props.SearchIndexList.map((item, index) => (
                            <Option key={index} value={item}>{item}</Option>
                        ))}
                        </Select>
                    <Input addonBefore={''
                        
                    } onChange={(e)=>{setSearchSort({...SearchSort,SearchValue:e.target.value})}}/>
                    <Button type="primary" onClick={()=>{setAPIParams({...APIParams,SearchField:SearchSort.SearchField,SearchValue:SearchSort.SearchValue})}}>Submit</Button>
                  </Space.Compact>
                } title="" trigger="click">
                <a onClick={(e) => {e.preventDefault();}}>
                    {LT(lg,'搜索','Search')} <SearchOutlined />
                </a>
            </Popover>
            <Popover placement="bottomRight"  content={<>
                    <Select style={{width:"120px"}} defaultValue={SearchSort.OrderField} onChange={(e)=>{setSearchSort({...SearchSort,OrderField:e})}}>
                        {props.SortIndexList.map((item, index) => (
                            <Option key={index} value={item}>{item}</Option>
                        ))}
                    </Select> 
                    <span style={{fontSize:"20px",marginLeft:"5px"}} onClick={()=>setAPIParams({...APIParams,Order:APIParams.Order==='ascend'?'descend':'ascend'})}>
                        {APIParams.Order=='ascend'?<a><SortAscendingOutlined/></a>:<a><SortDescendingOutlined/></a>}
                    </span>
                </>} title="" trigger="click">
                <a style={{marginLeft:"20px"}} onClick={(e) => {e.preventDefault();}}>
                    {LT(lg,'排序','Sort')} <SortAscendingOutlined />
                </a>
            </Popover>
        </div>
        <div style={{}}>
            {listData.map(item => (
            <>
            <Divider />
            <div key={item.Subject} style={{display:'flex', alignItems:'top',}}>
                <div style={{}}>
                    <img width={`${props.width*0.25}px`} alt="logo" src={`data:image/jpeg;base64,${item.Figure}`}/> 
                </div>
                <div onClick={()=>{}} style={{marginLeft:"20px"}}>
                    <div>
                      <span style={{fontSize:"18px",fontWeight:"bold",marginBottom:"10px",marginRight:"5px"}}>{item.Subject}</span>
                      <a  onClick={()=>{navigate(`/news/${item.id}`);}}>{LT(lg,'点击阅读','Click to read')}</a>
                    </div>
                    <div style={{color:"gray",fontSize:"12px",marginBottom:"10px"}}> {DateFormatter(item.CreatedTime)}</div>
                    <div>{item.Abstract}</div>
                </div>
                
            </div></>
            ))}
        </div> 
        <div style={{}}><CommonPagination setPageInfo={setAPIParams} pageInfo={APIParams}/></div>        
    </div>
  }</>
};

export default NewsList;


{/* <List itemLayout="vertical" size="large" dataSource={listData}
renderItem={(item) => (
<List.Item
    key={item.Subject}
    extra={
    <img
        width={272}
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
    />
    }
>
<List.Item.Meta
title={item.Subject}
description={item.CreatedTime}
/>
{item.Introduction}
</List.Item>
)}
/>   */}