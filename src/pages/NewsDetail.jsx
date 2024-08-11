import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsAcqurieByURLIDAPI } from '../apis/news';
import { Spin } from 'antd'
import moment from 'moment';
import dayjs from 'dayjs';
// const DateFormatter = (isoDate) => {
//     if (!isoDate) {
//         return <div>No date provided</div>;
//     }
//     const formattedDate = dayjs(isoDate).isValid() ? dayjs(isoDate).format('YYYY, MMMM D, HH:mm:ss') : 'Invalid date';
//     return <div>{formattedDate}</div>;
// };
const DateFormatter = (isoDate) => {
    const formattedDate = moment(isoDate).format('YYYY, MMMM D, HH:mm:ss');
    return <div>{formattedDate}</div>;
  };

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    NewsAcqurieByURLIDAPI(id)
    .then(res => {
    setNewsItem(res.data.data);
    })
    .catch(error => console.error('Error fetching news:', error));
  }, [id]);

  if (!newsItem) return <div style={{textAlign:"center", marginTop:"30vh"}}><Spin/></div>;

  return (
    <div style={{width: `${width * 0.50}px`, marginTop:"20px",backgroundColor:"white", padding:`${width * 0.01}px`,marginLeft:"auto",marginRight:"auto", boxShadow:"0px 4px 8px rgba(0,0,0,0.1)"}}>
        <div style={{fontSize:"30px",fontWeight:"bold",marginBottom:"5px"}}>{newsItem.Subject}</div>
        <div style={{color:"gray",fontSize:"15px",marginBottom:"10px"}}> {DateFormatter(newsItem.CreatedTime)}</div>
        <div style={{fontSize:"18px",marginBottom:"10px"}}>{newsItem.Abstract}</div>
        <img width={`${width * 0.4}px`} style={{marginLeft:`${width * 0.04}px`}} alt="logo" src={`data:image/jpeg;base64,${newsItem.Figure}`}/> 
        <div style={{fontSize:"18px",marginTop:"10px"}}>{newsItem.Introduction}</div>
    </div>
  );
};
export default NewsDetail;
