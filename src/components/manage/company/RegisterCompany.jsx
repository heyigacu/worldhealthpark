import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio, Upload, message, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { CompanyRegisterAPI } from '../../../apis/company'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const RegisterCompany = (props) => {
    const [useRegisterCompanyForm] = Form.useForm();
    const [registerCompanyForm, setRegisterCompanyForm] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [figureList, setFigureList] = useState([]);
    const lg = useSelector((state) => state.language.language);

    const VALID_FIGURE_SIZE = 5
    const FigureProps = {
        beforeUpload: (file, fileList) => {
            const fileType = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
            if (fileType !== '.png' && fileType !== '.jpg') {
                message.error(LT(lg, '请上传png或jpg格式', 'Please upload png or jpg format'))
                const index = fileList.indexOf(file)
                fileList.splice(index, 0);
                return false
            }
            const islt5M = file.size / 1024 / 1024 < VALID_FIGURE_SIZE;
            if (!islt5M) {
                message.error(LT(lg, `图片大小应该小于${VALID_FIGURE_SIZE}MB`, `Image size should be less than ${VALID_FIGURE_SIZE}MB`))
                const index = fileList.indexOf(file)
                fileList.splice(index, 0)
                return false
            }
        },
        action: '/api/company/upload_figure/',
        onChange: (info) => {
            let newFileList = [...info.fileList];
            newFileList = newFileList.slice(-1);
            setFigureList(newFileList);
            newFileList = newFileList.map((file) => {
                if (file.response) {
                    if (file.response.code == 200) {
                        setRegisterCompanyForm({ ...registerCompanyForm, Figure: file.response.data })
                        message.success(LT(lg, '上传成功', 'Upload successful'))
                    } else { }
                }
                return file;
            });
        },
    };

    const onRegisterCompanyFinish = (values) => {
        useRegisterCompanyForm.validateFields(['Email']).then((result) => {
            setSubmitLoading(true)
            CompanyRegisterAPI({ ...registerCompanyForm, UserName: props.user.UserName })
                .then(response => {
                    if (response.data.code == 200) {
                        setSubmitLoading(false)
                        message.success(LT(lg, '公司注册成功', 'Company registered successfully'))
                        props.setRegisterCompanyOpen(false)
                    } else { }
                }).catch(error => {
                    message.error(LT(lg, '公司注册失败', 'Company registration failed'))
                });
            setTimeout(() => {
                setSubmitLoading(false)
            }, 1000)
        }).catch(error => console.log(error))
    };

    return (
        <Modal
            title={null}
            width={1200}
            open={props.registerCompanyOpen}
            onCancel={() => { props.setRegisterCompanyOpen(false) }}
            footer={null}
            okText={false}
            cancelText={false}
        >
            <Form
                name="basic"
                form={useRegisterCompanyForm}
                style={{ textAlign: 'center' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                initialValues={{ remember: true }}
                onFinish={onRegisterCompanyFinish}
                autoComplete="off"
            >
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: "bolder" }} onClick={() => { }}>{LT(lg, '注册公司', 'Register Company')}</div>
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司名', 'Company Name')}
                    name="CompanyName"
                    rules={[
                        { type: 'string', max: 50, min: 1, message: LT(lg, '公司名长度为2-50', 'Company name length should be 2-50') },
                        { required: true, message: LT(lg, '请输入公司名', 'Please enter the company name') },
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, CompanyName: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司图片', 'Company Image')}
                    name="Figure"
                    rules={[{ required: false }]}
                    extra={LT(lg, '上传公司LOGO或者图片', 'Upload company logo or image')}
                >
                    <Upload {...FigureProps} fileList={figureList} >
                        <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司类型', 'Company Type')}
                    name="Class"
                    rules={[{ required: true, message: LT(lg, '请选择公司类型', 'Please select company type') }]}
                >
                    <Radio.Group onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Class: e.target.value })} >
                        <div>
                            <Radio value="0">{LT(lg, '食品公司', 'Food Company')}</Radio>
                            <Radio value="1">{LT(lg, '农产品公司', 'Agricultural Products Company')}</Radio>
                        </div>
                        <div>
                            <Radio value="2">{LT(lg, '医药试剂公司', 'Pharmaceutical Reagent Company')}</Radio>
                            <Radio value="3">{LT(lg, '大型医疗仪器设备公司', 'Large Medical Equipment Company')}</Radio>
                            <Radio value="4">{LT(lg, '中小型医疗仪器设备公司', 'Small and Medium Medical Equipment Company')}</Radio>
                        </div>

                        <Radio value="5">{LT(lg, '中药产业园及种植基地', 'Chinese Medicine Industry Park and Planting Base')}</Radio>
                        <Radio value="6">{LT(lg, '天然药物原生药材', 'Natural Medicinal Raw Materials')}</Radio>
                        <Radio value="7">{LT(lg, '中医院与名中医', 'Chinese Medicine Hospitals and Famous Chinese Doctors')}</Radio>
                        <Radio value="8">{LT(lg, '医药新特品种', 'New and Special Pharmaceutical Varieties')}</Radio>
                        <Radio value="9">{LT(lg, '生物制药', 'Biopharmaceuticals')}</Radio>
                        <Radio value="10">{LT(lg, '西医院与名西医', 'Western Medicine Hospitals and Famous Western Doctors')}</Radio>
                        <Radio value="11">{LT(lg, '健康管理咨询机构', 'Health Management Consulting Institutions')}</Radio>
                        <Radio value="12">{LT(lg, '健康体检中心', 'Health Examination Centers')}</Radio>
                        <Radio value="13">{LT(lg, '健康护理服务机构', 'Health Care Service Institutions')}</Radio>
                        <Radio value="14">{LT(lg, '化妆品公司', 'Cosmetics Company')}</Radio>
                        <Radio value="15">{LT(lg, '医疗美容门诊机构', 'Medical Aesthetic Clinic Institutions')}</Radio>
                        <Radio value="16">{LT(lg, '医疗美容专用产品公司', 'Medical Aesthetic Products Company')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司邮箱', 'Company Email')}
                    name="Email"
                    rules={[
                        { type: 'email', message: LT(lg, '请输入有效的邮箱', 'Please enter a valid email') },
                        { required: true, message: LT(lg, '请输入邮箱', 'Please enter the email') }
                    ]}
                    validateTrigger={['onChange']}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Email: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司联系手机号', 'Company Mobile')}
                    name="Mobile"
                    rules={[
                        { type: 'string', max: 50, min: 1, message: LT(lg, '手机号长度为13位', 'Mobile number length should be 13 digits') },
                        { required: false, message: LT(lg, '请输入公司联系手机号!', 'Please enter the company mobile number!') }
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Mobile: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司联系座机号', 'Company Landline')}
                    name="Landline"
                    rules={[
                        { type: 'string', max: 50, min: 1, message: LT(lg, '座机号长度为8-11位', 'Landline number length should be 8-11 digits') },
                        { required: false, message: LT(lg, '请输入公司联系座机号!', 'Please enter the company landline number!') }
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Landline: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司地址', 'Company Address')}
                    name="Address"
                    rules={[
                        { type: 'string', max: 100, min: 2, message: LT(lg, '公司地址为2-100字', 'Company address should be 2-100 characters') },
                        { required: true, message: LT(lg, '请输入公司地址!', 'Please enter the company address!') }
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Address: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司简介', 'Company Abstract')}
                    name="Abstract"
                    rules={[
                        { type: 'string', max: 100, min: 2, message: LT(lg, '公司简介为2-100字', 'Company abstract should be 2-100 characters') },
                        { required: false, message: LT(lg, '请输入公司简介!', 'Please enter the company abstract!') }
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Abstract: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label={LT(lg, '公司详细介绍', 'Company Introduction')}
                    name="Introduction"
                    rules={[
                        { type: 'string', max: 500, min: 1, message: LT(lg, '公司详细介绍为2-500字', 'Company introduction should be 2-500 characters') },
                        { required: false, message: LT(lg, '请输入公司详细介绍!', 'Please enter the company introduction!') }
                    ]}
                >
                    <Input onChange={(e) => setRegisterCompanyForm({ ...registerCompanyForm, Introduction: e.target.value })} />
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
    )
}

export default RegisterCompany;
