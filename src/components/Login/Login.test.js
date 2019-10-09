import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login'
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
const stubInitialState = {};
const mockStore = getMockStore(stubInitialState);


describe('<Login/>', () => {
    let login, spylogin;

    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><Login/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        )
        spylogin = jest.spyOn(actionCreators, 'login')
            .mockImplementation(()=>{return dispatch => {}; });
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', ()=> {
        const component = mount(login);
        const wrapper = component.find('.Login');
        expect(wrapper.length).toBe(1);
    })

    it('should set state pr.properly on email input', ()=> {
        const email = 'TEST_EMAIL';
        const component = mount(login);
        const wrapper = component.find('#email-input');
        wrapper.simulate('change', {target:{value:email}});
        const loginInstance = component.find(Login.WrappedComponent).instance();
        expect(loginInstance.state.email).toEqual(email);
        expect(loginInstance.state.pw).toEqual('');
    })
    it('should set state pr.properly on pw input', ()=> {
        const pw = 'TEST_PW';
        const component = mount(login);
        const wrapper = component.find('#pw-input');
        wrapper.simulate('change', {target:{value:pw}});
        const loginInstance = component.find(Login.WrappedComponent).instance();
        expect(loginInstance.state.email).toEqual('');
        expect(loginInstance.state.pw).toEqual(pw);
    })
    it('should alert when id or pw is wrong',() => {
        window.alert = jest.fn();
        const component = mount(login);
        const wrapper = component.find('#login-button');
        wrapper.simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(1);
    })
    it('should not alert and should log in when id and pw are correct',() => {
        window.alert = jest.fn();
        const component = mount(login);
        const wrapper1 = component.find('#pw-input');
        const wrapper2 = component.find('#email-input');
        wrapper1.simulate('change', {target:{value:'iluvswpp'}});
        wrapper2.simulate('change', {target:{value:'swpp@snu.ac.kr'}})
        const wrapper = component.find('#login-button');
        wrapper.simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(0);
        expect(spylogin).toHaveBeenCalledTimes(1);
    })
})