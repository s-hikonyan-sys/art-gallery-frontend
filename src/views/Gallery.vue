<template>
  <div class="gallery">
    <div class="container">
      <h1>作品一覧</h1>

      <div class="filters">
        <button @click="filter = null" :class="{ active: filter === null }" class="filter-btn">
          すべて
        </button>
        <button
          @click="filter = 'featured'"
          :class="{ active: filter === 'featured' }"
          class="filter-btn"
        >
          おすすめ
        </button>
        <button
          @click="filter = 'available'"
          :class="{ active: filter === 'available' }"
          class="filter-btn"
        >
          販売中
        </button>
      </div>

      <div class="artwork-grid" v-if="artworks.length > 0">
        <div
          v-for="artwork in filteredArtworks"
          :key="artwork.id"
          class="artwork-card"
          @click="goToDetail(artwork.id)"
        >
          <div class="artwork-image">
            <img :src="artwork.image_url || '/placeholder.jpg'" :alt="artwork.title" />
            <span v-if="artwork.is_sold" class="sold-badge">SOLD</span>
          </div>
          <div class="artwork-info">
            <h3>{{ artwork.title }}</h3>
            <p class="description">{{ artwork.description }}</p>
            <div class="artwork-meta">
              <span>{{ artwork.size }}</span>
              <span>{{ artwork.medium }}</span>
              <span>{{ artwork.year }}年</span>
            </div>
            <p class="price">¥{{ formatPrice(artwork.price) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="loading">読み込み中...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Gallery',
  data() {
    return {
      artworks: [],
      filter: null,
    }
  },
  computed: {
    filteredArtworks() {
      if (this.filter === 'featured') {
        return this.artworks.filter(a => a.is_featured)
      } else if (this.filter === 'available') {
        return this.artworks.filter(a => !a.is_sold)
      }
      return this.artworks
    },
  },
  mounted() {
    this.fetchArtworks()
  },
  methods: {
    async fetchArtworks() {
      try {
        const response = await axios.get('/api/artworks')
        this.artworks = response.data
      } catch (error) {
        console.error('Error fetching artworks:', error)
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ja-JP').format(price)
    },
    goToDetail(id) {
      this.$router.push(`/artwork/${id}`)
    },
  },
}
</script>

<style scoped>
.gallery {
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
  background: #667eea;
  color: white;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.artwork-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  position: relative;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sold-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
}

.artwork-info {
  padding: 1.5rem;
}

.artwork-info h3 {
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.artwork-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .artwork-grid {
    grid-template-columns: 1fr;
  }
}
</style>
