<script lang="ts" setup>
import { currRoute } from '@/utils'

const { loadingOptions, currentPage } = storeToRefs(useGlobalLoading())

const { close: closeGlobalLoading } = useGlobalLoading()

const loading = useToast('globalLoading')

// #ifdef MP-ALIPAY
const hackAlipayVisible = ref(false)

nextTick(() => {
  hackAlipayVisible.value = true
})
// #endif

watch(() => loadingOptions.value, (newVal) => {
  if (newVal && newVal.show) {
    if (currentPage.value === currRoute().path) {
      loading.loading(loadingOptions.value)
    }
  }
  else {
    loading.close()
  }
})
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <!-- #ifdef MP-ALIPAY -->
  <wd-toast v-if="hackAlipayVisible" selector="globalLoading" :closed="closeGlobalLoading" />
  <!-- #endif -->
  <!-- #ifndef MP-ALIPAY -->
  <wd-toast selector="globalLoading" :closed="closeGlobalLoading" />
  <!-- #endif -->
</template>
