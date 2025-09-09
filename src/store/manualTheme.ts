import type { ThemeColorOption, ThemeMode, ThemeState } from '@/hooks/types/theme'
import { defineStore } from 'pinia'
import { themeColorOptions } from '@/hooks/types/theme'

/**
 * 完整版主题状态管理
 * 支持手动切换主题、主题色选择、跟随系统主题等完整功能
 */
export const useManualThemeStore = defineStore('manual-theme', () => {
  /** 主题 */
  const theme = ref<ThemeState['theme']>('light')

  /** 是否跟随系统主题 */
  const followSystem = ref<boolean>(true)

  /** 用户是否手动设置过主题 */
  const hasUserSet = ref<boolean>(false)

  /** 当前主题色 */
  const currentThemeColor = ref<ThemeColorOption>(themeColorOptions[0])

  /** 主题变量 */
  const themeVars = ref<ThemeState['themeVars']>({
    darkBackground: '#0f0f0f',
    darkBackground2: '#1a1a1a',
    darkBackground3: '#242424',
    darkBackground4: '#2f2f2f',
    darkBackground5: '#3d3d3d',
    darkBackground6: '#4a4a4a',
    darkBackground7: '#606060',
    darkColor: '#ffffff',
    darkColor2: '#e0e0e0',
    darkColor3: '#a0a0a0',
    colorTheme: themeColorOptions[0].primary,
  })

  /** 是否暗黑模式 */
  const isDark = computed(() => theme.value === 'dark')

  /**
   * 设置导航栏颜色
   */
  const setNavigationBarColor = () => {
    uni.setNavigationBarColor({
      frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
      backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
    })
  }

  /**
   * 获取系统主题
   * @returns 系统主题模式
   */
  const getSystemTheme = (): ThemeMode => {
    try {
      // #ifdef MP-WEIXIN
      // 微信小程序使用 getAppBaseInfo
      const appBaseInfo = uni.getAppBaseInfo()
      if (appBaseInfo && appBaseInfo.theme) {
        return appBaseInfo.theme as ThemeMode
      }
      // #endif

      // #ifndef MP-WEIXIN
      // 其他平台使用 getSystemInfoSync
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo && systemInfo.theme) {
        return systemInfo.theme as ThemeMode
      }
      // #endif
    }
    catch (error) {
      console.warn('获取系统主题失败:', error)
    }
    return 'light' // 默认返回 light
  }

  /**
   * 初始化主题
   */
  const initTheme = () => {
    // 如果用户已手动设置且不跟随系统，保持当前主题
    if (hasUserSet.value && !followSystem.value) {
      console.log('使用用户设置的主题:', theme.value)
      setNavigationBarColor()
      return
    }

    // 获取系统主题
    const systemTheme = getSystemTheme()

    // 如果是首次启动或跟随系统，使用系统主题
    if (!hasUserSet.value || followSystem.value) {
      theme.value = systemTheme
      if (!hasUserSet.value) {
        followSystem.value = true
        console.log('首次启动，使用系统主题:', theme.value)
      }
      else {
        console.log('跟随系统主题:', theme.value)
      }
    }

    setNavigationBarColor()
  }

  /**
   * 手动切换主题
   * @param mode 指定主题模式，不传则自动切换
   */
  const toggleTheme = (mode?: ThemeMode) => {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
    hasUserSet.value = true // 标记用户已手动设置
    followSystem.value = false // 不再跟随系统
    setNavigationBarColor()
  }

  /**
   * 设置是否跟随系统主题
   * @param follow 是否跟随系统
   */
  const setFollowSystem = (follow: boolean) => {
    followSystem.value = follow
    if (follow) {
      hasUserSet.value = false
      initTheme() // 重新获取系统主题
    }
  }

  /**
   * 设置主题色
   * @param color 主题色选项
   */
  const setCurrentThemeColor = (color: ThemeColorOption) => {
    currentThemeColor.value = color
    themeVars.value.colorTheme = color.primary
  }

  return {
    // 状态
    theme,
    followSystem,
    hasUserSet,
    currentThemeColor,
    themeVars,

    // 计算属性
    isDark,

    // 方法
    toggleTheme,
    setFollowSystem,
    setNavigationBarColor,
    setCurrentThemeColor,
    getSystemTheme,
    initTheme,
  }
})
