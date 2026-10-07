<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { auth, db, signInAnonymously, onAuthStateChanged } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { currentLocale, toggleLocale, t } from './messages';

import PostComposer from './components/PostComposer.vue';
import FeedColumn from './components/FeedColumn.vue';
import ReactionModal from './components/ReactionModal.vue';

const currentUser = ref(null);
const isLoadingAuth = ref(true);
const allPosts = ref([]);

const selectedPostForModal = ref(null);
const isModalOpen = ref(false);

const nowMs = ref(Date.now());
const debugTimeOffsetMs = ref(0);
let timer = null;

const virtualNow = computed(() => nowMs.value + debugTimeOffsetMs.value);

onMounted(() => {
  timer = setInterval(() => {
    nowMs.value = Date.now();
  }, 1000);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user;
      isLoadingAuth.value = false;
      subscribePosts();
    } else {
      signInAnonymously(auth).catch((error) => {
        console.error("Auth error:", error);
        isLoadingAuth.value = false;
      });
    }
  });
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const subscribePosts = () => {
  const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  onSnapshot(postsQuery, (snapshot) => {
    allPosts.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (selectedPostForModal.value) {
      const updated = allPosts.value.find(p => p.id === selectedPostForModal.value.id);
      if (updated) selectedPostForModal.value = updated;
    }
  });
};

const handleAddPost = async (content) => {
  if (!currentUser.value) return;
  const randomDelayMinutes = Math.floor(Math.random() * 4) + 2;

  try {
    await addDoc(collection(db, 'posts'), {
      content,
      authorId: currentUser.value.uid,
      createdAt: serverTimestamp(),
      delayMinutes: randomDelayMinutes,
      reactions: { like: 0, understand: 0, sameHere: 0, cheers: 0 }
    });
  } catch (error) {
    console.error("Post error:", error);
  }
};

const handleReact = async ({ postId, reactionKey }) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      [`reactions.${reactionKey}`]: increment(1)
    });
  } catch (error) {
    console.error("Reaction error:", error);
  }
};

const handleOpenModal = (post) => {
  selectedPostForModal.value = post;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedPostForModal.value = null;
};

const isPostPublished = (post) => {
  if (!post.createdAt) return false;
  const createdMs = post.createdAt.toMillis ? post.createdAt.toMillis() : Date.now();
  const delayMs = (post.delayMinutes || 2) * 60 * 1000;
  return virtualNow.value >= (createdMs + delayMs);
};

const myPosts = computed(() => {
  if (!currentUser.value) return [];
  return allPosts.value.filter(p => p.authorId === currentUser.value.uid);
});

const publicPosts = computed(() => {
  return allPosts.value.filter(p => isPostPublished(p));
});

const advanceTime = () => {
  debugTimeOffsetMs.value += 3 * 60 * 1000;
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-ocean-200 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-ocean-600">{{ t.appTitle }}</h1>
        <div class="flex items-center gap-3">
          <!-- Language Switcher Button -->
          <button
            @click="toggleLocale"
            class="text-xs bg-ocean-50 hover:bg-ocean-100 text-ocean-800 border border-ocean-200 px-3 py-1 rounded-full font-bold transition-all shadow-sm flex items-center gap-1"
          >
            <span>{{ currentLocale === 'en' ? '🇺🇸 EN' : '🇯🇵 JP' }}</span>
            <span class="text-[10px] text-ocean-600 font-normal">🌐 Switch</span>
          </button>

          <!-- Skip Time Button -->
          <button
            @click="advanceTime"
            class="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 px-3 py-1 rounded-full transition-colors"
            :title="t.skipTitle"
          >
            {{ t.skipTime }}
          </button>

          <div class="text-sm text-ocean-600/70 bg-ocean-50 px-3 py-1 rounded-full border border-ocean-200">
            <span v-if="isLoadingAuth">{{ t.connecting }}</span>
            <span v-else-if="currentUser">ID: {{ currentUser.uid.slice(0, 8) }}...</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 py-8">
      <PostComposer :disabled="isLoadingAuth" @submit-post="handleAddPost" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeedColumn
          :title="t.myPostsTitle"
          :posts="myPosts"
          :current-user-id="currentUser?.uid"
          :virtual-now="virtualNow"
          :empty-message="t.myPostsEmpty"
          @open-modal="handleOpenModal"
        />

        <FeedColumn
          :title="t.publicPostsTitle"
          :posts="publicPosts"
          :current-user-id="currentUser?.uid"
          :virtual-now="virtualNow"
          :empty-message="t.publicPostsEmpty"
          @react="handleReact"
        />
      </div>
    </main>

    <!-- Reaction Modal -->
    <ReactionModal
      :post="selectedPostForModal"
      :is-open="isModalOpen"
      @close="handleCloseModal"
    />
  </div>
</template>