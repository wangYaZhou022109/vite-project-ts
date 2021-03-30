import { ObjectDirective } from 'vue'

// usage: v-title="'v-title'"
export default {
  mounted(el, binding, vnode, prevNnode) {
    document.title = binding.value
  }
} as ObjectDirective
