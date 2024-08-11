
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'

const header_background_color = "#001529"
const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
}

const LoginLOGO = (props) =>{
    const navigate = useNavigate()
    const language = useSelector((state)=>state.language.language);
    return <>{
        useSelector((state)=>state.user.isLoggedIn)
        ?
        <UserOutlined onClick={()=>{navigate('/manage/')} } style={{color:"white", marginLeft:20, fontSize:20}} />
        :
        <Button style={{backgroundColor:header_background_color, color:"white", marginLeft:"15px"}} onClick={()=>{props.setLoginFlowOpen(true)}}>
            {LT(language,'登录','Login')}
        </Button>
    }</>
}

export default LoginLOGO;