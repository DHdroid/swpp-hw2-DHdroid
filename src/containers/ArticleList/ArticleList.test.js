import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as actionCreators from '../../store/action/action'
import ArticleList from './ArticleList';
import { italic } from 'ansi-colors';

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
describe('<ArticleList/>', () => {
    let articlelist, spygetarticles, spygetuser;
    beforeEach(() => {
        articlelist = (
            <Provider store={mockStore}>
            <BrowserRouter>
            <Switch>
                <Route path='/' exact
                    render={()=><ArticleList/>}/>
            </Switch>
            </BrowserRouter>
            </Provider>
        )
        spygetuser = jest.spyOn(actionCreators, 'getUsers')
            .mockImplementation(()=>{return dispatch => {}; });
        spygetarticles = jest.spyOn(actionCreators, 'getArticles')
            .mockImplementation(()=>{return dispatch => {}; });
    })
    afterEach(() => { jest.clearAllMocks() });
    it('should render without errors', ()=> {
        const component = mount(articlelist);
        const wrapper = component.find('.ArticleList');
        expect(wrapper.length).toBe(1);
    });
    it('should show all the articles', ()=>{
        const component = mount(articlelist);
        const wrapper = component.find('.Article');
        //console.log(wrapper.debug());
        expect(wrapper.length).toBe(1);
    });
    it('should move to create page when button is pressed',()=> {
        window.location.assign = jest.fn();
        const component = mount(articlelist);
        const wrapper = component.find('#create-article-button');
        wrapper.simulate('click');
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})
