import test from 'ava'
import Vue from 'vue'
import Pagebar from '../src/pagebar.vue'

function createComponentInstance(propsData) {
  const Constructor = Vue.extend(Pagebar)
  return new Constructor({ propsData: data }).$mount()
}

test('default config', t => {
  // create instance
  const vm = createComponentInstance({})

  // verify container
  t.is(vm.$el.tagName, "TABLE")
  t.is(vm.$el.getAttribute("class"), "st-pagebar")
})