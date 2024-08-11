import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Tabs, Menu, Divider, DatePicker, theme, List, Row, Col, ConfigProvider, message, Avatar, Card, Table, Modal, Tag, Space, Form, Radio, Upload, Input, Spin, Button } from 'antd';
import { UserSwitchOutlined, UserOutlined, FileDoneOutlined, ProfileOutlined, BankFilled, UsergroupAddOutlined, CommentOutlined, LoadingOutlined, UploadOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import UserInfo from '../components/manage/UserInfo'
import NewsManage from '../components/manage/NewsManage'
import CompanysManage from '../components/manage/CompanysManage'
import UsersManage from '../components/manage/UsersManage'
import CompanysInfo from '../components/manage/CompanysInfo'

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const ProcessTime = (time_string) => {
    const strings = String(time_string).split('.')[0].replace('T', '日').split('-')
    return strings[0] + '年' + strings[1] + '月' + strings[2]
}

const LT = (language, ChineseSentence, EnglishSentence) => {
    let dictionary = { Chinese: ChineseSentence, English: EnglishSentence }
    return dictionary[language]
}

export default function Manage() {
    const [subManage, setSubManage] = useState(1)

    const user = useSelector((state) => state.user.user)
    const lg = useSelector((state) => state.language.language);

    if (!useSelector((state) => state.user.isLoggedIn)) {
        return <div style={{ textAlign: "center", margin: "20px" }}>{LT(lg, '请点击右上角登录按钮完成登录', 'Please click the login button on the upper right to complete the login')}</div>
    }

    const items = user.Rank > 2
        ?
        [
            { key: '1', icon: <UserSwitchOutlined />, label: <span>{LT(lg, '个人信息', 'Personal Information')}</span>, },
            { key: '2', icon: <ProfileOutlined />, label: <span>{LT(lg, '公司信息', 'Company Information')}</span>, },
        ]
        :
        [
            { key: '1', icon: <UserSwitchOutlined />, label: <span>{LT(lg, '个人信息', 'Personal Information')}</span>, },
            { key: '2', icon: <ProfileOutlined />, label: <span>{LT(lg, '公司信息', 'Company Information')}</span>, },
            { key: '3', icon: <UsergroupAddOutlined />, label: <span>{LT(lg, '用户信息管理', 'User Information Management')}</span>, },
            { key: '4', icon: <FileDoneOutlined />, label: <span>{LT(lg, '公司信息管理', 'Company Information Management')}</span>, },
            { key: '5', icon: <CommentOutlined />, label: <span>{LT(lg, '新闻管理', 'News Management')}</span>, },
        ]

    const ManageContent = () => {
        return <>{(() => {
            switch (subManage) {
                case 2:
                    return <><CompanysInfo user={user} /></>
                case 3:
                    return <UsersManage user={user} />
                case 4:
                    return <CompanysManage user={user} />
                case 5:
                    return <NewsManage user={user} />
                default:
                    return <UserInfo user={user} />
            }
        })()}</>
    }

    return <>
        <Layout>
            <Sider style={{ backgroundColor: "white", }} width={'20%'}>
                <ConfigProvider theme={{ components: { Menu: {}, }, }}>
                    <Menu theme="light" style={{height: '100%', borderRight: 0,}} mode="inline" defaultSelectedKeys={['1']} items={items} onClick={(e) => { setSubManage(Number(e.key)) }} />
             
                </ConfigProvider>
            </Sider>
            <Layout>
                <Content style={{ backgroundColor: "white", padding: 30 }}>
                    <ManageContent />
                </Content>
            </Layout>
        </Layout>
    </>
}
