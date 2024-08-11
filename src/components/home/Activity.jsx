import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {LeftOutlined,RightOutlined,DownCircleFilled} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NewsesAcqurieByNAPI } from '../../apis/news'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const DateFormatter = ({ isoDate }) => {
    const formattedDate = moment(isoDate).format('MMMM D, YYYY, HH:mm:ss');
    return <div>{formattedDate}</div>;
  };


const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
  }

export default function Activity() {
    const lg = useSelector((state) => state.language.language);
    const [newsesData,setNewsesData] = useState([])
    const [width, setWidth] = useState(window.innerWidth);
    const [isLeftHovering, setIsLeftHovering] = useState(false);
    const [isRightHovering, setIsRightHovering] = useState(false);
    const [currentKey, setCurrentKey] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        setWidth(window.innerWidth);
      }, []);
    
    useEffect(()=>{
        NewsesAcqurieByNAPI({Number:5})
        .then(response=> { 
            console.log(response.data.data[0])
            setNewsesData(response.data.data)
        }).catch(error=>console.log(error));
    },[])


return(<div style={{backgroundColor:"#001529",color:"white",paddingTop:"50px"}}>
    <div style={{textAlign:"center",fontSize:"30px",fontWeight:"bold", marginBottom:"30px"}}>{LT(lg,'最新动态','Latest News')}</div>
    <div style={{marginLeft:"auto",marginRight:"auto",width:`${width*0.9}px`}}>
        {
            newsesData[currentKey] &&
            <div style={{display:'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', 
                width:`${width * 0.88}px`, height:`${width * 0.353}px`, 
                backgroundImage: `url(data:image/jpeg;base64,${newsesData[currentKey].Figure})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center',}}>
                <div style={{backgroundColor:'rgba(0,0,0,0.5)',  width:'100%', textAlign:'center', padding:'15px 0'}}>
                    <div style={{color:"white",fontSize:"25px",marginBottom:"5px"}}>{newsesData[currentKey].Subject}</div>
                    <div style={{color:"gray",marginBottom:"5px"}}>{newsesData[currentKey].Time}</div>
                    <div style={{color:"white",fontSize:"15px"}}>{newsesData[currentKey].Abstract}</div>
                </div>
                {
                    currentKey>0 &&
                    <LeftOutlined style={{backgroundColor:isLeftHovering?'white':'rgba(0,0,0,0.5)', color:isLeftHovering?'rgba(0,0,0,0.5)':'white', fontSize:"30px", padding:"10px", position: 'absolute', left: '10px',  top: '50%', transform: 'translateY(-50%)'}} 
                        onMouseEnter={() => setIsLeftHovering(true)}
                        onMouseLeave={() => setIsLeftHovering(false)}
                        onClick={()=>{if(currentKey>0){setCurrentKey(currentKey-1)};setIsLeftHovering(false)}}
                    /> 
                }
                {
                    currentKey<(newsesData.length-1) &&
                    <RightOutlined style={{backgroundColor:isRightHovering?'white':'rgba(0,0,0,0.5)', color:isRightHovering?'rgba(0,0,0,0.5)':'white', fontSize:"30px", padding:"10px",position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)'}} 
                    onMouseEnter={() => setIsRightHovering(true)}
                    onMouseLeave={() => setIsRightHovering(false)}
                    onClick={()=>{if(currentKey<(newsesData.length-1)){setCurrentKey(currentKey+1)};setIsRightHovering(false)}}
                    />
                }
            </div>
        }
    </div>
    <div onClick={()=>{navigate('/news')}} style={{textAlign:"center",fontSize:"20px",fontWeight:"bold", marginTop:"15px"}}>{LT(lg,'更多','More') } <DownCircleFilled /></div>
  </div>
);
}





