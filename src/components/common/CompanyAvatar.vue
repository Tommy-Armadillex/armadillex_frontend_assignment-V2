<template>
  <q-avatar
    :size="size"
    :class="avatarClass"
  >
    <q-img
      v-if="faviconUrl && !imageError"
      :src="faviconUrl"
      :alt="alt"
      :ratio="1"
      fit="contain"
      @error="handleImageError"
    >
      <template #loading>
        <div class="absolute-full flex flex-center bg-secondary-light">
          <q-spinner
            color="accent"
            :size="iconSize"
          />
        </div>
      </template>
    </q-img>

    <div
      v-else
      class="absolute-full flex flex-center bg-secondary"
    >
      <lucide-icon
        :name="fallbackIcon"
        :size="iconSize"
        color="accent"
      />
    </div>
  </q-avatar>
</template>

<script setup>
  import { log } from 'src/services/app/log.service'
  import { computed, ref } from 'vue'
  import { extractDomainFromUrl } from 'src/services/helpers/util.helper'

  const props = defineProps({
    website: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '32px',
    },
    alt: {
      type: String,
      default: 'Company logo',
    },
    fallbackIcon: {
      type: String,
      default: 'store',
    },
    avatarClass: {
      type: String,
      default: 'company-avatar light-bordered',
    },
  })

  const imageError = ref(false)

  const faviconUrl = computed(() => {
    if (!props.website || imageError.value) {
      return ''
    }

    try {
      const domain = extractDomainFromUrl(props.website)
      if (!domain) return ''

      // URL encode the domain for the favicon service
      const encodedDomain = encodeURIComponent(domain)

      // Return Google's favicon service URL
      return `https://www.google.com/s2/favicons?domain=${encodedDomain}&sz=256`
    } catch (error) {
      log.error('Error creating favicon URL:', error)
      return ''
    }
  })

  const iconSize = computed(() => {
    // Calculate icon size as 60% of avatar size
    const sizeValue = parseInt(props.size)
    return isNaN(sizeValue) ? '16px' : `${Math.floor(sizeValue * 0.6)}px`
  })

  function handleImageError() {
    imageError.value = true
  }
</script>

<style lang="scss">
  .company-avatar {
    background-color: white;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
