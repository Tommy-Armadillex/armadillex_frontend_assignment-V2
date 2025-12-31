<template>
  <q-card
    flat
    class="details-section lg-radius bg-white q-mb-md"
  >
    <q-card-section class="border-bottom">
      <h5 class="q-mb-xxs q-mt-none text-16 text-font-semibold">
        Request Details
      </h5>

      <p class="section-subtitle q-mb-none text-12 text-info">
        Explain why you need access to the product
      </p>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-list
        dense
        class="questions-list"
      >
        <q-item
          v-for="(question, idx) in allQuestions"
          :key="question.questionId"
          class="question-item"
        >
          <section class="question-content">
            <div class="flex row items-baseline no-wrap q-mb-xs">
              <span class="text-14">{{ idx + 1 }}.</span>

              <section class="question-container flex column q-ml-xxs">
                <p
                  class="question-subject text-14 text-primary-dark text-font-medium"
                >
                  {{ question.questionSubject }}
                  <span
                    v-if="question.required"
                    class="text-brand"
                  >
                    *
                  </span>
                </p>

                <p
                  v-if="question.questionBody"
                  class="question-body q-ma-none text-12 text-info"
                >
                  {{ question.questionBody }}
                </p>
              </section>
            </div>

            <p
              v-if="hasAnswer(question.questionId)"
              class="answer-text sm-radius bg-background-light q-pa-sm text-14"
            >
              {{ getAnswer(question.questionId) }}
            </p>

            <p
              v-else
              class="no-answer-text sm-radius bg-background-light q-pa-sm text-12 text-info text-italic"
            >
              You have not answered this question
            </p>
          </section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    ticket: {
      type: Object,
      required: true,
    },
  })

  const allQuestions = computed(() => {
    // Mock questions for tech challenge
    return [
      {
        questionId: 'q-001',
        questionSubject: 'Use Case',
        questionBody:
          'Please describe how you plan to use this AI product in your work.',
        required: true,
      },
      {
        questionId: 'q-002',
        questionSubject: 'Team Usage',
        questionBody: 'Which teams or departments will be using this product?',
        required: true,
      },
      {
        questionId: 'q-003',
        questionSubject: 'Expected Volume',
        questionBody: 'What is your expected usage volume per month?',
        required: false,
      },
    ]
  })

  function hasAnswer(questionId) {
    const answer = props.ticket.answers?.[questionId]
    return answer !== undefined && answer !== null && answer !== ''
  }

  function getAnswer(questionId) {
    return props.ticket.answers?.[questionId] || ''
  }
</script>

<style lang="scss">
  .details-section {
    .section-subtitle {
      line-height: 1.4;
    }

    .questions-list {
      padding-top: 1rem;

      .q-item {
        padding: 0 0 1rem !important;
        align-items: flex-start;

        &:last-of-type {
          padding-bottom: 0 !important;
        }

        .question-content {
          flex: 1;
          min-width: 0;
          position: relative;

          .question-text {
            margin-left: 0.125rem;
          }

          .question-container {
            margin-left: 0.25rem;
          }

          .answer-text,
          .no-answer-text {
            line-height: 1;
            min-height: 4rem;
          }
        }

        .question-action {
          position: absolute;
          right: 0.5rem;
          bottom: 0.35rem;

          .answer-now-btn {
            padding: 0.1rem 0.5rem;
            line-height: 1;
            min-height: auto;
            text-decoration: none;
            transition: text-decoration 0.2s ease;

            &:hover {
              color: $brand !important;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>
