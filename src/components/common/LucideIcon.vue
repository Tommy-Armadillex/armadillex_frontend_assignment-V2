<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    :class="iconClass"
    :aria-label="ariaLabel || name"
    v-bind="$attrs"
  />

  <span
    v-else-if="showFallback"
    :class="['lucide-icon-fallback', iconClass]"
    :style="{ width: size, height: size }"
    :title="`Icon '${name}' not found`"
  >
    ?
  </span>
</template>

<script setup>
  import { computed } from 'vue'
  import { getIcon } from 'src/config/icons'
  import { log } from 'src/services/app/log.service'

  /**
   * LucideIcon - Reusable wrapper for Lucide icons
   *
   * Usage:
   * <lucide-icon name="check" size="24px" />
   * <lucide-icon name="user" size="20px" class="text-brand" />
   * <lucide-icon name="alert-circle" :stroke-width="2.5" />
   */

  const props = defineProps({
    /**
     * Icon name from the icon registry (kebab-case)
     * @type {string}
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Icon size (any valid CSS size value)
     * @type {string | number}
     */
    size: {
      type: [String, Number],
      default: '24px',
    },

    /**
     * Stroke width for the icon
     * @type {number}
     */
    strokeWidth: {
      type: Number,
      default: 2,
    },

    /**
     * Color class or custom class
     * @type {string}
     */
    color: {
      type: String,
      default: '',
    },

    /**
     * Aria label for accessibility
     * @type {string}
     */
    ariaLabel: {
      type: String,
      default: '',
    },

    /**
     * Show fallback when icon not found
     * @type {boolean}
     */
    showFallback: {
      type: Boolean,
      default: true,
    },
  })

  defineOptions({
    inheritAttrs: false,
  })

  const iconComponent = computed(() => {
    return getIcon(props.name)
  })

  const iconClass = computed(() => {
    const classes = ['lucide-icon']

    if (props.color) {
      // Support both Quasar color classes and custom classes
      if (props.color.startsWith('text-')) {
        classes.push(props.color)
      } else {
        classes.push(`text-${props.color}`)
      }
    }

    return classes.join(' ')
  })

  // Development warning for missing icons
  if (process.env.DEV && !iconComponent.value && props.name) {
    log.error(
      `🔴 [LucideIcon] Icon "${props.name}" not found in registry. Add it to src/config/icons.js`
    )
  }
</script>

<style lang="scss" scoped>
  .lucide-icon {
    display: inline-flex;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .lucide-icon-fallback {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: $warning;
    color: white;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
  }
</style>
