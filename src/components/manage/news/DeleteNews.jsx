import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';
import { NewsDeleteByIDAPI } from '../../../apis/news'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = {Chinese: ChineseSentence, English: EnglishSentence}
    return dictionary[language]
}

const DeleteNews = (props) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const lg = useSelector((state) => state.language.language);

    const OnDeleteNews = () => {
        setSubmitLoading(true);
        NewsDeleteByIDAPI(props.deleteNewsInfo.DeleteNewsID)
            .then(response => {
                if (response.data.code === 200) {
                    setSubmitLoading(false);
                    props.setDeleteNewsInfo({ ...props.deleteNewsInfo, DeleteNewsInfoOpen: false });
                } else {}
            }).catch(error => {
                console.log(error);
            });
    }

    return <Modal style={{ textAlign: "center" }} title={null} width={1200} open={props.deleteNewsInfo.DeleteNewsID} onCancel={() => { props.setDeleteNewsInfo({ ...props.deleteNewsInfo, DeleteNewsInfoOpen: false }) }} footer={null} okText={false} cancelText={false}>
        <div style={{ margin: "10px" }}>{LT(lg, '是否删除', 'Confirm deletion?')}</div>
        <div>
            {submitLoading
                ? <Button type="primary" danger loading>{LT(lg, '删除中', 'Deleting')}</Button>
                : <Button type="primary" danger onClick={OnDeleteNews}>{LT(lg, '确定删除', 'Confirm Delete')}</Button>}
            <Button type="primary" onClick={() => { props.setDeleteNewsInfo({ ...props.deleteNewsInfo, DeleteNewsInfoOpen: false }) }}>{LT(lg, '取消删除', 'Cancel')}</Button>
        </div>
    </Modal>
}

export default DeleteNews;
