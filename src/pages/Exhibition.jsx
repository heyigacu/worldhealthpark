


import React from "react"
import { useState } from "react";
import { AppstoreOutlined, DiscordOutlined, HeartOutlined, MedicineBoxOutlined, SettingOutlined, RocketOutlined, FireOutlined, DownOutlined,
  HomeOutlined, UserOutlined,FilterOutlined, WeiboOutlined,WechatOutlined,TwitterOutlined,FacebookOutlined,  } from '@ant-design/icons';
import { Layout, Menu, ConfigProvider, Button, Dropdown, Radio } from 'antd';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import food from '../images/exhibition/food.png';
import agriculture from '../images/exhibition/agriculture.png';
import PharmaceuticalReagent from '../images/exhibition/PharmaceuticalReagent.png';

import SmallMediumMedicalEquipmentCompany from '../images/exhibition/SmallMediumMedicalEquipmentCompany.png';
import LargeMedicalEquipmentCompany from '../images/exhibition/LargeMedicalEquipmentCompany.png';
import TCMPlantBase from '../images/exhibition/TCMPlantBase.png';
import TCM from '../images/exhibition/TCM.png';
import TCMDoctor from '../images/exhibition/TCMDoctor.png';

import medicine from '../images/exhibition/medicine.png';
import Biopharmaceuticals from '../images/exhibition/Biopharmaceuticals.png';
import WesternHospitals from '../images/exhibition/WesternHospitals.png';

import HealthManagementConsulting from '../images/exhibition/HealthManagementConsulting.png';
import HealthExamination from '../images/exhibition/HealthExamination.png';
import HealthCareServiceAgencies from '../images/exhibition/HealthCareServiceAgencies.png';

import CosmeticsCompany from '../images/exhibition/CosmeticsCompany.png';
import MedicalAestheticClinics from '../images/exhibition/MedicalAestheticClinics.png';
import MedicalAestheticProducts from '../images/exhibition/MedicalAestheticProducts.png';



import TableShow from '../components/exhibition/TableShow'
import ListShow from '../components/exhibition/ListShow'


const { Header,Content,Footer,Sider } = Layout;

const LT=(language, ChineseSentence, EnglishSentence)=>{
  let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
  return dictionary[language]
}

export default function Exhibition() {
  const lg = useSelector((state) => state.language.language);
  const [currentKey, setCurrentKey] = useState('1')
  const [ListTable, setListTable] = useState('list')

  const items = [
    { label: LT(lg, '食品和农产品', 'Food and Agriculture'), key:'foodagriculture', icon:<DiscordOutlined />, children: [
          { label: LT(lg, '食品公司', 'Food Company'), key:'1' },
          { label: LT(lg, '农产品公司', 'Agricultural Company'), key:'2' },
    ]},
    { label: LT(lg, '医疗器械', 'Medical Devices'), key:'medicaldevice', icon:<SettingOutlined />, children: [
      { label: LT(lg, '医药试剂公司', 'Pharmaceutical Reagent Company'), key:'3' },
      { label: LT(lg, '大型医疗仪器设备公司', 'Large Medical Equipment Company'), key:'4' },
      { label: LT(lg, '中小型医疗仪器设备公司', 'Small and Medium Medical Equipment Company'), key:'5' },
    ]},
    { label: LT(lg, '中医中药', 'Traditional Chinese Medicine'), key:'tcm', icon:<FireOutlined />, children: [
      { label: LT(lg, '中药产业园及种植基地', 'TCM Industrial Park and Plantation Base'), key:'6' },
      { label: LT(lg, '天然药物原生药材', 'Natural Medicine and Herbs'), key:'7' },
      { label: LT(lg, '中医院与名中医', 'TCM Hospitals and Famous TCM Doctors'), key:'8' },
    ]},
    { label: LT(lg, '西医西药', 'Western Medicine'), key:'wm', icon:<MedicineBoxOutlined />, children: [
      { label: LT(lg, '医药新特品种', 'New Pharmaceutical Varieties'), key:'9' },
      { label: LT(lg, '生物制药', 'Biopharmaceuticals'), key:'10' },
      { label: LT(lg, '西医院与名西医', 'Western Hospitals and Famous Doctors'), key:'11' },
    ]},
    { label: LT(lg, '健康服务管理', 'Health Service Management'), key:'health', icon:<HeartOutlined />, children: [
      { label: LT(lg, '健康管理咨询机构', 'Health Management Consulting Agencies'), key:'12' },
      { label: LT(lg, '健康体检中心', 'Health Examination Centers'), key:'13' },
      { label: LT(lg, '健康护理服务机构', 'Health Care Service Agencies'), key:'14' },
    ]},
    { label: LT(lg, '医美与化妆品', 'Medical Aesthetics and Cosmetics'), key:'aestheticsmakeup', icon:<FilterOutlined />, children: [
      { label: LT(lg, '化妆品公司', 'Cosmetics Company'), key:'15' },
      { label: LT(lg, '医疗美容门诊机构', 'Medical Aesthetic Clinics'), key:'16' },
      { label: LT(lg, '医疗美容专用产品公司', 'Medical Aesthetic Products Company'), key:'17' },
    ]},
  ];


  const renderContent = (key) => {
    switch (key) {
      case '1':
        return <>
        <div style={{textAlign:"center"}}><img src={food} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '食品公司：这类公司专注于各种食品的生产与销售，从原材料的采购到成品的销售，确保食品的安全与质量。', 'Food Company: These companies specialize in the production and sale of various food items, ensuring safety and quality from raw material procurement to finished product sales.')}</div>
        </>
      case '2':
        return <>
        <div style={{textAlign:"center"}}><img src={agriculture} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '农业公司：农业公司负责种植、养殖和销售农产品，确保粮食和其他农产品的供应。这些公司运用现代农业技术，提高产量和质量，满足全球市场的需求。', 'Agricultural Company: Agricultural companies are responsible for growing, raising, and selling agricultural products, ensuring the supply of food and other farm products. These companies use modern agricultural techniques to improve yield and quality, meeting the demands of the global market.')}</div>
        </>
      case '3':
        return <>
        <div style={{textAlign:"center"}}><img src={PharmaceuticalReagent} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '医药试剂公司：专门从事医药试剂的生产与销售，为医药研发和临床使用提供必需的试剂产品。', 'Pharmaceutical Reagent Company: Specializing in the production and sale of pharmaceutical reagents, providing essential reagents for medical research and clinical use.')}</div>
        </>
      case '4':
        return <>
        <div style={{textAlign:"center"}}><img src={LargeMedicalEquipmentCompany} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '大型医疗仪器设备公司：这些公司生产和销售各种大型医疗设备，为医院和诊所提供先进的诊断和治疗工具。', 'Large Medical Equipment Company: These companies manufacture and sell various large medical devices, providing advanced diagnostic and treatment tools for hospitals and clinics.')}</div>
        </>
      case '5':
        return <>
        <div style={{textAlign:"center"}}><img src={SmallMediumMedicalEquipmentCompany} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '中小型医疗仪器设备公司：专注于中小型医疗设备的生产，为医疗机构提供多种设备选择，满足不同规模的需求。', 'Small and Medium Medical Equipment Company: Focused on producing small and medium-sized medical devices, offering a variety of equipment options to meet the needs of different scales of medical institutions.')}</div>
        </>
      case '6':
        return <>
        <div style={{textAlign:"center"}}><img src={TCMPlantBase} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '中药产业园及种植基地：这些基地专注于中药材的种植和中药产业的集约化发展，推动中药现代化。', 'TCM Industrial Park and Plantation Base: These bases focus on the cultivation of traditional Chinese medicinal materials and the intensive development of the TCM industry, promoting the modernization of TCM.')}</div>
        </>
      case '7':
        return <>
        <div style={{textAlign:"center"}}><img src={TCM} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '天然药物原生药材：提供各种天然药物和原生药材，为中药和自然疗法提供优质原料。', 'Natural Medicine and Herbs: Offering a variety of natural medicines and original herbs, providing high-quality raw materials for TCM and natural therapies.')}</div>
        </>
      case '8':
        return <>
        <div style={{textAlign:"center"}}><img src={TCMDoctor} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '中医院与名中医：这些医院和医生专门从事中医治疗，运用传统和现代技术为患者提供健康服务。', 'TCM Hospitals and Famous TCM Doctors: These hospitals and doctors specialize in TCM treatments, using traditional and modern techniques to provide health services to patients.')}</div>
        </>;
      case '9':
        return <>
        <div style={{textAlign:"center"}}><img src={medicine} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '医药新特品种：开发和推广新的医药品种，满足临床和市场的需求，推动医药创新。', 'New Pharmaceutical Varieties: Developing and promoting new pharmaceutical varieties to meet clinical and market needs, driving pharmaceutical innovation.')}</div>
        </>
      case '10':
        return <>
        <div style={{textAlign:"center"}}><img src={Biopharmaceuticals} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '生物制药：这些公司专注于生物制药的研究与生产，利用生物技术开发创新药物。', 'Biopharmaceuticals: These companies focus on the research and production of biopharmaceuticals, utilizing biotechnology to develop innovative drugs.')}</div>
        </>;
      case '11':
        return <>
        <div style={{textAlign:"center"}}><img src={WesternHospitals} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '西医院与名西医：提供西医诊疗服务的医院和知名医生，运用先进的医学技术和设备。', 'Western Hospitals and Famous Doctors: Hospitals and renowned doctors providing Western medical diagnostic and treatment services, using advanced medical technologies and equipment.')}</div>
        </>;
      case '12':
        return <>
        <div style={{textAlign:"center"}}><img src={HealthManagementConsulting} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '健康管理咨询机构：提供健康管理和咨询服务，帮助个人和企业提升健康水平和生活质量。', 'Health Management Consulting Agencies: Providing health management and consulting services to help individuals and businesses improve health levels and quality of life.')}</div>
        </>
      case '13':
        return <>
        <div style={{textAlign:"center"}}><img src={HealthExamination} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '健康体检中心：专门提供各种健康体检服务，帮助人们及时了解和管理健康状况。', 'Health Examination Centers: Specializing in providing various health examination services, helping people timely understand and manage their health status.')}</div>
        </>;
      case '14':
        return <>
        <div style={{textAlign:"center"}}><img src={HealthCareServiceAgencies} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '健康护理服务机构：提供健康护理和康复服务，支持个人的长期健康管理和恢复。', 'Health Care Service Agencies: Providing health care and rehabilitation services, supporting individuals in long-term health management and recovery.')}</div>
        </>;
      case '15':
        return <>
        <div style={{textAlign:"center"}}><img src={CosmeticsCompany} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '化妆品公司：这些公司生产和销售各种美容和护肤产品，满足消费者的美丽需求。', 'Cosmetics Company: These companies manufacture and sell various beauty and skincare products, meeting consumers\' beauty needs.')}</div>
        </>;
      case '16':
        return <>
        <div style={{textAlign:"center"}}><img src={MedicalAestheticClinics} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '医疗美容门诊机构：提供专业的医疗美容服务，包括手术和非手术美容项目。', 'Medical Aesthetic Clinics: Providing professional medical aesthetic services, including surgical and non-surgical beauty treatments.')}</div>
        </>;
      case '17':
        return <>
        <div style={{textAlign:"center"}}><img src={MedicalAestheticProducts} alt="Logo" width={"90%"}/></div>
        <div style={{textAlign:"center",marginTop:"5px", marginBottom:"10px"}}>{LT(lg, '医疗美容专用产品公司：生产专门用于医疗美容的产品，支持各种美容治疗和程序。', 'Medical Aesthetic Products Company: Producing products specifically for medical aesthetics, supporting various beauty treatments and procedures.')}</div>
        </>
      default:
        return LT(lg, '未找到相关内容。', 'No relevant content found.');
    }
  };

  return (
    <div>
      <>
          <Layout style={{minHeight: "calc(100vh - 131px)"}}>
              <Sider style={{ backgroundColor: "darkgray", }} width={'20%'}>
                  <ConfigProvider theme={{ components: { Menu: {darkItemBg:"gray", darkSubMenuItemBg:"darkgray"}, }, }}>
                      <Menu theme="dark" style={{height: '100%', borderRight: 0,}} mode="inline" defaultSelectedKeys={['1']} items={items}  onClick={(e)=>{setCurrentKey(e.key);console.log('current key:',e.key)}}/>
                  </ConfigProvider>
              </Sider>
              <Layout>
                  <Content style={{ backgroundColor: "white", padding: 30 }}>
                    {renderContent(currentKey)} 
                    <div >
                      {LT(lg,'展示：','show: ')}
                      <Radio.Group onChange={(e)=>{setListTable(e.target.value)}} defaultValue={'list'}>
                        <Radio value={'list'}>{LT(lg,'列表','list')}</Radio>
                        <Radio value={'table'}>{LT(lg,'表格','table')}</Radio>
                      </Radio.Group>
                    </div>
                    {
                      ListTable==='list'?
                      <ListShow currentKey={currentKey}/>
                      :
                      <TableShow currentKey={currentKey}/>
                    }
                  </Content>
              </Layout>
          </Layout>
      </>
    </div>
  )
}
  


  //{ label: <Link to='/exhibit'>展览展示</Link>, key: 'exhibit', icon:<UserOutlined /> },
//{ label: <a href={github_utl} target="_blank">Github</a>, key: 'github', icon: <GithubOutlined /> },
//{ label: <Link to='/sponsor'>征招赞助商和声明</Link>, key: 'sponsor', icon: <PlusCircleOutlined /> },
{/* <span style={{fontSize:"50px", fontWeight:"bolder", float:"right"}}>IHIP</span>
<span style={{fontWeight:"bolder", fontSize:"30px", color:"white"}}>国际大健康产业园</span>
<span style={{fontSize:"20px", color:"gray",float:"right"}}>
<WeiboOutlined style={{paddingLeft:"10px"}}/>
<WechatOutlined style={{paddingLeft:"10px"}}/>
<FacebookOutlined style={{paddingLeft:"10px"}}/>
<TwitterOutlined style={{paddingLeft:"10px"}}/>
<Search placeholder="search..." allowClear onSearch={()=>{}} style={{width:304, paddingLeft:"10px", float:"right", marginTop:"1.5vh"}}/>
</span> */}

