<template>
  <section class="error-state">
    <q-banner class="lg-radius bg-white q-pa-lg text-negative">
      <lucide-icon
        name="alert-circle"
        size="5rem"
        class="q-mb-md"
      />

      <p class="q-mb-lg text-24">{{ message }}</p>

      <div class="error-actions flex justify-center">
        <q-btn
          flat
          label="Try again"
          color="primary"
          class="md-radius light-bordered text-18"
          no-caps
          @click="$emit('retry')"
        />
      </div>
    </q-banner>
  </section>
</template>

<script setup>
  defineEmits(['retry'])
  defineProps({
    message: {
      type: String,
      default: 'Failed to load data',
    },
  })
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;

    .q-banner {
      min-width: 300px;
      box-shadow: $btn-shadow;
      border: 1px solid $warning;
    }
  }
</style>
