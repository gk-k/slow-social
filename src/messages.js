import { ref, computed } from 'vue';

// デフォルト言語を英語 ('en') に設定
export const currentLocale = ref('en');

export const toggleLocale = () => {
  currentLocale.value = currentLocale.value === 'en' ? 'jp' : 'en';
};

export const messages = {
  en: {
    appTitle: "🌊 Slow Social",
    skipTime: "⏩ Skip 3 mins",
    skipTitle: "Fast-forward time by 3 minutes for testing",
    connecting: "Connecting...",
    composerHeading: "Whisper your thoughts (Will arrive in 2–5 mins)",
    composerPlaceholder: "Listen to the gentle waves and take your time writing...",
    postButton: "Cast into the sea (Post)",
    myPostsTitle: "My Posts",
    publicPostsTitle: "Public Posts",
    myPostsEmpty: "Try sharing your first thought.",
    publicPostsEmpty: "No messages yet. Listen to the waves and wait.",
    drifting: "⏳ Drifting in the sea (about {m}m left)",
    viewReactions: "✨ Click to view received reactions",
    washedAshore: "✉️ Message washed ashore",
    authorYou: "You",
    authorSomeone: "Someone's whisper",
    sentWarmth: "✨ Sent your warm thoughts",
    modalTitle: "Received Reactions",
    modalClose: "Close",
    reactions: {
      like: "👍 Like",
      understand: "🤝 I feel you",
      sameHere: "🌊 Same here",
      cheers: "🍵 Great job"
    }
  },
  jp: {
    appTitle: "🌊 Slow Social",
    skipTime: "⏩ 時間を3分進める",
    skipTitle: "テスト用に時間を3分スキップします",
    connecting: "接続中...",
    composerHeading: "今思っていることをつぶやく（2〜5分後に届きます）",
    composerPlaceholder: "静かな波の音に耳を澄ませて、ゆったり書き込んでみましょう...",
    postButton: "海へ流す (投稿)",
    myPostsTitle: "My Posts (自分の投稿)",
    publicPostsTitle: "Public Posts (みんなの投稿)",
    myPostsEmpty: "最初の投稿をしてみましょう",
    publicPostsEmpty: "まだ誰も投稿していません。波の音を聴いて待ちましょう。",
    drifting: "⏳ 海を漂う中 (あと約{m}分)",
    viewReactions: "✨ クリックして届いたリアクションを見る",
    washedAshore: "✉️ メッセージが海岸に届きました",
    authorYou: "あなた",
    authorSomeone: "誰かのつぶやき",
    sentWarmth: "✨ あなたの温かい想いを届けました",
    modalTitle: "届いたリアクション",
    modalClose: "とじる",
    reactions: {
      like: "👍 いいね！",
      understand: "🤝 わかる〜",
      sameHere: "🌊 うちもおなじ",
      cheers: "🍵 お疲れ様"
    }
  }
};

export const t = computed(() => messages[currentLocale.value]);