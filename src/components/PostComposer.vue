<script setup>
import { ref } from 'vue';
import { t } from '../messages';

const props = defineProps({
  disabled: Boolean
});

const emit = defineEmits(['submit-post']);
const content = ref('');

const handleSubmit = () => {
  if (!content.value.trim() || props.disabled) return;
  emit('submit-post', content.value.trim());
  content.value = '';
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-ocean-200 p-6 mb-8">
    <form @submit.prevent="handleSubmit">
      <label class="block text-sm font-semibold text-ocean-800 mb-2">{{ t.composerHeading }}</label>
      <textarea
        v-model="content"
        rows="3"
        :placeholder="t.composerPlaceholder"
        class="w-full p-3 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-600/30 text-ocean-800 placeholder-ocean-800/40 resize-none mb-3"
        :disabled="disabled"
      ></textarea>
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="!content.trim() || disabled"
          class="bg-ocean-600 hover:bg-ocean-600/90 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {{ t.postButton }}
        </button>
      </div>
    </form>
  </div>
</template>