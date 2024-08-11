

import React from 'react'
import homepage_pic from '../../images/home/homepage2040719_.jpeg';
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'
import { RightCircleOutlined } from '@ant-design/icons';

const LanguageTransform=(language, dictionary)=>{
  return dictionary[language]
}

export default function Homepage() {
  const navigate = useNavigate()
  const language = useSelector((state)=>state.language.language);
  console.log(language)
  return (
    <div style={{textAlign:"center", backgroundImage:`url(${homepage_pic})`, height:'100vh', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center',}}>
        <div style={{height:"40vh"}}></div>
        <div style={{fontSize:"50px",fontWeight:"bolder",color:"white"}}>
          <span style={{display:"inline-block", backgroundColor:'rgba(0,0,0,0.5)', padding:'10px',}}>
            {LanguageTransform(language, {'Chinese':'欢迎来到国际大健康产业园', 'English':'Welcome to the World Health Industry Park'})}
          </span>
        </div>
        <div style={{fontSize:"30px",fontWeight:"bold",color:"white", marginTop:"10px"}}>
          <span onClick={()=>navigate('/exhibit')} style={{backgroundColor:'rgba(0,0,0,0.5)', padding:'10px',}}>
            {LanguageTransform(language, {'Chinese':'探索', 'English':'Explore'})} <Link to={'/exhibit'}><RightCircleOutlined /></Link>
          </span>
        </div>
    </div>
  )
}
