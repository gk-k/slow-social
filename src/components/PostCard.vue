<script setup>
import { ref, computed, onMounted } from 'vue';
import { t } from '../messages';

const props = defineProps({
  post: Object,
  isMyPost: Boolean,
  virtualNow: Number
});

const emit = defineEmits(['react', 'open-modal']);

const userReaction = ref(null);

const reactionKeys = ['like', 'understand', 'sameHere', 'cheers'];

onMounted(() => {
  const savedReactions = JSON.parse(localStorage.getItem('my_slow_social_reactions') || '{}');
  if (savedReactions[props.post.id]) {
    userReaction.value = savedReactions[props.post.id];
  }
});

const isPublished = computed(() => {
  if (!props.post.createdAt) return false;
  const createdMs = props.post.createdAt.toMillis ? props.post.createdAt.toMillis() : props.post.createdAt;
  const delayMs = (props.post.delayMinutes || 2) * 60 * 1000;
  return props.virtualNow >= (createdMs + delayMs);
});

const remainingMinutes = computed(() => {
  if (!props.post.createdAt) return 0;
  const createdMs = props.post.createdAt.toMillis ? props.post.createdAt.toMillis() : props.post.createdAt;
  const delayMs = (props.post.delayMinutes || 2) * 60 * 1000;
  const diffMs = (createdMs + delayMs) - props.virtualNow;
  return Math.max(1, Math.ceil(diffMs / 60000));
});

const handleCardClick = () => {
  if (props.isMyPost && isPublished.value) {
    emit('open-modal', props.post);
  }
};

const handleReactionClick = (key) => {
  if (userReaction.value) return;

  emit('react', { postId: props.post.id, reactionKey: key });
  
  userReaction.value = key;
  const savedReactions = JSON.parse(localStorage.getItem('my_slow_social_reactions') || '{}');
  savedReactions[props.post.id] = key;
  localStorage.setItem('my_slow_social_reactions', JSON.stringify(savedReactions));
};
</script>

<template>
  <div 
    @click="handleCardClick"
    class="bg-white p-4 rounded-lg shadow-sm border transition-all duration-200"
    :class="[
      isMyPost && isPublished 
        ? 'border-ocean-600/50 bg-gradient-to-r from-white to-ocean-50/50 hover:shadow-md cursor-pointer hover:border-ocean-600' 
        : 'border-ocean-200'
    ]"
  >
    <!-- Content -->
    <div class="text-ocean-800 text-base whitespace-pre-wrap mb-3">{{ post.content }}</div>
    
    <!-- Reaction Buttons -->
    <div v-if="isPublished && !isMyPost" class="my-3 pt-2 border-t border-ocean-100">
      <div class="flex flex-wrap gap-1.5 items-center">
        <button
          v-for="key in reactionKeys"
          :key="key"
          @click.stop="handleReactionClick(key)"
          :disabled="!!userReaction"
          class="text-xs border px-2.5 py-1 rounded-full transition-all flex items-center gap-1"
          :class="[
            userReaction === key
              ? 'bg-ocean-600 text-white border-ocean-600 font-bold shadow-sm'
              : userReaction
                ? 'bg-gray-50 text-gray-400 border-gray-200 opacity-60 cursor-not-allowed'
                : 'bg-ocean-50 hover:bg-ocean-100 text-ocean-800 border-ocean-200/80 active:scale-95'
          ]"
        >
          <span>{{ t.reactions[key] }}</span>
          <span v-if="userReaction === key" class="text-white font-bold">✓</span>
        </button>
      </div>
      <p v-if="userReaction" class="text-[11px] text-ocean-600 mt-1.5 font-medium flex items-center gap-1">
        <span>{{ t.sentWarmth }}</span>
      </p>
    </div>

    <div class="flex justify-between items-center text-xs text-ocean-600/70 pt-2 border-t border-ocean-50">
      <!-- Status Badge -->
      <div>
        <span v-if="!isPublished" class="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {{ t.drifting.replace('{m}', remainingMinutes) }}
        </span>
        <span v-else-if="isMyPost" class="text-ocean-600 bg-ocean-100/60 px-2.5 py-1 rounded-full font-semibold border border-ocean-200 inline-flex items-center gap-1">
          {{ t.viewReactions }}
        </span>
        <span v-else class="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 font-medium inline-flex items-center gap-1">
          {{ t.washedAshore }}
        </span>
      </div>

      <!-- Author Tag -->
      <div>
        <span v-if="isMyPost" class="font-medium text-ocean-600">{{ t.authorYou }}</span>
        <span v-else>{{ t.authorSomeone }}</span>
      </div>
    </div>
  </div>
</template>