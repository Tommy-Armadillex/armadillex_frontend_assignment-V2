<template>
  <nav class="tickets-directory-nav">
    <q-list class="directory-list">
      <q-item
        v-for="directory in directories"
        :key="directory.id"
        v-ripple
        clickable
        :class="[
          'directory-item',
          'md-radius',
          { 'directory-item-active': filterBy.status === directory.id },
        ]"
        @click="onSetDirectory(directory.id)"
      >
        <q-item-section avatar>
          <lucide-icon
            :name="directory.icon"
            :size="20"
            :color="filterBy.status === directory.id ? 'primary-dark' : 'info'"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="directory-label text-14">
            {{ directory.label }}
          </q-item-label>
        </q-item-section>

        <q-item-section
          v-if="directory.count !== null && directory.count !== undefined"
          side
        >
          <q-badge
            :color="filterBy.status === directory.id ? 'brand' : 'white'"
            :text-color="filterBy.status === directory.id ? 'white' : 'info'"
            rounded
            class="directory-count-badge"
          >
            {{ directory.count }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useTicketStore } from 'src/stores/ticket'

  import { TICKET_DIRECTORIES } from 'src/services/consts/ticket.const'

  const ticketStore = useTicketStore()
  const filterBy = computed(() => ticketStore.filterBy)

  const directories = computed(() => {
    return TICKET_DIRECTORIES.map((directory) => {
      return {
        ...directory,
        count: ticketStore.directoryCounts[directory.id],
      }
    })
  })

  function onSetDirectory(directoryId) {
    ticketStore.updateFilters({ status: directoryId })
  }
</script>

<style lang="scss">
  .tickets-directory-nav {
    .directory-list {
      padding: 0;

      .directory-item {
        padding: 0.45rem 1rem;
        margin: 0.25rem 0;
        transition: all 0.2s ease;
        border: 1px solid transparent;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid $border;
        }

        &.directory-item-active {
          background-color: white;
          border: 1px solid $border;

          .directory-label {
            color: $primary-dark;
            font-weight: 500;
          }
        }

        .q-item__section--avatar {
          min-width: 2rem;
          padding-inline-end: 0.75rem;
        }

        .directory-label {
          color: $info;
          transition: color 0.2s ease;
        }

        .directory-count-badge {
          min-width: 1.65rem;
          height: 1.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          transition: all 0.2s ease;
        }
      }
    }
  }
</style>
