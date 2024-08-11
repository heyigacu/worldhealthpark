import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined,SortAscendingOutlined,SortDescendingOutlined,BankFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Popover, Select, Spin, Divider, Dropdown,Image,Col } from 'antd';
import {useSelector} from 'react-redux';
import CommonPagination from '../common/CommonPagination';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { CompanysAcqurieByClassAPI } from '../../apis/company';
const { Option } = Select;

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}


const DateFormatter = (isoDate) => {
    const formattedDate = moment(isoDate).format('YYYY-MM-D, HH:mm:ss');
    return formattedDate;
  };



const NewsList = ({currentKey}) => {
  const [listData, setListData] = useState([]);
  const [APIParams, setAPIParams] = useState({
    Class:currentKey,
    PageSize: 10, 
    PageNumber: 1, 
    OrderField: 'id', 
    Total: 100, 
    Order: 'ascend',
    SearchField: 'id',
    SearchMethod: 'contains',
    SearchValue: ''
    })
  const [loading, setLoading] = useState([]);
  const [SearchSort, setSearchSort] = useState({OrderField:'id', Order:'ascend', SearchField:'id', SearchValue:''});
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const lg = useSelector((state) => state.language.language);

  useEffect(() => {
      setWidth(window.innerWidth);
    }, []);

  const fetchData = async (params={}) => {
    setLoading(true);
    try {
      const response = await CompanysAcqurieByClassAPI({...params, Class:currentKey});
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
  }, [APIParams.PageNumber, APIParams.PageSize, APIParams.SearchField, APIParams.SearchValue, APIParams.Order, APIParams.OrderField,currentKey]);

  const SortIndexList = ['CompanyName','CreatedTime','Abstract',]
  const SearchIndexList = ['CompanyName','CreatedTime','Abstract',]
  const noneTrans = (obj) => {
    if (obj == undefined) {
        return LT(lg, '无', 'None');
    } else {
        return obj;
    }
    }

  return <>
  {
    loading?
    <div style={{textAlign:"center",marginTop:"40vh"}}><Spin /></div>
    :
    <div>
        <div style={{float:"right"}}>
            <Popover placement="bottomRight"  content={
                    <Space.Compact style={{width: '100%',}}>
                    <Select style={{ width: 200 }}  defaultValue={SearchSort.SearchField} onChange={(e)=>{setSearchSort({...SearchSort,SearchField:e})}}>
                    {SearchIndexList.map((item, index) => (
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
                        {SortIndexList.map((item, index) => (
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
                <div style={{}}>{
                item.Figure?
                <Image style={{ width:`${width*0.1}px`,height:`${width*0.1}px`,objectFit:'cover',objectPosition:'center' }} src={`data:image/png;base64,${item.Figure}`} alt="" />
                :
                <Image style={{ width:`${width*0.1}px`,height:`${width*0.1}px`,objectFit:'cover',objectPosition:'center' }}  alt="" src="error"
                    fallback="data:image/png;base64,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"
                />                
                }</div>
                <div onClick={()=>{}} style={{marginLeft:"20px"}}>
                    <div><BankFilled style={{ fontSize: 30 }} />&nbsp;<span style={{fontSize:'20px', fontWeight:'bold' }}>{item.CompanyName}</span></div>
                    <div>{item.Abstract == undefined ? LT(lg, '暂无简介', 'No abstract available') : item.Abstract}</div>
                    {/* <Divider /> */}
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司邮箱：', 'Company Email:')}</span><span>{noneTrans(item.Email)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司地址：', 'Company Address:')}</span><span >{noneTrans(item.Address)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司电话：', 'Company Mobile:')}</span><span >{noneTrans(item.Mobile)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司座机：', 'Company Landline:')}</span><span >{noneTrans(item.Landline)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司类别：', 'Company Type:')}</span><span >{noneTrans(item.Type)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司创立时间：', 'Company Founded:')}</span><span>{DateFormatter(item.CreatedTime)}</span></div>
                    <div><span style={{fontWeight:"bold"}}>{LT(lg, '公司介绍：', 'Company Introduction:')}</span><span >{noneTrans(item.Introduction)}</span></div>
                </div>
            </div></>
            ))}
        </div> 
        <div style={{}}><CommonPagination setPageInfo={setAPIParams} pageInfo={APIParams}/></div>        
    </div>
  }</>
};

export default NewsList;


{/* <Row>
<Col span={6}><img style={{ width:`${width*0.16}px`,height:`${width*0.16}px`,objectFit:'cover',objectPosition:'center' }} src={`data:image/png;base64,${companyData.Figure}`} alt="" /></Col>
<Col span={18}>
    <div style={{ display: "flex" }}><BankFilled style={{ fontSize: 30 }} />&nbsp;<span style={{ fontSize: 30, fontWeight: 'bold' }}>{companyData.CompanyName}</span></div>
    <div>{companyData.Abstract == undefined ? LT(lg, '暂无简介', 'No abstract available') : companyData.Abstract}</div>
    <Divider />
    <Row>
        <Col span={4}>{LT(lg, '公司邮箱：', 'Company Email:')}</Col><Col >{noneTrans(companyData.Email)}</Col>
        <Col span={4}>{LT(lg, '公司地址：', 'Company Address:')}</Col><Col >{noneTrans(companyData.Address)}</Col>
        <Col span={4}>{LT(lg, '公司电话：', 'Company Mobile:')}</Col><Col >{noneTrans(companyData.Mobile)}</Col>
        <Col span={4}>{LT(lg, '公司座机：', 'Company Landline:')}</Col><Col >{noneTrans(companyData.Landline)}</Col>
        <Col span={4}>{LT(lg, '公司类别：', 'Company Type:')}</Col><Col >{noneTrans(companyData.Type)}</Col>
        <Col span={4}>{LT(lg, '公司创立时间：', 'Company Founded:')}</Col><Col >{ProcessTime(companyData.CreatedTime)}</Col>
        <Col span={4}>{LT(lg, '公司介绍：', 'Company Introduction:')}</Col><Col >{noneTrans(companyData.Introduction)}</Col>
    </Row>
</Col>
</Row> */}