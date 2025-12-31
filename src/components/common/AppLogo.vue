<template>
  <router-link :to="homePath">
    <div
      class="logo-container relative"
      :class="{ mini: mini }"
    >
      <q-icon
        :name="logo"
        class="cursor-pointer"
      />
    </div>
  </router-link>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import { ROUTES } from 'src/router/const'

  const props = defineProps({
    mini: {
      type: Boolean,
      default: false,
    },
  })
  const route = useRoute()

  const logo = computed(() => {
    return props.mini
      ? 'img:/src/assets/aigov-logo-mini.svg'
      : 'img:/src/assets/aigov-logo.svg'
  })
  const homePath = computed(() => {
    return { name: ROUTES.APP + '-home', query: { ...route.query } }
  })
</script>

<style lang="scss">
  .logo-container {
    margin-inline-start: 0.6rem;

    .q-icon {
      min-height: 3rem;
      width: auto;
    }

    img {
      min-height: 3rem;
      height: 3rem;
      max-height: 3rem;
    }

    &.mini {
      margin-inline-start: 0;

      .q-icon {
        min-height: 2.5rem;
        height: 2.5rem;
        max-height: 2.5rem;
      }

      img {
        min-height: 2.5rem;
        height: 2.5rem;
        max-height: 2.5rem;
      }
    }
  }
</style>
