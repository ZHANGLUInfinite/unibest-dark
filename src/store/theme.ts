import type { ThemeMode, ThemeState } from '@/hooks/types/theme'
import { defineStore } from 'pinia'
import { themeColorOptions } from '@/hooks/types/theme'

export const useThemeStore = defineStore(
  'theme',
  () => {
    /** 主题 */
    const theme = ref<ThemeState['theme']>('light')

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

    /** 设置主题变量 */
    const setThemeVars = (partialVars: Partial<ThemeState['themeVars']>) => {
      themeVars.value = { ...themeVars.value, ...partialVars }
    }

    /** 切换主题 */
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    /** 是否暗黑模式 */
    const isDark = () => {
      return theme.value === 'dark'
    }

    /**
     * 获取系统主题
     * @returns 系统主题模式
     */
    const getSystemTheme = (): ThemeMode => {
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

      return 'light' // 默认返回 light
    }

    /**
     * 设置主题（仅内部使用）
     * @param theme 主题模式
     */
    const setTheme = (newTheme: ThemeMode) => {
      theme.value = newTheme
    }

    /**
     * 初始化系统主题
     */
    const initSystemTheme = () => {
      const systemTheme = getSystemTheme()
      theme.value = systemTheme
      console.log('初始化系统主题:', theme.value)
    }
    return {
      /** 设置主题变量 */
      setThemeVars,
      /** 切换主题 */
      toggleTheme,
      /** 主题变量 */
      themeVars,
      /** 主题 */
      theme,
      /** 是否暗黑模式 */
      isDark,
      /** 获取系统主题 */
      getSystemTheme,
      /** 设置主题（仅内部使用） */
      setTheme,
      /** 初始化系统主题 */
      initSystemTheme,
    }
  },
  {
    persist: true,
  },
)
