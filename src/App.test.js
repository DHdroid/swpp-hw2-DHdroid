import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from './test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch, MemoryRouter, browserHistory} from 'react-router-dom'
import * as actionCreators from './store/action/action'
import App from './App';
import {createBrowserHistory} from 'history';

const mockStore = getMockStore({login:true});
const mockStore2 = getMockStore({login:false});
const history = createBrowserHistory();
describe('App',()=>{
    let app, app2, spygetlogin;
    beforeEach(()=>{
        app = (
            <Provider store={mockStore}>
              <App/>
            </Provider>
        )
        app2 = (
            <Provider store={mockStore2}>
                <App history={history}/>
            </Provider>
        )
    })
    spygetlogin = jest.spyOn(actionCreators, 'postArticle')
        .mockImplementation(()=>{return ()  => {return dispatch => {};}});

    it('should render', () => {
        const component = mount(app);
        expect(component.find('.App').length).toBe(1);
    });
    it('should be redirected', () => {
        window.location.assign = jest.fn();
        const component = mount(app);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
    it('should be redirected', () => {
        window.location.assign = jest.fn();
        history.push('/article')
        const component = mount(app2);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})