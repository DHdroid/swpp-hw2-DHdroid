import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
import Create from './Create';
const stubInitialState = {
    articles:[{
        id: 0,
        author_id: 1,
        title: "10 React JS Articles Every Web Developer Should Read",
        content: "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before."
      }],
    comments:[],
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
    ],
    id:0
}
const mockStore = getMockStore(stubInitialState);
describe('<Create/>', () => {
    let create, spypostarticle;
    beforeEach(() => {
        create = (
            <Provider store={mockStore}>
            <BrowserRouter>
            <Switch>
                <Route path='/' exact
                    render={()=><Create/>}/>
            </Switch>
            </BrowserRouter>
            </Provider>
        )
        const promise = () => new Promise(resolve =>
            resolve()
        );
        spypostarticle = jest.spyOn(actionCreators, 'postArticle')
            .mockImplementation((ar)=>{return dispatch => {return promise().then(()=>{}) }});
    })
    afterEach(() => { jest.clearAllMocks() });
    it('should render without errors', ()=> {
        const component = mount(create);
        const wrapper = component.find('.Create');
        expect(wrapper.length).toBe(1);
    });
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
    })
    it('should have no input but preview in preview mode', () => {
        const component = mount(create);
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
    it('should go back to article page when pressing back button', ()=>{
        window.location.assign = jest.fn();
        const component = mount(create);
        const wrapper = component.find('#back-create-article-button');
        wrapper.simulate('click');
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})
