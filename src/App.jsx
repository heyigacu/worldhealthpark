
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setLanguage } from './reduxs/languageSlice';
import { AppstoreOutlined, RocketOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, ConfigProvider, Button, Dropdown, } from 'antd';

import LoginLOGO from './components/login/LoginLOGO';
import LoginFlow from './components/login/LoginFlow';

const { Header,Content,Footer,Sider } = Layout;

const header_background_color = "#001529"
const content_background_color =  "#edeff7"
const font_color = "#112264"

const cn_items = [
  { label: <Link to='/exhibit'>健康产业展览</Link>, key:'exhibit', icon:<AppstoreOutlined /> },
  { label: <Link to='/news'>新闻</Link>, key:'news', icon:<AppstoreOutlined /> },
  { label: <Link to='/sponsor'>征招赞助商和声明</Link>, key:'sponsor', icon: <RocketOutlined /> },
  { label: <Link to='/aboutus'>关于我们</Link>, key:'aboutus', icon: <HomeOutlined /> },
]

const en_items = [
  { label: <Link to='/exhibit'>Health Industry</Link>, key:'exhibit', icon:<AppstoreOutlined /> },
  { label: <Link to='/news'>News</Link>, key:'news', icon:<AppstoreOutlined /> },
  { label: <Link to='/sponsor'>Sponsorship Support</Link>, key:'sponsor', icon:<RocketOutlined /> },
  { label: <Link to='/aboutus'>About Us</Link>, key:'aboutus', icon:<HomeOutlined /> },
]

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFlowOpen, setLoginFlowOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(cn_items);
  const language = useSelector((state)=>state.language.language);
  const LanguageCheck = (string, language) => {return language===string?' √':''};

  const Language = () => {
    const items = [{key:'Chinese', label:'中文'+LanguageCheck('Chinese',language),  onClick:()=>{dispatch(setLanguage('Chinese'));setMenuItems(cn_items)}}, 
                   {key:'English', label:'English'+LanguageCheck('English',language), onClick:()=>{dispatch(setLanguage('English'));setMenuItems(en_items)}},]
    return <Dropdown menu={{items}} placement="bottom"><Button style={{backgroundColor:header_background_color, color:"white"}}>语言/Language<DownOutlined /></Button></Dropdown>
  };

  return (
      <Layout style={{display:"flex",flexDirection:"column", minHeight:"100vh"}}>
        <Header style={{display:'flex',alignItems:'center'}}>
          <a style={{color:"white",fontSize:"20px",fontWeight:"bold",marginRight:"50px"}} onClick={()=>{navigate('/')}}>WorldHealthPark</a>
          <ConfigProvider theme={{ components: {Menu:{iconSize:20, iconMarginInlineEnd:"8px", itemMarginBlock:"10", itemMarginInline:"0", itemPaddingInline:"10px"}}}}> 
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]} items={menuItems} style={{flex:1,minWidth:50,fontSize:15,fontWeight:"bold",}}/>
          </ConfigProvider>
          <Language/>
          <LoginLOGO setLoginFlowOpen={setLoginFlowOpen}/>
        </Header>
        <Layout>
          <Content style={{backgroundColor:"white", flex:1}}>
            <Outlet />
            <LoginFlow loginFlowOpen={loginFlowOpen} setLoginFlowOpen={setLoginFlowOpen} />
          </Content>
        </Layout>
        <Footer style={{textAlign:"center"}}>WorldHealthPark©2024</Footer>
      </Layout>
  )
};

export default App;




