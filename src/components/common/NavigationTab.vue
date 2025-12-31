<template>
  <q-btn
    unelevated
    no-caps
    class="navigation-tab sm-radius"
    :class="isActive ? 'bg-brand text-white' : 'bg-white text-brand'"
    padding="0.5rem 1rem"
    v-bind="$attrs"
  >
    <lucide-icon
      :name="icon"
      size="18px"
      class="q-mr-xs"
    />
    {{ tabName }}
    <span
      v-if="itemsAmount && !$attrs.disable"
      class="q-ml-xs"
    >
      ({{ itemsAmount }})
    </span>
  </q-btn>
</template>

<script setup>
  defineProps({
    isActive: {
      type: Boolean,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    tabName: {
      type: String,
      required: true,
    },
    itemsAmount: {
      type: Number,
      default: null,
    },
  })
</script>
