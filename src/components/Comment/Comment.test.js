import React from 'react';
import { shallow, mount } from 'enzyme';
import Comment from './Comment'
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
import { render, fireEvent } from '@testing-library/react';
import { getByText } from '@testing-library/dom'
const stubInitialState = {};
const mockStore = getMockStore(stubInitialState);

describe('<Comment/>', ()=> {
    let comment1, comment2, spydeletecomment, spyeditcomment;
    
    beforeEach(()=> {
        comment1 = (
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><Comment id = {1} author_id = {1} article_id = {1} content=""/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        );
        comment2 = (
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><Comment id = {1} author_id = {2} article_id = {1} content=""/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        );
        spydeletecomment = jest.spyOn(actionCreators, 'deleteComment')
            .mockImplementation((id)=>{return dispatch => {}; });
        spyeditcomment = jest.spyOn(actionCreators, 'editComment')
            .mockImplementation((id)=>{return dispatch => {}; });
    })
    afterEach(() => { jest.clearAllMocks() });
    it('should render without errors', ()=> {
        const component = mount(comment1);
        const wrapper = component.find('.Comment');
        expect(wrapper.length).toBe(1);
    })

    it('should render delete and edit button if author_id = 1', () => {
        const component = mount(comment1);
        let wrapper = component.find('#edit-comment-button');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('#delete-comment-button');
        expect(wrapper.length).toBe(1);
    })
    it('should not render delete and edit button if author_id != 1', () => {
        const component = mount(comment2);
        let wrapper = component.find('#edit-comment-button');
        expect(wrapper.length).toBe(0);
        wrapper = component.find('#delete-comment-button');
        expect(wrapper.length).toBe(0);
    })
    it('should edit comment via prompt', () => {
        window.prompt = jest.fn().mockImplementation(()=>true);
        const component = mount(comment1);
        const wrapper = component.find('#edit-comment-button');
        wrapper.simulate('click');
        expect(window.prompt).toHaveBeenCalledTimes(1);
        expect(spyeditcomment).toHaveBeenCalledTimes(1);
    })
    it('should not call edit when null', ()=> {
        window.prompt = jest.fn().mockImplementation(()=>null);
        const component = mount(comment1);
        const wrapper = component.find('#edit-comment-button');
        wrapper.simulate('click');
        expect(window.prompt).toHaveBeenCalledTimes(1);
        expect(spyeditcomment).toHaveBeenCalledTimes(0);
    })
    it("should call clickDelete", () => {
        const component = mount(comment1);
        const wrapper = component.find('#delete-comment-button');
        wrapper.simulate('click');
        expect(spydeletecomment).toHaveBeenCalledTimes(1);
    })
})