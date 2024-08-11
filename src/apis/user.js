import axios from 'axios';

 
export const ValidateEmailAPI = (Email, Subject, Message) => axios.get('/api/user/validate_email/', {params:{Email:Email, Subject:Subject, Message:Message}} )
  
export const RegisterUserAPI  = (Email,UserName,Password) => axios.post('/api/user/register/', { Email:Email, UserName:UserName, Password:Password} )
    
export const ChangePasswordAPI  = (Email,UserName,Password) => axios.post('/api/user/changepassword/', { Email:Email, UserName:UserName, Password:Password} )
   
export const LoginAPI  = (UserName, Password) => axios.post('/api/user/login/', {UserName:UserName, Password:Password} )
   
export const UserAcqurieAPI  = (UserName) => axios.post('/api/user/acquire/', { UserName:UserName } )
   
export const ChangeEmailAPI  = (UserName, NewEmail) => axios.post('/api/user/acquire/', { UserName:UserName, NewEmail:NewEmail } )
   
export const UsersAcqurieAPI  = (params) => axios.post('/api/users/acquire/', params )
   
export const UserDeleteByID  = (id) => axios.post('/api/user/deletebyid/', { id:id } )

export const UserUpdateAPI  = (updateUserForm) => axios.post('/api/user/update/', updateUserForm )

export const UserAcqurieByID  = (id) => axios.post('/api/user/acquirebyid/', { id:id } )
   
export const UsersCountAPI  = () => axios.get('/api/users/count/')

