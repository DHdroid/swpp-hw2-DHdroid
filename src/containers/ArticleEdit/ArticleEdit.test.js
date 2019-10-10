import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
import ArticleEdit from './ArticleEdit';
import * as actionTypes from '../../store/action/actionTypes';
import { waitForState } from 'enzyme-async-helpers'
import { doesNotReject } from 'assert';
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
const mockStore = getMockStore(stubInitialState);
describe('<ArticleEdit/>', () => {
    let articleedit, spyeditarticle, spygetarticle, spygetuser, component;
    beforeEach(async () => {
        articleedit = (
            <Provider store={mockStore}>
            <BrowserRouter>
            <Switch>await 
                <Route path='/' exact
                    render={()=><ArticleEdit match={{params:{id:20}}}/>}/>
            </Switch>
            </BrowserRouter>
            </Provider>
        )
        const promise = () => new Promise(resolve =>
            resolve()
        );
        spygetarticle = jest.spyOn(actionCreators, 'getArticle')
            .mockImplementation((id)=>{return dispatch => {return promise().then(()=>{}) }});
        spygetuser = jest.spyOn(actionCreators, 'getUsers')
            .mockImplementation(()=>{return dispatch => {return promise().then(()=>{}) }});
        spyeditarticle = jest.spyOn(actionCreators, 'editArticle')
            .mockImplementation((ar)=>{return dispatch => {return promise().then((ar)=>{}) }});
    })
    afterEach(() => { jest.clearAllMocks() });
    it('should render without errors', ()=> {
        const component = mount(articleedit);
        const wrapper = component.find('.ArticleEdit');
        expect(wrapper.length).toBe(1);
    });
    /*
    it('confirm button should work when there are title and contents', async()=> {
        window.location.assign = jest.fn();
        const component = mount(create);
        const wrapper1 = component.find('#article-title-input');
        const wrapper2 = component.find('#article-content-input');
        wrapper1.simulate('change', {target:{value:'1'}});
        wrapper2.simulate('change', {target:{value:'2'}});
        const wrapper = component.find('#confirm-create-article-button');
        expect(wrapper.props().disabled).toEqual(false);
        await wrapper.simulate('click');
        await expect(spypostarticle).toHaveBeenCalledTimes(1);
        await expect(window.location.assign).toHaveBeenCalledTimes(1);
    })*/
    it('should have no input but preview in preview mode', async () => {
        const component = mount(articleedit);
        for(var i=0; i<20; i++) {
            await component.update();
        }
        const wrapper0 = component.find('#write-tab-button');
        const wrapper1 = component.find('#preview-tab-button');
        wrapper1.simulate('click');
        const wrapper2 = component.find('#article-author');
        const wrapper3 = component.find('#article-title');
        const wrapper4 = component.find('#article-content');
        expect(wrapper2.length).toBe(1);
        expect(wrapper3.length).toBe(1);
        expect(wrapper4.length).toBe(1);
        wrapper0.simulate('click');
        const wrapper5 = component.find('#article-title-input');
        const wrapper6 = component.find('#article-content-input');
        expect(wrapper5.length).toBe(1);
        expect(wrapper6.length).toBe(1);
    })
    it('should go back to article page when pressing back button', async ()=>{
        window.confirm = jest.fn().mockImplementation(()=>true);
        window.location.assign = jest.fn();
        const component = mount(articleedit);
        for(var i=0; i<20; i++) {
            await component.update();
        }
        const wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(window.confirm).toHaveBeenCalledTimes(0);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
    it('should go back when pressed', async ()=> {
        window.confirm = jest.fn().mockImplementation(()=>false);
        window.location.assign = jest.fn();
        const component = mount(articleedit);
        for(var i=0; i<20; i++) {
            await component.update();
        }
        //console.log(component.debug());
        const wrapper2 = component.find('#article-title-input');
        const wrapper3 = component.find('#article-content-input');
        wrapper2.simulate('change',{target:{value:'none'}});
        wrapper3.simulate('change',{target:{value:'none'}});
        const wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(window.confirm).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledTimes(0);
        window.confirm = jest.fn().mockImplementation(()=>true);
        wrapper.simulate('click');
        expect(window.confirm).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
    it('should call edit',async ()=>{
        window.location.assign = jest.fn();
        const component = mount(articleedit);
        for(var i=0; i<20; i++) {
            await component.update();
        }
        const wrapper = component.find('#confirm-edit-article-button');
        wrapper.simulate('click');
        expect(spyeditarticle).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})
