import React from 'react';
import { shallow, mount } from 'enzyme';
import Logout from './Logout'
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
const stubInitialState = {
    login:null
};
const mockStore = getMockStore(stubInitialState);


describe('<Logout/>', () => {
    let logout, spylogout;

    beforeEach(() => {
        logout = (
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><Logout/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        )
        spylogout = jest.spyOn(actionCreators, 'logout')
            .mockImplementation(()=>{return dispatch => {}; });
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', ()=> {
        const component = mount(logout);
        const wrapper = component.find('.Logout');
        expect(wrapper.length).toBe(1);
    })

    it('should call logoutHandleClick', ()=> {
        window.location.assign = jest.fn();
        const component = mount(logout);
        const wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(window.location.assign).toHaveBeenCalledTimes(1);
        expect(spylogout).toHaveBeenCalledTimes(1);
    })
})