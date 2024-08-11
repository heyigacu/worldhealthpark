import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Upload, Button, message, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NewsCreateAPI } from '../../../apis/news'

const LT=(language, ChineseSentence, EnglishSentence)=>{
    let dictionary = {Chinese:ChineseSentence,English:EnglishSentence}
    return dictionary[language]
  }

const CreateNews = (props) => {
    const [useCreateNewsForm] = Form.useForm();
    const [createNewsForm, setCreateNewsForm] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [figureList, setFigureList] = useState([]);
    const MAX_FIGURE_SIZE = 5; // Assuming 5MB as max size
    const lg = useSelector(state => state.language.language);

    const FigureProps = {
        beforeUpload: (file, fileList) => {
            const fileType = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
            if (fileType !== '.png' && fileType !== '.jpg') {
                message.error(LT(lg, '请上传png或jpg格式', 'Please upload in PNG or JPG format'));
                const index = fileList.indexOf(file);
                fileList.splice(index, 0);
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < MAX_FIGURE_SIZE;
            if (!isLt5M) {
                message.error(LT(lg, `图片大小应该小于${MAX_FIGURE_SIZE}MB`, `Image size should be less than ${MAX_FIGURE_SIZE}MB`));
                const index = fileList.indexOf(file);
                fileList.splice(index, 0);
                return false;
            }
        },
        action: '/api/news/upload_figure/',
        onChange: (info) => {
            let newFileList = [...info.fileList];
            newFileList = newFileList.slice(-1);
            setFigureList(newFileList);
            newFileList = newFileList.map((file) => {
                if (file.response) {
                    if (file.response.code === 200) {
                        setCreateNewsForm({ ...createNewsForm, Figure: file.response.data });
                        message.success(LT(lg, '上传成功', 'Upload successful'));
                    }
                }
                return file;
            });
        },
    };

    const onCreateNewsFinish = (values) => {
        useCreateNewsForm.validateFields(['Email']).then((result) => {
            setSubmitLoading(true);
            NewsCreateAPI({ ...createNewsForm, UserName: props.user.UserName }) 
                .then(response => {
                    if (response.data.code === 200) {
                        setSubmitLoading(false);
                        message.success(LT(lg, '新闻注册成功', 'News registration successful'));
                        props.setCreateNewsOpen(false); // Assuming setCreateNewsOpen exists
                    }
                }).catch(error => {
                    message.error(LT(lg, '新闻注册失败', 'News registration failed'));
                    console.log(error);
                });
            setTimeout(() => {
                setSubmitLoading(false);
            }, 1000);
        }).catch(error => {
            console.log(error);
        });
    };

    return <Modal title={null} width={1200} open={props.createNewsOpen} onCancel={() => { props.setCreateNewsOpen(false); }} footer={null} okText={false} cancelText={false}>
        <Form name="basic" form={useCreateNewsForm} style={{ textAlign: 'center' }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} initialValues={{ remember: true }} onFinish={onCreateNewsFinish} autoComplete="off">
            <Form.Item wrapperCol={{ offset: 0 }}>
                <div style={{ fontSize: 20, fontWeight: "bolder" }} onClick={() => {}}>{LT(lg, '注册公司', 'Register Company')}</div>
            </Form.Item>
            <Form.Item label={LT(lg, '主题', 'Subject')} name="Subject" rules={[{ type: 'string', max: 50, min: 1, message: LT(lg, '主题长度为2-50', 'Subject length must be 2-50') }, { required: true, message: LT(lg, '请输入公司名', 'Please enter the company name') }]}>
                <Input onChange={(e) => setCreateNewsForm({ ...createNewsForm, Subject: e.target.value })} />
            </Form.Item>
            <Form.Item label={LT(lg, '活动图片', 'Event Picture')} name="Figure" rules={[{ required: false }]} extra={LT(lg, '上传活动图片', 'Upload event picture')}>
                <Upload {...FigureProps} fileList={figureList}>
                    <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                </Upload>
            </Form.Item>
            <Form.Item label={LT(lg, '时间', 'Time')} name="Time" rules={[{ required: false, message: LT(lg, '请输入公司简介!', 'Please enter the company profile!') }]}>
                <DatePicker format="YYYY-MM-DD" onChange={(e, dateString) => { setCreateNewsForm({ ...createNewsForm, Time: dateString }) }} />
            </Form.Item>
            <Form.Item label={LT(lg, '简介', 'Abstract')} name="Abstract" rules={[{ type: 'string', max: 100, min: 2, message: LT(lg, '简介为2-100字', 'Abstract must be 2-100 characters') }, { required: false, message: LT(lg, '请输入公司简介!', 'Please enter the company profile!') }]}>
                <Input onChange={(e) => setCreateNewsForm({ ...createNewsForm, Abstract: e.target.value })} />
            </Form.Item>
            <Form.Item label={LT(lg, '详细介绍', 'Detailed Introduction')} name="Introduction" rules={[{ type: 'string', max: 500, min: 1, message: LT(lg, '详细介绍为2-500字', 'Detailed introduction must be 2-500 characters') }, { required: false, message: LT(lg, '请输入公司详细介绍!', 'Please enter detailed company introduction!') }]}>
                <Input onChange={(e) => setCreateNewsForm({ ...createNewsForm, Introduction: e.target.value })} />
            </Form.Item>
            {
                submitLoading
                    ?
                    <Spin indicator={<LoadingOutlined spin />} />
                    :
                    <Form.Item wrapperCol={{ offset: 0 }} style={{ marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit">{LT(lg, '提交', 'Submit')}</Button>
                    </Form.Item>
            }
        </Form>
    </Modal>
};

export default CreateNews;
