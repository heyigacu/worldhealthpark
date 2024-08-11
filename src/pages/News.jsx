import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { Avatar, List, Space } from 'antd';
import { NewsesAcqurieAPI } from '../apis/news'
import NewsList from '../components/common/NewsList'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

export default function News() {
  const lg = useSelector((state) => state.language.language);
  const [listData, setListData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div style={{marginLeft:"auto",marginRight:"auto",width:`${width*0.6}px`,marginTop:"20px",marginBottom:"20px"}}>
        <div style={{fontSize:"40px",fontWeight:'bolder'}}>{LT(lg,'新闻中心','News Center')}</div>
        <NewsList fetchDataAPI={NewsesAcqurieAPI} width={width*0.6}
        SearchIndexList={['Introduction','Subject','Abstract','Time','id']}
        SortIndexList={['Introduction','Subject','Abstract','Time','id']}
        needUpdate={[]}
        initAPIParmas={
            {
            PageSize: 10, 
            PageNumber: 1, 
            OrderField: 'id', 
            Total: 0, 
            Order: 'ascend',
            SearchField: 'id',
            SearchMethod: 'contains',
            SearchValue: ''
            }}
        />
    </div>

  )
}
