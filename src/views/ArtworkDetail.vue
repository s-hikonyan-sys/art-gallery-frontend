<template>
  <div class="artwork-detail">
    <div class="container" v-if="artwork">
      <div class="detail-content">
        <div class="artwork-image-large">
          <img :src="artwork.image_url || '/placeholder.jpg'" :alt="artwork.title">
        </div>
        <div class="artwork-details">
          <h1>{{ artwork.title }}</h1>
          <p class="description">{{ artwork.description }}</p>
          <div class="artwork-meta">
            <div class="meta-item">
              <strong>サイズ:</strong> {{ artwork.size }}
            </div>
            <div class="meta-item">
              <strong>画材:</strong> {{ artwork.medium }}
            </div>
            <div class="meta-item">
              <strong>制作年:</strong> {{ artwork.year }}年
            </div>
          </div>
          <div class="price-section">
            <p class="price">¥{{ formatPrice(artwork.price) }}</p>
            <span v-if="artwork.is_sold" class="sold-label">SOLD</span>
            <span v-else class="available-label">販売中</span>
          </div>
          <button 
            v-if="!artwork.is_sold" 
            @click="showContactForm = true"
            class="contact-button"
          >
            お問い合わせ
          </button>
        </div>
      </div>
      
      <div v-if="showContactForm" class="contact-form-overlay" @click="showContactForm = false">
        <div class="contact-form" @click.stop>
          <h2>お問い合わせ</h2>
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label>お名前 *</label>
              <input v-model="orderForm.name" type="text" required>
            </div>
            <div class="form-group">
              <label>メールアドレス *</label>
              <input v-model="orderForm.email" type="email" required>
            </div>
            <div class="form-group">
              <label>電話番号</label>
              <input v-model="orderForm.phone" type="tel">
            </div>
            <div class="form-group">
              <label>メッセージ</label>
              <textarea v-model="orderForm.message" rows="4"></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="showContactForm = false" class="cancel-btn">キャンセル</button>
              <button type="submit" class="submit-btn">送信</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="loading">読み込み中...</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArtworkDetail',
  data() {
    return {
      artwork: null,
      showContactForm: false,
      orderForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  mounted() {
    this.fetchArtwork()
  },
  methods: {
    async fetchArtwork() {
      try {
        const response = await axios.get(`/api/artworks/${this.$route.params.id}`)
        this.artwork = response.data
        this.orderForm.artwork_id = this.artwork.id
      } catch (error) {
        console.error('Error fetching artwork:', error)
        this.$router.push('/gallery')
      }
    },
    async submitOrder() {
      try {
        await axios.post('/api/orders', {
          ...this.orderForm,
          artwork_id: this.artwork.id
        })
        alert('お問い合わせを送信しました。ありがとうございます。')
        this.showContactForm = false
        this.orderForm = { name: '', email: '', phone: '', message: '' }
      } catch (error) {
        console.error('Error submitting order:', error)
        alert('送信に失敗しました。もう一度お試しください。')
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ja-JP').format(price)
    }
  }
}
</script>

<style scoped>
.artwork-detail {
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.artwork-image-large {
  width: 100%;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.artwork-image-large img {
  width: 100%;
  height: auto;
  display: block;
}

.artwork-details h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #666;
}

.artwork-meta {
  margin-bottom: 2rem;
}

.meta-item {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.price-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.sold-label,
.available-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
}

.sold-label {
  background: #dc3545;
  color: white;
}

.available-label {
  background: #28a745;
  color: white;
}

.contact-button {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.contact-button:hover {
  background: #5568d3;
}

.contact-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.contact-form h2 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.submit-btn {
  background: #667eea;
  color: white;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>


