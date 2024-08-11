import React, { useState } from 'react'
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import CompanysStatusReview from './company/CompanysStatusReview';
import CompanysInfo from './CompanysInfo'

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

const CompanysManage = (prop) => {
    const [manageKey, setManageKey] = useState('1')
    const lg = useSelector((state) => state.language.language);

    const items = [
        {
            key: '1',
            label: LT(lg, '公司信息', 'Company Information'),
            children: <CompanysInfo user={prop.user} manageKey={manageKey} />,
        },
        {
            key: '2',
            label: LT(lg, '公司审核', 'Company Review'),
            children: <CompanysStatusReview user={prop.user} manageKey={manageKey} />,
        },
    ]

    return <>
        <Tabs items={items} activeKey={manageKey} onChange={(e) => { setManageKey(e) }} />
    </>
}

export default CompanysManage
