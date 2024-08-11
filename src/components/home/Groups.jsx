import React, { useState,useEffect } from 'react'
import {Row,Col} from 'antd'
import { Link } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import FoodAgriculture from '../../images/Group/FoodAgriculture.png';
import MedicalDevice from '../../images/Group/MedicalDevice.png';
import WesternMedicine from '../../images/Group/WesternMedicine_.png';
import TCM from '../../images/Group/TCM.png';
import HealthCare from '../../images/Group/HealthCare.png';
import Cosmetic from '../../images/Group/Cosmetic.png';

const LT = (language, ChineseSentence, EnglishSentence) => {
  let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
  return dictionary[language]
}

const HoverDiv = ({ text, isActive, height }) => {
  return (
    <div>
      <style>
        {`
          .hoverEffect {
            height: ${height / 6}px;
            line-height: ${height / 6}px;
            border: 1px solid gray;
            font-size: 20px;
            text-align: center;
            background-color: #1a1a1a;
            transition: background-color 0.3s;
          }
          .hoverEffect:hover,
          .hoverEffect.active {
            background-color: gray;
          }
        `}
      </style>
      <div className={`hoverEffect ${isActive ? 'active' : ''}`}>
        {text}
      </div>
    </div>
  );
};

//1063*671
export default function Groups() {
  const [currentKey, setCurrentKey] = useState('1')
  const [width, setWidth] = useState(window.innerWidth);
  const lg = useSelector((state) => state.language.language);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const Img = (img, title, description) => {
    return <div style={{display:"inline-block", textAlign:"center", backgroundImage: `url(${img})`, width:`${width * 0.56}px`, height:`${width * 0.353}px`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center',}}>
        <div style={{marginTop:`${width * 0.22}px`, fontSize:"20px", fontWeight:"bold"}}><span style={{backgroundColor:'rgba(0,0,0,0.5)', padding:'10px'}}>
          {title}
        </span></div>
        <div style={{marginTop:`${width * 0.01}px`,lineHeight:"40px", width:"80%", marginLeft:"10%"}}><span style={{backgroundColor:'rgba(0,0,0,0.5)', padding:'10px',}}>
          {description}
        </span></div>
    </div>
  }

  const Imgs = ({currentKey}) => {
    let img
    switch (currentKey) {
      case '1':
        img = Img(FoodAgriculture,LT(lg, '食品和农产品', 'Food and Agricultural Products'),LT(lg, '通过营养推广健康，食品和农产品专注于提供天然、健康的食品选择，支持可持续农业发展，确保消费者能够享受到高质量、营养丰富的食品', 'Promoting health through nutrition, Food and Agricultural Products focus on providing natural, healthy food choices, supporting sustainable agricultural development, and ensuring consumers enjoy high quality, nutritious food'));
        break;
      case '2':
        img = Img(MedicalDevice,LT(lg, '医疗器械', 'Medical Devices'),LT(lg, '引领科技革新，医疗器械领域致力于开发和推广先进的医疗技术和设备，提高诊断和治疗的效率和精确性，为全球患者带来更好的医疗体验', 'Leading technological innovation, the field of medical devices is committed to developing and promoting advanced medical technologies and equipment, improving the efficiency and accuracy of diagnostics and treatments, and bringing better medical experiences to patients worldwide'));
        break;
      case '3':
        img = Img(WesternMedicine,LT(lg, '西医西药', 'Western Medicine and Pharmaceuticals'),LT(lg, '基于严格的科学研究，西医西药提供了一系列经过验证的治疗方案和药物，致力于治疗各种现代疾病，保障人类健康', 'Based on rigorous scientific research, Western medicine and pharmaceuticals offer a range of validated treatment plans and drugs, dedicated to treating various modern diseases and ensuring human health'));
        break;
      case '4':
        img = Img(TCM,LT(lg, '中医中药', 'Traditional Chinese Medicine'),LT(lg, '承传千年智慧，中医中药是我们连接传统与现代的桥梁。通过现代科学技术验证和提升传统治疗方法的有效性，我们致力于将中医中药推广到全世界', 'Carrying a thousand years of wisdom, Traditional Chinese Medicine serves as a bridge between tradition and modernity. Through the validation and enhancement of traditional treatments with modern science and technology, we are committed to promoting Traditional Chinese Medicine worldwide'));
        break;
      case '5':
        img = Img(HealthCare,LT(lg, '健康服务管理', 'Health Service Management'),LT(lg, '优化健康管理流程和服务，健康服务管理团队使用先进的信息技术和管理理念，提升医疗服务质量和效率，确保患者获得最佳的健康管理', 'Optimizing health management processes and services, the Health Service Management team employs advanced information technology and management concepts to enhance the quality and efficiency of medical services, ensuring patients receive the best health management'));
        break;
      case '6':
        img = Img(Cosmetic,LT(lg, '医美和化妆品', 'Medical Aesthetics and Cosmetics'),LT(lg, '美丽与健康并重，医美与化妆品领域结合最新科研成果和美容技术，为顾客提供安全、有效的美容和护肤解决方案，提升生活品质', 'Balancing beauty and health, the field of Medical Aesthetics and Cosmetics combines the latest scientific research and beauty techniques to provide customers with safe and effective beauty and skincare solutions, enhancing quality of life'));
        break;
      default:
        img = "None";
    }
    return img
  }
  console.log(`${width * 0.35}px`)
  return (<div style={{backgroundColor:"#001529",color:"white"}}>
  <div style={{fontSize:"30px",fontWeight:"bolder", textAlign:"center", marginBottom:"20px", }}>{LT(lg,'丰富的健康产业发展迅猛',' Abundant health industry is growing rapidly')}</div>
  <div style={{marginLeft:"auto",marginRight:"auto",width:`${width*0.94}px`, marginTop:"40px"}}>
    {/* <img src={Cosmetic} style={{display:"inline-block",width:`${width * 0.56}px`, marginRight:`${width * 0.01}px`, verticalAlign: 'top'}}/> */}
    <Imgs currentKey={currentKey}/>
    <div style={{display:"inline-block",width:`${width * 0.34}px`, marginLeft:`${width * 0.02}px`, verticalAlign: 'top'}}>
      <div onClick={()=>{setCurrentKey('1')}}><HoverDiv text={LT(lg, '食品和农产品', 'Food and Agriculture')} isActive={currentKey === '1'} height={width * 0.35}/></div>
      <div onClick={()=>{setCurrentKey('2')}}><HoverDiv text={LT(lg,'医疗器械', 'Medical Devices')} isActive={currentKey === '2'}/></div>
      <div onClick={()=>{setCurrentKey('3')}}><HoverDiv text={LT(lg,'西医西药', 'Western Medicine')} isActive={currentKey === '3'}/></div>
      <div onClick={()=>{setCurrentKey('4')}}><HoverDiv text={LT(lg,'中医中药', 'Traditional Chinese Medicine')} isActive={currentKey === '4'}/></div>
      <div onClick={()=>{setCurrentKey('5')}}><HoverDiv text={LT(lg,'健康服务管理', 'Health Services Management')} isActive={currentKey === '5'}/></div>
      <div onClick={()=>{setCurrentKey('6')}}><HoverDiv text={LT(lg,'医美和化妆品', 'Medical Aesthetics and Cosmetics')} isActive={currentKey === '6'}/></div>
    </div>
  </div>
  </div>
  )
}

