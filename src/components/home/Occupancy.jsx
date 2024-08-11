import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Divider, Steps } from 'antd';

import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { UsersCountAPI } from '../../apis/user'
import { CompanysCountAPI } from '../../apis/company'
import { SetCumulativeAccessAPI } from '../../apis/web'
import top from '../../images/occupancy/top.png';


const LT = (language, ChineseSentence, EnglishSentence) => {
  let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
  return dictionary[language]
}


export default function Occupancy() {
  const [width, setWidth] = useState(window.innerWidth);
  const [companysCount, setCompanysCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [accessCount, setAccessCount] = useState(0);
  const lg = useSelector((state) => state.language.language);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    SetCumulativeAccessAPI()
    .then(res=>{setAccessCount(res.data.data)})
    .catch(error=>console.log(error));
  }, []);

  useEffect(()=>{
      CompanysCountAPI()
      .then(response=> { 
        setCompanysCount(response.data.data)
      }).catch(error=>console.log(error));
      UsersCountAPI()
      .then(response=> { 
        setUsersCount(response.data.data)
      }).catch(error=>console.log(error));
  },[])

  const head = {color:"white",fontSize:"20px"}
  const detail = {color:"white",fontSize:"15px"}
  return (
    <div  style={{backgroundColor:"#001529",color:"white",paddingTop:"50px",paddingBottom:"50px"}}>
      <div style={{textAlign:"center",fontSize:"30px",fontWeight:"bold", marginBottom:"40px"}}>{LT(lg,'成就','Achievement')}</div>
      <div style={{marginLeft:"auto",marginRight:"auto",width:`${width*0.94}px`, marginTop:"40px", display:"flex",}}>
        <img src={top} style={{display:"inline-block", textAlign:"center", width:`${width * 0.375}px`, height:`${width * 0.40}px`, marginLeft:`${width * 0.125}px`}}/>
        <Steps direction="vertical" progressDot current={2} style={{color:"white",height:`${width * 0.40}px`,marginLeft:`${width * 0.125}px`}}
        items={[
          {
            title: <div style={head}>{LT(lg,'累积访问','Cumulative Access')}</div>,
            description: <div style={detail}>{LT(lg,`截至目前，WorldHealthPark累积${accessCount}次访问`,`So far, WorldHealthPark has reached ${accessCount} visits`)}</div>,
          },
          {
            title: <div style={head}>{LT(lg,'累积注册用户','Cumulative Registered Users')}</div>,
            description: <div style={detail}>{LT(lg,`截至目前，WorldHealthPark累积${usersCount}位注册用户`,`So far, WorldHealthPark has reached ${usersCount} registered users`)}</div>,
          },
          {
            title: <div style={head}>{LT(lg,'累积入驻公司','Cumulative Settled Companies')}</div>,
            description: <div style={detail}>{LT(lg,`截至目前，WorldHealthPark累积${companysCount}家公司入驻`,`So far, WorldHealthPark has reached ${companysCount} settled companies`)}</div>,
          },
        ]}
        />
    </div>
    </div>
  )
}










