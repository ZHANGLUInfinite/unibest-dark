<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'

onLaunch((options) => {
  console.log('App Launch', options)
})
onShow((options) => {
  console.log('App Show', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 这个设置是生效于App.ku.vue内部的，放到这里是因为小程序端App.ku.vue内部设置的样式无效。
// 设置默认的页面高度为占满，并设置默认的页面背景色为浅色背景
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  // 解决下级子元素marginTop导致的页面空白；
  overflow: auto;
  background: $page-light-background !important;
}

// 暗黑模式下，默认页面背景色为深色背景。
.page-wraper.wot-theme-dark {
  background: $page-dark-background !important;
}
</style>
