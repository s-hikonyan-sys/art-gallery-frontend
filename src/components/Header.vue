<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">油絵ギャラリー</router-link>
      </h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">ホーム</router-link>
        <router-link to="/gallery" class="nav-link">作品一覧</router-link>
        <router-link to="/about" class="nav-link">アーティストについて</router-link>
        <router-link to="/contact" class="nav-link">お問い合わせ</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #007bff;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style>


