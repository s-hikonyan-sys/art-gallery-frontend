<template>
  <div class="about">
    <div class="container">
      <h1>アーティストについて</h1>
      <div class="content">
        <p>
          こんにちは。油絵を描いています。
          心を込めて描いた作品を皆様にお届けしたいと思っています。
        </p>
        <p>
          風景、静物、人物など、様々なテーマで作品を制作しています。
          お気に入りの作品が見つかりましたら、お気軽にお問い合わせください。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  padding: 4rem 2rem;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.about h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.content {
  line-height: 2;
  font-size: 1.1rem;
}

.content p {
  margin-bottom: 1.5rem;
}
</style>


