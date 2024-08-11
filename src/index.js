import ReactDOM from 'react-dom';
import BaseRouter from './routers/router';
import { Provider } from 'react-redux';
import {store} from './reduxs/store';

ReactDOM.render(
    <Provider store={store}>
        <BaseRouter />
    </Provider>,
    document.getElementById('root')
)