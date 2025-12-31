<template>
  <div
    class="basic-no-data-container flex column items-center justify-center no-wrap lg-radius q-pa-xl text-center"
  >
    <q-icon
      v-if="isCustomIcon"
      :name="icon"
      size="70px"
      class="empty-state-icon q-mb-sm"
    />
    <lucide-icon
      v-else
      :name="icon"
      color="info"
      size="70px"
      :stroke-width="1.5"
      class="empty-state-icon q-mb-xs"
    />

    <h5 class="q-mb-xs text-14 text-info text-font-medium">{{ title }}</h5>

    <p class="text-11 text-info">{{ message }}</p>

    <p class="or-separator q-my-sm text-12 text-brand-light">or</p>
    <q-btn
      color="brand"
      outline
      no-caps
      unelevated
      class="action-btn sm-radius q-px-lg"
      @click="$emit('action-click')"
    >
      <template #default>
        <lucide-icon
          v-if="actionIcon"
          :name="actionIcon"
          size="16px"
          class="q-mr-xs"
        />
        <span class="text-12">
          {{ actionLabel }}
        </span>
      </template>
    </q-btn>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    // Filter state
    hasActiveFilters: {
      type: Boolean,
      required: true,
    },
    // Entity type (for customizing messages)
    entityType: {
      type: String,
      default: 'items',
    },
    actionLabel: {
      type: String,
      default: 'Create New',
    },
    actionIcon: {
      type: String,
      default: null,
    },
    // Icon customization (optional)
    icon: {
      type: String,
      default: null,
    },
  })

  defineEmits(['action-click'])

  // Computed properties for dynamic content
  const icon = computed(
    () => props.icon || (props.hasActiveFilters ? 'package-open' : 'package-x')
  )
  const isCustomIcon = computed(() => icon.value?.startsWith('img:'))

  const title = computed(() => {
    if (props.hasActiveFilters) {
      return `No results found.`
    } else {
      return `No ${props.entityType}.`
    }
  })

  const message = computed(() => {
    if (props.hasActiveFilters) {
      return `No ${props.entityType} match your current search. `
    } else {
      return `You do not have any ${props.entityType} currently.`
    }
  })
</script>

<style lang="scss">
  .q-table__bottom--nodata {
    height: 100%;

    .basic-no-data-container {
      width: 100%;
      height: 100%;
      margin: 0;

      .empty-state-icon {
        opacity: 0.5;
      }
      .action-btn {
        padding-block: 0 !important;
      }
    }

    .or-separator {
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 50px;
        height: 1px;
        background-color: $brand-light;
      }
      &::before {
        left: 25px;
      }
      &::after {
        right: 25px;
      }
    }
  }
</style>
