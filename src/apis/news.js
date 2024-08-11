import axios from 'axios'


export const NewsesAcqurieAPI = (params) => axios.post('/api/newses/acquire/', params )
   
export const NewsDeleteByIDAPI = (id) => axios.post('/api/news/deletebyid/', {id:id} )

export const NewsCreateAPI = (CreateNewsForm) => axios.post('/api/news/create/', CreateNewsForm )
   
export const NewsAcqurieByIDAPI = (id) => axios.post('/api/news/acquirebyid/', {id:id} )
   
export const NewsUpdateAPI = (UodateNewsForm) => axios.post('/api/news/update/', UodateNewsForm )

export const NewsesAcqurieByNAPI = (params) => axios.post('/api/newses/acquirebyn/', params)

export const NewsAcqurieByURLIDAPI = (id) => axios.get(`/api/news/acquirebyid/${id}/`);
