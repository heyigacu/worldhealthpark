import axios from "axios";


export const CompanysAcqurieAPI  = (params) => axios.post('/api/companys/acquire/', params)
   
export const CompanyAcqurieByIDAPI  = (id) => axios.post('/api/company/acquirebyid/', { id:id } )

export const CompanyStatusAPI  = (params) => axios.post('/api/companys/status/', params )
   
export const CompanyChangeStatusAPI  = (id, Status) => axios.post('/api/company/changestatus/', {id:id,Status:Status} )
   
export const CompanyDeleteByIDAPI  = (id) => axios.post('/api/company/deletebyid/', {id:id} )
   
export const CompanyRegisterAPI  = (RegisterCompanyForm) => axios.post('/api/company/register/', RegisterCompanyForm )

export const CompanyUpdateAPI = (UpdateCompanyForm) => axios.post('/api/company/update/', UpdateCompanyForm)

export const CompanysAcqurieByClassAPI  = (params) => axios.post('/api/companys/acquirebyclass/', params)


export const CompanysCountAPI  = () => axios.get('/api/companys/count/')
