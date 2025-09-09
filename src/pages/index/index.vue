<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'

import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  name: 'Home',
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const loading = useGlobalLoading()

const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite5 + UnoCss + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
console.log('index/index 首页打印了')

const {
  theme,
  toggleTheme,
  currentThemeColor,
  showThemeColorSheet,
  themeColorOptions,
  openThemeColorPicker,
  closeThemeColorPicker,
  selectThemeColor,
} = useManualTheme()

const isDark = computed({
  get() {
    return theme.value === 'dark'
  },
  set() {
    toggleTheme()
  },
})
// 处理主题色选择
function handleThemeColorSelect(option: any) {
  selectThemeColor(option)
}

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
})

function toLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
  // loading.loading({
  //   msg: '数据加载中',
  //   cover: true,
  // })
}
</script>

<template>
  <view class="px-4 pt-2 darkBgAndText" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <view class="mt-10">
      <image src="/static/logo.svg" alt="" class="mx-auto block h-28 w-28" />
    </view>
    <view class="mt-4 text-center text-4xl text-[#d14328]">
      unibest
    </view>
    <view class="mb-8 mt-2 text-center text-2xl">
      最好用的 uniapp 开发模板
    </view>

    <view class="m-auto mb-2 max-w-100 text-justify indent text-4">
      {{ description }}
    </view>
    <view class="mt-4 text-center">
      作者：
      <text class="text-green-500">
        菲鸽
      </text>
    </view>
    <view class="mt-4 text-center">
      官网地址：
      <text class="text-green-500">
        https://unibest.tech
      </text>
    </view>

    <!-- #ifdef H5 -->
    <view class="mt-4 text-center">
      <a href="https://unibest.tech/base/3-plugin" target="_blank" class="text-green-500">
        新手请看必看章节1：
      </a>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="mt-4 text-center">
      新手请看必看章节1：
      <text class="text-green-500">
        https://unibest.tech/base/3-plugin
      </text>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="mt-4 text-center">
      <a href="https://unibest.tech/base/14-faq" target="_blank" class="text-green-500">
        新手请看必看章节2：
      </a>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="mt-4 text-center">
      新手请看必看章节2：
      <text class="text-green-500">
        https://unibest.tech/base/14-faq
      </text>
    </view>
    <!-- #endif -->

    <!-- <view class="mt-4 text-center">
      <wd-button type="primary" class="ml-2" @click="themeStore.setThemeVars({ colorTheme: 'red' })">
        设置主题变量
      </wd-button>
    </view> -->
    <view class="mt-4 text-center">
      UI组件官网：<text class="text-green-500">
        https://wot-design-uni.cn
      </text>
    </view>
    <demo-block title="基础设置" transparent>
      {{ theme }}
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell title="暗黑模式">
          <wd-switch v-model="isDark" size="18px" />
        </wd-cell>
        <wd-cell title="选择主题色" is-link @click="openThemeColorPicker">
          <view class="flex items-center justify-end gap-2">
            <view class="h-4 w-4 rounded-full" :style="{ backgroundColor: currentThemeColor.primary }" />
            <text>{{ currentThemeColor.name }}</text>
          </view>
        </wd-cell>
      </wd-cell-group>
    </demo-block>
    <wd-button class="mt-4 text-center" block @click="toLogin">
      点击去登录页
    </wd-button>
    <view class="h-6" />

    <!-- 主题色选择 ActionSheet -->
    <wd-action-sheet
      v-model="showThemeColorSheet" title="选择主题色" :close-on-click-action="true"
      @cancel="closeThemeColorPicker"
    >
      <view class="px-4 pb-4">
        <view
          v-for="option in themeColorOptions" :key="option.value"
          class="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 dark:border-gray-700"
          @click="handleThemeColorSelect(option)"
        >
          <view class="flex items-center gap-3">
            <view
              class="h-6 w-6 border-2 border-gray-200 rounded-full dark:border-gray-600"
              :style="{ backgroundColor: option.primary }"
            />
            <text class="text-4 text-gray-800 dark:text-gray-200">
              {{ option.name }}
            </text>
          </view>
          <wd-icon v-if="currentThemeColor.value === option.value" name="check" :color="option.primary" size="20px" />
        </view>
      </view>
      <wd-gap :height="50" />
    </wd-action-sheet>
  </view>
</template>
