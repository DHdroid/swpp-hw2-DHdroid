import React from 'react';
import { shallow, mount } from 'enzyme';
import Article from './Article';

describe('<Article />', () => {
    afterEach(() => { jest.clearAllMocks() });
    it('should render without errors', () => {
        const component = shallow(<Article />);
        const wrapper = component.find('.Article');
        expect(wrapper.length).toBe(1);
    })
    it('should handle clicks', () => {
        window.location.assign = jest.fn();
        const component = mount(<Article number={1}/>)
        const wrapper = component.find('button')
        console.log(component.debug());
        wrapper.simulate('click');
        expect(window.location.assign).toHaveBeenCalledTimes(1);
    })
})