
import App from '../App.jsx'

import Home from '../pages/Home.jsx'
import Exhibition from '../pages/Exhibition.jsx'
import Manage from '../pages/Manage.jsx'
import News from '../pages/News.jsx'
import NewsDetail from '../pages/NewsDetail.jsx'
import Sponsor from '../pages/Sponsor.jsx'
import AboutUs from '../pages/AboutUs.jsx'
import NotFound from '../pages/NotFound.jsx'



import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

const BaseRouter=()=>(
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="exhibit" element={<Exhibition />} />
                <Route path="manage" element={<Manage />} />
                <Route path="news" element={<News />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="sponsor" element={<Sponsor />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </Router>
)
export default BaseRouter