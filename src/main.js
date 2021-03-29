// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import util from './utils/util'


export default function (Vue, { router, head, isClient }) {
  Vue.use(ElementUI)

  Vue.use(mavonEditor)

  // 给 Vue 实例添加共享方法 
  Vue.prototype.$share = function (message) {
    if (!message) {
        message = window?.location
    } else {
        message = window?.location.origin + message
    }
    if (util.copy(message)) {
        Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'success'
        })
    } else {
        Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'warning'
        })
    }
  }

  Vue.prototype.$mobileShare = function (message) {
      if (!message) {
          message = window?.location
      } else {
        message = window?.location.origin + message
      }
      if (util.copy(message)) {
          Vue.prototype.$dialog.alert({
              title: '分享',
              message: '链接已复制,去分享给好友吧!!'
          })
      } else {
          Vue.prototype.$dialog.alert({
              title: '分享',
              message: '链接复制失败,可能因为浏览器不兼容'
          })
      }
  }

  Vue.prototype.$markdown = function (value) {
    return mavonEditor.markdownIt.render(value)
  }

  Vue.prototype.$util = util

  Vue.filter('toTime', util.utcToLocal)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
