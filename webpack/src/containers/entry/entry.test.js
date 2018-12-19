import { mount } from '@vue/test-utils'
import Entry from './index'
test('renders correctly', () => {
  const wrapper = mount(Entry)
  expect(wrapper.element).toMatchSnapshot()
})
