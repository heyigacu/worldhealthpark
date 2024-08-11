import React, { useState } from 'react'
import { Button, Modal,  } from 'antd';
import { useSelector } from 'react-redux';
import { CompanyDeleteByIDAPI } from '../../../apis/company'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const DeleteCompany = (props) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const lg = useSelector((state) => state.language.language);
    const OnDeleteCompany = () => {
        setSubmitLoading(true)
        CompanyDeleteByIDAPI(props.deleteCompanyInfo.DeleteCompanyID)
            .then(response => {
                if (response.data.code == 200) {
                    setSubmitLoading(false)
                    props.setDeleteCompanyInfo({ ...props.deleteCompanyInfo, DeleteCompanyInfoOpen: false })
                } else { }
            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <Modal
            style={{ textAlign: "center" }}
            title={null}
            width={1200}
            open={props.deleteCompanyInfo.DeleteCompanyInfoOpen}
            onCancel={() => { props.setDeleteCompanyInfo({ ...props.deleteCompanyInfo, DeleteCompanyInfoOpen: false }) }}
            footer={null}
            okText={false}
            cancelText={false}
        >
            <div style={{ margin: "10px" }}>{LT(lg, '是否删除', 'Are you sure you want to delete?')}</div>
            <div>
                {submitLoading ?
                    <Button type="primary" danger loading>{LT(lg, '删除中', 'Deleting')}</Button> :
                    <Button type="primary" danger onClick={OnDeleteCompany}>{LT(lg, '确定删除', 'Confirm Delete')}</Button>}
                <Button type="primary" onClick={() => { props.setDeleteCompanyInfo({ ...props.deleteCompanyInfo, DeleteCompanyInfoOpen: false }) }} >
                    {LT(lg, '取消删除', 'Cancel Delete')}
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteCompany;
