import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Card, Divider, Image } from 'antd';
import {BankFilled}  from '@ant-design/icons'; 
import { useSelector } from 'react-redux';
import { CompanyAcqurieByIDAPI } from '../../../apis/company'
import dayjs from 'dayjs';

const LT = (language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
}

const CompanyInfo = (props) => {
    const [companyData, setCompanyData] = useState({});
    const [requestLoading, setRequestLoading] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const lg = useSelector((state) => state.language.language);


    useEffect(() => {
        setWidth(window.innerWidth);
      }, []);
      
    const noneTrans = (obj) => {
        if (obj == undefined) {
            return LT(lg, '无', 'None');
        } else {
            return obj;
        }
    }
    useEffect(() => {
        setRequestLoading(true);
        CompanyAcqurieByIDAPI(props.companyInfo.CompanyID)
            .then(response => {
                if (response.data.code == 200) {
                    setCompanyData(response.data.data);
                    setRequestLoading(false);
                } else { }
            }).catch(error => console.log(error))
    }, []);

    const ProcessTime = (time) => {
        return dayjs(time).format('YYYY-MM-DD');
    }



    return (
        <Modal
            title={null}
            width={`${width*0.8}px`}
            open={props.companyInfo.CompanyInfoOpen}
            onCancel={() => { props.setCompanyInfo({ ...props.companyInfo, CompanyInfoOpen: false }) }}
            footer={null}
            okText={false}
            cancelText={false}
        >
            {
                requestLoading ?
                    <div>Loading</div> :
                    <div>
                        <Row>
                            <Col span={6}><Image style={{ width:`${width*0.16}px`,height:`${width*0.16}px`,objectFit:'cover',objectPosition:'center' }} src={`data:image/png;base64,${companyData.Figure}`} alt="" /></Col>
                            <Col span={18}>
                                <div style={{ display: "flex" }}><BankFilled style={{ fontSize: 30 }} />&nbsp;<span style={{ fontSize: 30, fontWeight: 'bold' }}>{companyData.CompanyName}</span></div>
                                <div>{companyData.Abstract == undefined ? LT(lg, '暂无简介', 'No abstract available') : companyData.Abstract}</div>
                                <Divider />
                                <Row>
                                    <Col span={4}>{LT(lg, '公司邮箱：', 'Company Email:')}</Col><Col span={20}>{noneTrans(companyData.Email)}</Col>
                                    <Col span={4}>{LT(lg, '公司地址：', 'Company Address:')}</Col><Col span={20}>{noneTrans(companyData.Address)}</Col>
                                    <Col span={4}>{LT(lg, '公司电话：', 'Company Mobile:')}</Col><Col span={20}>{noneTrans(companyData.Mobile)}</Col>
                                    <Col span={4}>{LT(lg, '公司座机：', 'Company Landline:')}</Col><Col span={20}>{noneTrans(companyData.Landline)}</Col>
                                    <Col span={4}>{LT(lg, '公司类别：', 'Company Type:')}</Col><Col span={20}>{noneTrans(companyData.Type)}</Col>
                                    <Col span={4}>{LT(lg, '公司创立时间：', 'Company Founded:')}</Col><Col span={20}>{ProcessTime(companyData.CreatedTime)}</Col>
                                    <Col span={4}>{LT(lg, '公司介绍：', 'Company Introduction:')}</Col><Col span={20}>{noneTrans(companyData.Introduction)}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
            }
        </Modal>
    )
}

export default CompanyInfo;
