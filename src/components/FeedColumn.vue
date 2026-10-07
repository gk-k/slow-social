<script setup>
import PostCard from './PostCard.vue';

defineProps({
  title: String,
  posts: Array,
  currentUserId: String,
  virtualNow: Number,
  emptyMessage: String
});

// 親(App.vue)へイベントをリレイ(転送)するための宣言
const emit = defineEmits(['react', 'open-modal']);
</script>

<template>
  <div class="bg-ocean-100/30 rounded-xl p-4 border border-ocean-200/50">
    <h2 class="text-lg font-bold text-ocean-800 mb-4 border-b border-ocean-200 pb-2 flex justify-between items-center">
      <span>{{ title }}</span>
      <span class="text-xs font-normal bg-ocean-200/50 px-2 py-0.5 rounded-full text-ocean-800/70">
        {{ posts.length }}件
      </span>
    </h2>

    <div v-if="posts.length === 0" class="bg-white p-6 rounded-lg shadow-sm border border-ocean-200 text-center text-ocean-800/50">
      {{ emptyMessage }}
    </div>

    <div v-else class="space-y-3">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :is-my-post="post.authorId === currentUserId"
        :virtual-now="virtualNow"
        @react="(payload) => emit('react', payload)"
        @open-modal="(post) => emit('open-modal', post)"
      />
    </div>
  </div>
</template>