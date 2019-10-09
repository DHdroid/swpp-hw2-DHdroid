import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
import ArticleDetail from './ArticleDetail';
const stubInitialState = {
    article:{
        id: 20,
        author_id: 3,
        title:"ReactJS Testing",
        content:"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
    },
    comments:[
        {
            "id": 20,
            "article_id": 20,
            "author_id": 3,
            "content": "Tornado has hit our town"
        },
        {
            "id": 21,
            "article_id": 20,
            "author_id": 1,
            "content": "Oh, what a misery"
        }
    ],
    users:[
        {
          "id": 1,
          "email": "swpp@snu.ac.kr",
          "password": "iluvswpp",
          "name": "Software Lover",
          "logged_in": false
        },
        {
          "id": 2,
          "email": "alan@turing.com",
          "password": "iluvswpp",
          "name": "Alan Turing",
          "logged_in": false
        },
        {
          "id": 3,
          "email": "edsger@dijkstra.com",
          "password": "iluvswpp",
          "name": "Edsger Dijkstra",
          "logged_in": false
        }
    ]

};
const stubInitialState2 = {...stubInitialState, article:{
    id: 20,
    author_id: 1,
    title:"ReactJS Testing",
    content:"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
}}
const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubInitialState2);
describe('<Logout/>', () => {
    let detail, detail2, spygetuser, spygetarticle, spygetcomment, spypostcomment, spydeletearticle;

    beforeEach(() => {
        detail = (
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><ArticleDetail match={{params: {id: 20}}}/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        )
        detail2 = (
            <Provider store={mockStore2}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact
                        render={()=><ArticleDetail match={{params: {id: 20}}}/>}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        )
        spygetuser = jest.spyOn(actionCreators, 'getUsers')
            .mockImplementation(()=>{return dispatch => {}; });
        spygetarticle = jest.spyOn(actionCreators, 'getArticle')
            .mockImplementation((id)=>{return dispatch => {}; });
        spygetcomment = jest.spyOn(actionCreators, 'getComments')
            .mockImplementation((id)=>{return dispatch => {}; });
        spypostcomment = jest.spyOn(actionCreators, 'postComment')
            .mockImplementation((cm)=>{return dispatch => {}; });
        spydeletearticle = jest.spyOn(actionCreators, 'deleteArticle')
            .mockImplementation((id)=>{return dispatch => {}; });
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', ()=> {
        const component = mount(detail);
        const wrapper = component.find('.ArticleDetail');
        expect(wrapper.length).toBe(1);
    })
    it('comfirm button should be enabled and call function when content is existing', () => {
        const component = mount(detail);
        const wrapper1 = component.find('#new-comment-content-input');
        wrapper1.simulate('change',{target:{value:'1'}});
        const wrapper = component.find('#confirm-create-comment-button');
        expect(wrapper.props().disabled).toEqual(false);
        wrapper.simulate('click');
        expect(spypostcomment).toHaveBeenCalledTimes(1);
    })
    it('when user is logged in, one can delete and edit an article',() => {
        window.location.assign = jest.fn();
        const component = mount(detail2);
        const wrapper = component.find('#delete-article-button');
        expect(wrapper.length).toBe(1);
        const wrapper2 = component.find('#edit-article-button');
        expect(wrapper2.length).toBe(1);
        wrapper.simulate('click');
        wrapper2.simulate('click');
        expect(spydeletearticle).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
    it('when back button is pressed, window.location should be changed', () => {
        window.location.assign = jest.fn();
        const component = mount(detail);
        const wrapper = component.find('#back-detail-article-button');
        wrapper.simulate('click');
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})
