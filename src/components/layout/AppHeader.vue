<template>
  <q-header
    elevated
    no-shadow
    class="app-header no-shadow bg-accent-light"
  >
    <q-toolbar class="grid full-height no-shadow q-px-lg">
      <div class="header-content flex items-center">
        <h6 class="text-20 text-primary text-font-bold">{{ headerTitle }}</h6>
      </div>

      <div class="user-actions flex items-center">
        <div class="user-info">
          <q-avatar
            size="40px"
            color="brand"
            text-color="white"
          >
            <span class="text-16">A</span>
          </q-avatar>

          <div class="user-details flex column">
            <span
              v-if="!isLoading"
              class="user-name overflow-hidden ellipsis text-18 text-primary text-font-bold"
            >
              Hello User
            </span>

            <q-skeleton
              v-else
              type="text"
              width="90px"
              height="20px"
            />
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import { ROUTES } from 'src/router/const'

  defineProps({
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  const route = useRoute()
  const headerTitle = computed(() => {
    const titles = {
      [ROUTES.TICKETS]: 'Your requests',
      [ROUTES.APP + '-home']: 'Welcome back, User',
    }
    return titles[route.name] || 'Requests'
  })
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';
  .app-header {
    height: $header-height;
    max-width: $large-screen;
    z-index: 1000;

    .q-toolbar {
      width: 100%;
      grid-template-columns: 1fr auto;
      justify-content: space-between;
      align-items: center;
    }

    .header-content {
      display: flex;
      align-items: center;
    }

    .q-layout__shadow {
      display: none;
    }
  }

  .user-actions {
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .user-details {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        line-height: 1.2;
        min-width: 0;
      }

      .user-name {
        max-width: 15rem;
        min-width: 0;
      }
    }
  }
</style>
