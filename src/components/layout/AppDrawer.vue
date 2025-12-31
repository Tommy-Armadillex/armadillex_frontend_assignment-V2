<template>
  <nav class="drawer-wrapper relative">
    <q-drawer
      :model-value="true"
      show-if-above
      :mini="miniMode"
      :width="250"
      :mini-width="60"
      :breakpoint="500"
      class="app-drawer bg-white"
    >
      <section class="drawer-content">
        <div class="logo-section flex items-center q-px-md q-py-lg">
          <app-logo :mini="miniMode" />
        </div>

        <q-list class="main-nav">
          <q-item
            v-for="route in NAV_LINKS"
            :key="route.name"
            v-ripple
            clickable
            :to="route.path"
            :disable="isLoading"
            exact
            class="nav-item md-radius q-px-md q-py-sm"
          >
            <q-item-section avatar>
              <lucide-icon
                :name="route.icon"
                size="20px"
                class="text-brand"
              />
            </q-item-section>

            <q-item-section v-if="!miniMode">
              <q-item-label class="label-text text-14 text-info">
                {{ route.label }}
              </q-item-label>
            </q-item-section>

            <q-tooltip
              v-if="miniMode"
              anchor="center right"
              self="center left"
              :offset="[5, 0]"
            >
              {{ route.label }}
            </q-tooltip>
          </q-item>
        </q-list>
      </section>
    </q-drawer>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useQuasar } from 'quasar'

  import { NAV_LINKS } from 'src/services/consts/app.const'

  import AppLogo from 'components/common/AppLogo.vue'

  defineProps({
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  const $q = useQuasar()
  const DRAWER_BREAKPOINT = 1300
  const miniMode = computed(() => $q.screen.width < DRAWER_BREAKPOINT)
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';
  .drawer-wrapper {
    .app-drawer {
      position: relative;

      .drawer-content {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .logo-section {
        height: $header-height;
      }

      .main-nav {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-inline: 1rem;

        .nav-item {
          transition: all 0.3s ease-in-out;
          align-items: center;
          margin-bottom: 0.25rem;

          .q-item__section--avatar {
            padding-inline-end: 0;
            min-width: 30px;
          }

          &:hover {
            background: $accent;
            box-shadow: $main-shadow;
          }

          &.q-router-link--active {
            background: $brand;
            font-weight: 500;
            .label-text,
            svg {
              color: white !important;
            }
          }
        }
      }
    }

    .q-drawer--mini {
      .logo-section {
        justify-content: center;
      }
      .main-nav {
        margin-inline: 0.5rem;
        .nav-item {
          border-radius: 0.5rem !important;
          min-height: 44px !important;
          justify-content: center;
          .q-item__section--avatar {
            padding-inline: 0.75rem;
          }
        }
      }
    }
  }
</style>
