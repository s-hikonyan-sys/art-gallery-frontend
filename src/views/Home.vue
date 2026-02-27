<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>油絵ギャラリーへようこそ</h1>
        <p>心を込めて描いた作品をご覧ください</p>
        <router-link to="/gallery" class="cta-button">作品を見る</router-link>
      </div>
    </section>
    
    <section class="featured-artworks">
      <div class="container">
        <h2>おすすめ作品</h2>
        <div class="artwork-grid" v-if="featuredArtworks.length > 0">
          <div 
            v-for="artwork in featuredArtworks" 
            :key="artwork.id"
            class="artwork-card"
            @click="goToDetail(artwork.id)"
          >
            <div class="artwork-image">
              <img :src="artwork.image_url || '/placeholder.jpg'" :alt="artwork.title">
            </div>
            <div class="artwork-info">
              <h3>{{ artwork.title }}</h3>
              <p class="price">¥{{ formatPrice(artwork.price) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="loading">読み込み中...</div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      featuredArtworks: []
    }
  },
  mounted() {
    this.fetchFeaturedArtworks()
  },
  methods: {
    async fetchFeaturedArtworks() {
      try {
        const response = await axios.get('/api/artworks?featured=true')
        this.featuredArtworks = response.data.slice(0, 3)
      } catch (error) {
        console.error('Error fetching featured artworks:', error)
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ja-JP').format(price)
    },
    goToDetail(id) {
      this.$router.push(`/artwork/${id}`)
    }
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 200px);
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.featured-artworks {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.featured-artworks h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.artwork-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.artwork-card:hover {
  transform: translateY(-5px);
}

.artwork-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #f0f0f0;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-info {
  padding: 1.5rem;
}

.artwork-info h3 {
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
}

.loading {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .artwork-grid {
    grid-template-columns: 1fr;
  }
}
</style>


