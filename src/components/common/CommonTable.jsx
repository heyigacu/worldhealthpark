import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import {useSelector} from 'react-redux';
import axios from 'axios';
import CommonPagination from './CommonPagination';



const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}
const CommonTable = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [APIParams, setAPIParams] = useState(props.initAPIParmas)
  const [searchSort, setSearchSort] = useState({OrderField:'id', Order:'ascend', SearchField:'id', SearchValue:''});
//   const [filtered, setFiltered] = useState(false)
  

  const searchInput = useRef(null);
  const lg = useSelector((state) => state.language.language);

  useEffect(() => {
    fetchData(APIParams);
  }, [APIParams.PageNumber, APIParams.PageSize, ...props.needUpdate]);

  const fetchData = async (params={}) => {
    setLoading(true);
    try {
      const response = await props.fetchDataAPI({...params, ...props.needAPIAdd});
      console.log(response.data.data)
      setTableData(response.data.data);
      setAPIParams({...APIParams, Total:response.data.total})
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };
   
  const handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setSearchSort({...searchSort, SearchField:[dataIndex][0], SearchValue:selectedKeys[0]})
    if(selectedKeys[0] !== undefined){
        fetchData({...APIParams, SearchField:[dataIndex][0], SearchValue:selectedKeys[0], OrderField:searchSort.OrderField, Order:searchSort.Order,});
    }else{
        fetchData({...APIParams, SearchField:[dataIndex][0], SearchValue:'', OrderField:searchSort.OrderField, Order:searchSort.Order,});
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setSearchSort({...searchSort, SearchField:'id', SearchValue:''})
    fetchData({...APIParams, SearchField:'id',  SearchValue:'', OrderField:searchSort.OrderField, Order:searchSort.Order,});

  };

  const handleTableSort = (pagination, filters, sorter) => {
    if(sorter.order !== undefined){
        setSearchSort({...searchSort, OrderField:sorter.field, Order:sorter.order,})
        fetchData({...APIParams, OrderField:sorter.field, Order:sorter.order, SearchField:searchSort.SearchField, SearchValue:searchSort.SearchValue,});
    }else{ // reset
        setSearchSort({...searchSort, OrderField:'id', Order:'ascend',})
        fetchData({...APIParams, OrderField:'id', Order: 'ascend', SearchField:searchSort.SearchField, SearchValue:searchSort.SearchValue,});
    }
  };


  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={LT(lg,`搜索 ${title}`,`Search ${dataIndex}`)}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button  type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex, clearFilters)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            {LT(lg,'搜索','Search')}
          </Button>
          <Button onClick={()=>clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            {LT(lg,'清空','Reset')}  
          </Button>
          {/* <Button type="link"  size="small" onClick={() => {confirm({closeDropdown: false,});  setSearchText(selectedKeys[0]); setSearchedColumn(dataIndex);}} >
            Filter
          </Button>           */}
          <Button type="link" size="small"  onClick={() => close()}>
            {LT(lg,'关闭','Close')}  
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => {return <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />},
    // onFilter: (value, record) =>
    //   record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? 
      (<Highlighter highlightStyle={{backgroundColor: '#ffc069',  padding: 0,}} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''}/>)
       : 
      (text),
  });

  const addSearchPropsToColumns = (columns, SearchIndexList, OrderIndexList) => {
    return columns.map(column => {
      const searchProps = SearchIndexList.includes(column.dataIndex) ? getColumnSearchProps(column.dataIndex, column.title) : {};
      const originalRender = column.render;
  
      return {
        ...column,
        ...searchProps,
        sorter: OrderIndexList.includes(column.dataIndex),
        render: (text, record) => {
          const searchRender = searchProps.render ? searchProps.render(text, record) : text;
          return originalRender ? originalRender(searchRender, record) : searchRender;
        },
      };
    });
  };
  
  
  return <>
    <Table pagination={false} columns={addSearchPropsToColumns(props.columns, props.SortIndexList, props.SearchIndexList)} dataSource={tableData} loading={loading} onChange={handleTableSort} showSorterTooltip={{target: 'sorter-icon',}}/>     
    <CommonPagination setPageInfo={setAPIParams} pageInfo={APIParams}/>
  </>
};

export default CommonTable;
