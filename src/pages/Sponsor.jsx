import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {PhoneFilled,MessageFilled} from '@ant-design/icons';
import total from '../images/total.png';
import {Divider} from 'antd'

const LT = (language, ChineseSentence, EnglishSentence) => {
  let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
  return dictionary[language]
}

export default function Sponsor() {
  const lg = useSelector((state) => state.language.language);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
      setWidth(window.innerWidth);
    }, []);

  const head = {fontSize:20,fontWeight:"bolder",margin:"5px 5px"}
  const content = {fontSize:15, }
  return <div style={{marginTop:"30px",marginLeft:"auto",marginRight:"auto"}}>
    <Divider style={{fontSize:25,fontWeight:"bolder",textAlign:"center",margin:"10px 10px"}}>🌟 {LT(lg,'大健康产业来袭 — 加入国际大健康产业园','Big health industry coming - Join the World Health Park')} 🌟</Divider>
    <div style={{display:"flex"}}>
      <img  src={total} alt="" width={`${width * 0.40}px`} style={{marginLeft:`${width * 0.05}px`}}/>
      <div style={{width:`${width * 0.40}px`,marginTop:"10px"}}>
      {
        lg=='Chinese'?
        <>
          <div style={head}>🔍 为什么选择国际大健康产业园？</div>
          <ul>
            <li>创新中心：集聚先进的生物科技、健康管理、医疗设备及药品研发的顶尖企业和研究机构。</li>
            <li>投资热点：重点支持，资本密集，高新技术企业的汇聚地。</li>
            <li>全球网络：连接全球健康产业的桥梁，提供无限商业机会和国际合作平台。</li>
            <li>生态环境：优美的自然环境与先进的城市规划相结合，为从业者和访客提供健康、舒适的生活和工作环境。</li>
          </ul>
          <div style={head}>🏆 我们正在寻找：</div>
            <ul><li><div>投资者、创业者、科研人员、医疗专家等，无论你是刚起步的创业者还是行业巨头，只要对健康产业有激情和愿景，这里都是你的舞台。</div></li></ul>
          <div style={head}>📅 行动起来！</div>
            <ul><li><div>来探索、加入、共创未来！国际大健康产业园等待您的光临，让我们携手共创一个健康、繁荣的未来。</div></li></ul>
          <div style={head}>🌐 联系方式：</div>
            <ul>
              <li><div style={content}><PhoneFilled />手机号：<span style={{color:"darkred"}}>13756691617</span></div></li>
              <li> <div style={content}><MessageFilled />邮箱：<span style={{color:"darkred"}}>gjdjkcyy@163.com</span></div></li>
            </ul>
          <div style={head}>🛡️ 温馨提示-免责声明：</div>
            <ul><li>请各位用户，仔细阅读相关免责声明，具体细节如附件所示：<a href='api/user/declare_chinese/'>国际大健康产业园免责声明.pdf</a></li></ul>      
        </>
        :
        <>
          <div style={head}>🔍 Why Choose International Health Industry Park?</div>
          <ul>
            <li>Innovation Hub: Home to top-tier enterprises and research institutions in biotechnology, health management, medical devices, and pharmaceutical development.</li>
            <li>Investment Hotspot: Strongly supported, capital-intensive, a convergence point for high-tech companies.</li>
            <li>Global Network: A bridge connecting the global health industry, offering limitless business opportunities and international collaboration platforms.</li>
            <li>Eco Environment: Beautiful natural surroundings combined with advanced urban planning, providing a healthy and comfortable living and working environment for practitioners and visitors.</li>
          </ul>
          <div style={head}>🏆 We Are Looking For:</div>
            <ul>
              <li>
                <div>Investors, entrepreneurs, researchers, medical experts, and more. Whether you are a startup or an industry giant, if you are passionate and visionary about the health industry, this is your stage.</div>
              </li>
            </ul>
          <div style={head}>📅 Take Action!</div>
            <ul>
              <li>
                <div>Come to explore, join, and co-create the future! The International Health Industry Park awaits your visit, let us collaborate to forge a healthy, prosperous future.</div>
              </li>
            </ul>
          <div style={head}>🌐 Contact Information:</div>
            <ul>
              <li><div style={content}><PhoneFilled /> Phone Number: <span style={{color:"darkred"}}>13756691617</span></div></li>
              <li> <div style={content}><MessageFilled /> Email: <span style={{color:"darkred"}}>gjdjkcyy@163.com</span></div></li>
            </ul>
          <div style={head}>🛡️ Friendly Reminder - Disclaimer:</div>
            <ul><li>Please carefully read the relevant disclaimers, details as per the attachment: <a href='api/user/declare_english/'>International Health Industry Park Disclaimer.pdf</a></li></ul>
        </>
      }
      </div>
    </div>
    <Divider style={{...head,textAlign:"center"}}>{LT(lg,'国际大健康产业园 — 您事业成功的加速器！','International Health Industrial Park - the accelerator of your success!')}</Divider>
  </div>
}







// 🌟 大健康产业来袭 — 加入国际大健康产业园 🌟

// 在这个快速发展的时代，健康已成为我们每个人最关心的话题。国际大健康产业园作为一个引领未来的健康产业集群，致力于将科技创新与健康生活方式无缝结合。我们的目标是创造一个多元化的健康生态系统，集结全球资源，推动健康科技和可持续发展的新高潮。

// 🔍 为什么选择国际大健康产业园？

// 创新中心：集聚先进的生物科技、健康管理、医疗设备及药品研发的顶尖企业和研究机构。
// 投资热点：政府重点支持，资本密集，高新技术企业的汇聚地。
// 全球网络：连接全球健康产业的桥梁，提供无限商业机会和国际合作平台。
// 生态环境：优美的自然环境与先进的城市规划相结合，为从业者和访客提供健康、舒适的生活和工作环境。
// 🌐 加入我们，你将获得：

// 接触国际健康产业的前沿技术和产品。
// 多维度的资源整合能力，包括资金、技术、市场及人才。
// 强大的业务支持和高效的服务体系，助力企业快速成长。
// 开放的创新环境，与同行业的领袖一起工作，共同推动健康产业的未来。
// 🏆 我们正在寻找：

// 投资者、创业者、科研人员、医疗专家等，无论你是刚起步的创业者还是行业巨头，只要对健康产业有激情和愿景，这里都是你的舞台。
// 📅 行动起来！
// 来探索、加入、共创未来！国际大健康产业园等待您的光临，让我们携手共创一个健康、繁荣的未来。