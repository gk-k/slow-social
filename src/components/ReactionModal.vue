<script setup>
import { t } from '../messages';

const props = defineProps({
  post: Object,
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const reactionKeys = ['like', 'understand', 'sameHere', 'cheers'];
</script>

<template>
  <div v-if="isOpen && post" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-800/40 backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-ocean-200 animate-in fade-in zoom-in duration-200">
      
      <!-- Title -->
      <div class="flex justify-between items-center mb-4 pb-2 border-b border-ocean-100">
        <h3 class="text-lg font-bold text-ocean-800">{{ t.modalTitle }}</h3>
        <button @click="emit('close')" class="text-ocean-600/60 hover:text-ocean-800 text-xl font-bold px-2">✕</button>
      </div>

      <!-- Post Body -->
      <div class="bg-ocean-50 p-4 rounded-xl border border-ocean-200/60 text-ocean-800 text-sm mb-6 whitespace-pre-wrap">
        {{ post.content }}
      </div>

      <!-- Reactions Tally -->
      <div class="space-y-3 mb-6">
        <div 
          v-for="key in reactionKeys" 
          :key="key"
          class="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-ocean-200 shadow-sm"
        >
          <span class="text-sm font-medium text-ocean-800">{{ t.reactions[key] }}</span>
          <span class="text-base font-bold text-ocean-600 bg-ocean-100/50 px-3 py-0.5 rounded-full">
            {{ post.reactions?.[key] || 0 }}
          </span>
        </div>
      </div>

      <!-- Close Button -->
      <button 
        @click="emit('close')"
        class="w-full bg-ocean-100 hover:bg-ocean-200 text-ocean-800 font-semibold py-2.5 rounded-xl transition-colors border border-ocean-200 text-sm"
      >
        {{ t.modalClose }}
      </button>

    </div>
  </div>
</template>