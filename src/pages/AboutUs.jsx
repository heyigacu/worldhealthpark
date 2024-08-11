import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {PhoneFilled,MessageFilled} from '@ant-design/icons';
import aboutus0 from '../images/aboutus/aboutus0.png';
import aboutus1 from '../images/aboutus/aboutus1.png';
import {Divider} from 'antd'

const LT = (language, ChineseSentence, EnglishSentence) => {
  let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
  return dictionary[language]
}


export default function AboutUs() {
  const lg = useSelector((state) => state.language.language);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
      setWidth(window.innerWidth);
    }, []);

    
  return <>{
    lg=='Chinese'?
    <div style={{marginLeft:"auto",marginRight:"auto",width:`${width*0.6}px`,marginTop:"40px"}}>
      <div style={{display:"flex",alignItems:"center"}}>
        <div ><img src={aboutus0} width={`${width*0.30}`} alt=""/></div>
        <div style={{padding:"10px"}}>
          <span style={{fontSize:25,fontWeight:"bolder",}}>平台定位 </span>
          根据大健康产业群体提供商品位，多元化资源共享得公司品牌化集合地，打造集食品农产品、医药、益鸟器械、健康服务管理和医美化妆品等内容为一体，全面与国际性得大健康产业服务平台。
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{padding:"10px"}}>
          <span style={{fontSize:25,fontWeight:"bolder"}}>平台价值 </span>
          国际健康产业园网站的平台价值主要集中在提升健康产业的整合、创新和全球合作。作为一个集中的信息和资源交换平台，它旨在支持和推动健康产业的发展，为参与者提供多样的利益和机遇。
        </div>
        <div ><img src={aboutus1} width={`${width*0.30}`} alt=""/></div>
      </div>          
    </div>
    :
    <div style={{marginLeft:"auto", marginRight:"auto", width:`${width*0.6}px`, marginTop:"40px"}}>
    <div style={{display:"flex", alignItems:"center"}}>
      <div><img src={aboutus0} width={`${width*0.30}`} alt=""/></div>
      <div style={{padding:"10px"}}>
        <span style={{fontSize:25, fontWeight:"bolder"}}>Platform Positioning </span>
        Positioned as a branded aggregation site for the big health industry, offering product spaces and diversified resource sharing. It is designed to be a comprehensive international health industry service platform, integrating food and agricultural products, pharmaceuticals, beneficial bird devices, health service management, and aesthetic cosmetics.
      </div>
    </div>

    <div style={{display:"flex", alignItems:"center"}}>
      <div style={{padding:"10px"}}>
        <span style={{fontSize:25, fontWeight:"bolder"}}>Platform Value </span>
        The platform value of the International Health Industry Park website primarily focuses on enhancing the integration, innovation, and global cooperation of the health industry. As a centralized platform for information and resource exchange, it aims to support and promote the development of the health industry, providing diverse benefits and opportunities for its participants.
      </div>
      <div><img src={aboutus1} width={`${width*0.30}`} alt=""/></div>
    </div>          
  </div>
}</>
}


