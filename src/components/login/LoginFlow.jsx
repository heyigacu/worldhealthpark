
import React, { useState } from 'react';
import Register from './Register';
import ChangePassword from './ChangePassword';
import Login from './Login';

const LoginFlow = (props) => {
    const [registerOpen, setRegisterOpen] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

    if(registerOpen){
        return <Register loginFlowOpen={props.loginFlowOpen} setLoginFlowOpen={props.setLoginFlowOpen} setRegisterOpen={setRegisterOpen} />
    }else{
        if(changePasswordOpen){
            return <ChangePassword  loginFlowOpen={props.loginFlowOpen} setLoginFlowOpen={props.setLoginFlowOpen} setChangePasswordOpen={setChangePasswordOpen} />
        }else{
            return <Login loginFlowOpen={props.loginFlowOpen} setLoginFlowOpen={props.setLoginFlowOpen} setChangePasswordOpen={setChangePasswordOpen} setRegisterOpen={setRegisterOpen} />
        }
    }
}
export default LoginFlow;

