import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Upload, message, Spin, Row, Col, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { NewsAcqurieByIDAPI, NewsUpdateAPI } from '../../../apis/news'
import { UploadOutlined, LoadingOutlined }  from '@ant-design/icons';
import dayjs from 'dayjs';

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }

const UpdateNews = (props) =>{
    const [useUpdateNewsForm] = Form.useForm();
    const [updateNewsForm, setUpdateNewsForm] = useState([]); 
    const [submitLoading, setSubmitLoading] = useState(false);
    const [figureList, setFigureList] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false)
    const [useEffectData, setUseEffectData] = useState()
    const MAX_FIGURE_SIZE = 5
    const lg = useSelector((state)=>state.language.language);

    useEffect(()=>{
        setRequestLoading(true)
        NewsAcqurieByIDAPI(props.updateNewsInfo.UpdateNewsID)
        .then(response=> { 
            if(response.data.code==200){
                setUseEffectData(response.data.data)
                useUpdateNewsForm.setFieldsValue(
                    {   
                        Subject:response.data.data.Subject,
                        // Time:moment(response.data.data.Time, ),
                        Time:dayjs(response.data.data.Time,"YYYY-MM-DD"),
                        Abstract:response.data.data.Abstract,
                        Introduction:response.data.data.Introduction,                        
                    }
                )
                setUpdateNewsForm(
                    {  
                        Subject:response.data.data.Subject,
                        Time:response.data.data.Time,
                        Abstract:response.data.data.Abstract,
                        Introduction:response.data.data.Introduction,                      
                    }
                )

                setRequestLoading(false)
            }else{}
        }).catch(error=> {
            console.log()
        });
    },[])

    const FigureProps = {
        beforeUpload: (file, fileList) => {
          const fileType = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();  
          if (fileType !== '.png' && fileType !== '.jpg') {
              message.error(LT(lg, '请上传png或jpg格式', 'Please upload png or jpg format'))
              const index = fileList.indexOf(file)
              fileList.splice(index, 0);
              return false
          }     
          const islt5M =  file.size / 1024 / 1024 < MAX_FIGURE_SIZE;
          if (!islt5M) {
              message.error(LT(lg, `图片大小应该小于${MAX_FIGURE_SIZE}MB`, `The image size should be less than ${MAX_FIGURE_SIZE}MB`))
              const index = fileList.indexOf(file)
              fileList.splice(index, 0)
              return false
          }
        },
        action:'/api/news/upload_figure/',
        onChange: (info) => {
          let newFileList = [...info.fileList];
          newFileList = newFileList.slice(-1);
          setFigureList(newFileList);
          newFileList = newFileList.map((file) => {
            if(file.response){
              if(file.response.code == 200){
                setUpdateNewsForm({...updateNewsForm,Figure:file.response.data})
                message.success(LT(lg, '上传成功', 'Upload successful'))
              }else{message.error(file.response.message)}
            }
            return file;
          });
        },
      };
    const onUpdateNewsFinish = (values) => {
        setSubmitLoading(true)
        NewsUpdateAPI({...updateNewsForm, UserName:props.user.UserName,id:useEffectData.id})
        .then(response=> { 
            if(response.data.code==200){
                setSubmitLoading(false)
                message.success(LT(lg, '新闻信息修改成功', 'News information successfully updated'))
                props.setUpdateNewsInfo({...props.updateNewsInfo,UpdateNewsInfoOpen:false})
            }else{}
        }).catch(error=> {
            message.error(LT(lg, '新闻信息修改失败', 'News information update failed'))
            console.log(error)
        });
        setTimeout(()=>{
            setSubmitLoading(false)
        }, 1000)
    };
    console.log(updateNewsForm)
    return <Modal title={null} width={1200} open={props.updateNewsInfo.UpdateNewsInfoOpen} onCancel={()=>{props.setUpdateNewsInfo({...props.updateNewsInfo, UpdateNewsInfoOpen:false})}} footer={null} okText={false} cancelText={false} >
        {requestLoading?
        <div>Loading</div>
        :<Form name="basic" form={useUpdateNewsForm} style={{textAlign:'center'}} labelCol={{span:5,}}  wrapperCol={{span:15,}} initialValues={{remember: true,}} onFinish={onUpdateNewsFinish} autoComplete="off">
            <Form.Item wrapperCol={{offset:0}}>
                <div style={{fontSize:20,fontWeight:"bolder"}} onClick={()=>{}}>{LT(lg, '修改新闻', 'Update News')}</div>
            </Form.Item>
            <Form.Item label={LT(lg, '主题', 'Subject')} name="Subject" rules={[{type:'string',max:50,min:1,message:LT(lg, '新闻主题长度为2-50', 'News subject length should be 2-50')},{required:true, message:LT(lg, '请输入新闻主题', 'Please enter the news subject')},]}>          
                <Input onChange={(e)=>setUpdateNewsForm({ ...updateNewsForm,Subject:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg, '图片', 'Image')} name="Figure" rules={[{required:false,}]}>
                {(useEffectData==undefined||useEffectData.Figure==undefined)?
                <Upload {...FigureProps} fileList={figureList} >
                    <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                </Upload>
                :
                <Row>
                    <Col span={12} style={{textAlign:"center"}}>
                        <img style={{width:"40%"}} src={`data:image/png;base64,${useEffectData.Figure}`} alt=""/>
                        <div>{LT(lg, '原始图片', 'Original Image')}</div>
                    </Col>
                    <Col span={12} style={{textAlign:"center"}}>
                        <Upload {...FigureProps} fileList={figureList} >
                            <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                        </Upload>
                        <div>{LT(lg, '上传新的图片', 'Upload new image')}</div>
                    </Col>
                </Row>
                }
            </Form.Item>
            <Form.Item label={LT(lg, '时间', 'Time')} name="Time" rules={[{required:false, message:LT(lg, '请输入活动时间!', 'Please enter the event time!')}]} >
                <DatePicker format="YYYY-MM-DD" onChange={(e,dateString)=>{setUpdateNewsForm({ ...updateNewsForm, Time:dateString})}}/>
            </Form.Item>
            <Form.Item label={LT(lg, '简介', 'Abstract')} name="Abstract" rules={[{type:'string',max:100,min:2,message:LT(lg, '简介为2-100字', 'Abstract should be 2-100 words')},{required:false, message:LT(lg, '请输入公司简介!', 'Please enter the company abstract!')}]} >
                <Input onChange={(e)=>setUpdateNewsForm({ ...updateNewsForm, Abstract:e.target.value})}/>
            </Form.Item>
            <Form.Item label={LT(lg, '详细介绍', 'Introduction')} name="Introduction" rules={[{type:'string',max:500,min:1,message:LT(lg, '详细介绍为2-500字', 'Introduction should be 2-500 words')},{required:false, message:LT(lg, '请输入公司详细介绍!', 'Please enter the company introduction!')}]} >
                <Input onChange={(e)=>setUpdateNewsForm({ ...updateNewsForm, Introduction:e.target.value})}/>
            </Form.Item>
            {
            submitLoading
            ?
            <Spin indicator={<LoadingOutlined spin/>}/>
            :
            <Form.Item wrapperCol={{offset:0}} style={{marginBottom:0}}>
                <Button type="primary" htmlType="submit">{LT(lg, '提交', 'Submit')}</Button> 
            </Form.Item>
            }
        </Form>}
    </Modal>
}

export default UpdateNews;
