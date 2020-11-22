import { shallowMount } from '@vue/test-utils';
import CurrencyList from '@/components/CurrencyList.vue';
import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.use(Vuetify);
describe('CurrencyList.vue', () => {
  it('renders props.msg when passed', () => {
    const favourite = true;
    const wrapper = shallowMount(CurrencyList, {
      propsData: { favourite },
    });
    expect(wrapper.text()).toMatch('Delete Message');
  });
});
