import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Radio, Upload, message, Spin, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { CompanyUpdateAPI, CompanyAcqurieByIDAPI } from '../../../apis/company'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const UpdateCompany = (props) => {
    const [useUpdateCompanyForm] = Form.useForm();
    const [updateCompanyForm, setUpdateCompanyForm] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [figureList, setFigureList] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false)
    const [useEffectData, setUseEffectData] = useState()
    const VALID_FIGURE_SIZE = 5
    const lg = useSelector((state) => state.language.language);

    useEffect(() => {
        setRequestLoading(true)
        CompanyAcqurieByIDAPI(props.updateCompanyInfo.UpdateCompanyID)
            .then(response => {
                if (response.data.code == 200) {
                    setUseEffectData(response.data.data)
                    useUpdateCompanyForm.setFieldsValue(
                        {
                            CompanyName: response.data.data.CompanyName,
                            Email: response.data.data.Email,
                            Class: String(response.data.data.Class),
                            Address: response.data.data.Address,
                            Mobile: response.data.data.Mobile,
                            Landline: response.data.data.Landline,
                            Abstract: response.data.data.Abstract,
                            Introduction: response.data.data.Introduction,
                        }
                    )
                    setUpdateCompanyForm(
                        {
                            CompanyName: response.data.data.CompanyName,
                            Email: response.data.data.Email,
                            Class: response.data.data.Class,
                            Address: response.data.data.Address,
                            Mobile: response.data.data.Mobile,
                            Landline: response.data.data.Landline,
                            Abstract: response.data.data.Abstract,
                            Introduction: response.data.data.Introduction,
                        }
                    )
                    setRequestLoading(false)
                } else { }
            }).catch(error => {
                console.log(error)
            });
    }, [])

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
                        setUpdateCompanyForm({ ...updateCompanyForm, Figure: file.response.data })
                        message.success(LT(lg, '上传成功', 'Upload successful'))
                    } else { message.error(file.response.message) }
                }
                return file;
            });
        },
    };

    const onUpdateCompanyFinish = (values) => {
        useUpdateCompanyForm.validateFields(['Email']).then((result) => {
            setSubmitLoading(true)
            console.log(props.user)
            CompanyUpdateAPI({ ...updateCompanyForm, UserName: props.user.UserName, id: useEffectData.id })
            .then(response => {
                console.log(1111111111, response)
                if (response.data.code == 200) {
                    // setSubmitLoading(false)
                    message.success(LT(lg, '公司信息修改成功', 'Company information successfully updated'))
                    props.setUpdateCompanyInfo({ ...props.updateCompanyInfo, UpdateCompanyInfoOpen: false })
                } else { }
            }).catch(error => {
                message.error(LT(lg, '公司信息修改失败', 'Company information update failed'))
                console.log(error)
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
            open={props.updateCompanyInfo.UpdateCompanyInfoOpen}
            onCancel={() => { props.setUpdateCompanyInfo({ ...props.updateCompanyInfo, UpdateCompanyInfoOpen: false }) }}
            footer={null}
            okText={false}
            cancelText={false}
        >
            {requestLoading ?
                <div>Loading</div> :
                <Form
                    name="basic"
                    form={useUpdateCompanyForm}
                    style={{ textAlign: 'center' }}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{ remember: true }}
                    onFinish={onUpdateCompanyFinish}
                    autoComplete="off"
                >
                    <Form.Item wrapperCol={{ offset: 0 }}>
                        <div style={{ fontSize: 20, fontWeight: "bolder" }} onClick={() => { }}>{LT(lg, '更新公司信息', 'Update Company Information')}</div>
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司名', 'Company Name')}
                        name="CompanyName"
                        rules={[
                            { type: 'string', max: 50, min: 1, message: LT(lg, '公司名长度为2-50', 'Company name length should be 2-50') },
                            { required: true, message: LT(lg, '请输入公司名', 'Please enter the company name') },
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, CompanyName: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司图片', 'Company Image')}
                        name="Figure"
                        rules={[{ required: false }]}
                    >
                        {(useEffectData == undefined || useEffectData.Figure == undefined) ?
                            <Upload {...FigureProps} fileList={figureList} >
                                <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                            </Upload>
                            :
                            <Row>
                                <Col span={12} style={{ textAlign: "center" }}>
                                    <img style={{ width: "40%" }} src={`data:image/png;base64,${useEffectData.Figure}`} alt="" />
                                    <div>{LT(lg, '原始图片', 'Original Image')}</div>
                                </Col>
                                <Col span={12} style={{ textAlign: "center" }}>
                                    <Upload {...FigureProps} fileList={figureList} >
                                        <Button icon={<UploadOutlined />}>{LT(lg, '上传', 'Upload')}</Button>
                                    </Upload>
                                    <div>{LT(lg, '上传新的图片', 'Upload new image')}</div>
                                </Col>
                            </Row>
                        }
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司类型', 'Company Type')}
                        name="Class"
                        rules={[{ required: true, message: LT(lg, '请选择公司类型', 'Please select company type') }]}
                    >
                        <Radio.Group onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Class: e.target.value })} >
                            <Radio value="0">{LT(lg, '食品和农产品', 'Food and Agricultural Products')}</Radio>
                            <Radio value="1">{LT(lg, '医疗器械', 'Medical Devices')}</Radio>
                            <Radio value="2">{LT(lg, '中医中药', 'Chinese Medicine')}</Radio>
                            <Radio value="3">{LT(lg, '西医西药', 'Western Medicine')}</Radio>
                            <Radio value="4">{LT(lg, '健康服务管理', 'Health Service Management')}</Radio>
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
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Email: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司联系手机号', 'Company Mobile')}
                        name="Mobile"
                        rules={[
                            { type: 'string', max: 50, min: 1, message: LT(lg, '手机号长度为13位', 'Mobile number length should be 13 digits') },
                            { required: false, message: LT(lg, '请输入公司联系手机号!', 'Please enter the company mobile number!') }
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Mobile: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司联系座机号', 'Company Landline')}
                        name="Landline"
                        rules={[
                            { type: 'string', max: 50, min: 1, message: LT(lg, '座机号长度为8-11位', 'Landline number length should be 8-11 digits') },
                            { required: false, message: LT(lg, '请输入公司联系座机号!', 'Please enter the company landline number!') }
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Landline: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司地址', 'Company Address')}
                        name="Address"
                        rules={[
                            { type: 'string', max: 100, min: 2, message: LT(lg, '公司地址为2-100字', 'Company address should be 2-100 characters') },
                            { required: true, message: LT(lg, '请输入公司地址!', 'Please enter the company address!') }
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Address: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司简介', 'Company Abstract')}
                        name="Abstract"
                        rules={[
                            { type: 'string', max: 100, min: 2, message: LT(lg, '公司简介为2-100字', 'Company abstract should be 2-100 characters') },
                            { required: false, message: LT(lg, '请输入公司简介!', 'Please enter the company abstract!') }
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Abstract: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label={LT(lg, '公司详细介绍', 'Company Introduction')}
                        name="Introduction"
                        rules={[
                            { type: 'string', max: 500, min: 1, message: LT(lg, '公司详细介绍为2-500字', 'Company introduction should be 2-500 characters') },
                            { required: false, message: LT(lg, '请输入公司详细介绍!', 'Please enter the company introduction!') }
                        ]}
                    >
                        <Input onChange={(e) => setUpdateCompanyForm({ ...updateCompanyForm, Introduction: e.target.value })} />
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
                </Form>}
        </Modal>
    )
}

export default UpdateCompany;
