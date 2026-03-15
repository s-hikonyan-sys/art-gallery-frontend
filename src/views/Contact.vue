<template>
  <div class="contact">
    <div class="container">
      <h1>お問い合わせ</h1>
      <form @submit.prevent="submitContact" class="contact-form">
        <div class="form-group">
          <label>お名前 *</label>
          <input v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
          <label>メールアドレス *</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input v-model="form.phone" type="tel" />
        </div>
        <div class="form-group">
          <label>メッセージ *</label>
          <textarea v-model="form.message" rows="6" required></textarea>
        </div>
        <button type="submit" class="submit-btn">送信</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
    }
  },
  methods: {
    submitContact() {
      // ここでお問い合わせフォームの送信処理を実装
      alert('お問い合わせありがとうございます。後日ご連絡いたします。')
      this.form = { name: '', email: '', phone: '', message: '' }
    },
  },
}
</script>

<style scoped>
.contact {
  padding: 4rem 2rem;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.contact h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  font-family: inherit;
}

.submit-btn {
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

.submit-btn:hover {
  background: #5568d3;
}
</style>
