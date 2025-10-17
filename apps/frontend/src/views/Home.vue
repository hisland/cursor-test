<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">欢迎使用 Vue 3 + Vite</h1>
      <p class="hero-subtitle">现代化的前端开发体验</p>
      <div class="hero-actions">
        <button @click="incrementCounter" class="btn btn-primary">
          点击计数: {{ counter }}
        </button>
      </div>
    </div>
    
    <div class="features">
      <h2>特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>⚡ 快速热重载</h3>
          <p>Vite 提供极快的热模块替换（HMR）体验</p>
        </div>
        <div class="feature-card">
          <h3>🎯 TypeScript 支持</h3>
          <p>完整的 TypeScript 支持，提供更好的开发体验</p>
        </div>
        <div class="feature-card">
          <h3>📦 组合式 API</h3>
          <p>使用 Vue 3 的组合式 API 构建可维护的应用</p>
        </div>
        <div class="feature-card">
          <h3>🎨 现代化 UI</h3>
          <p>响应式设计，适配各种设备屏幕</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)

const incrementCounter = () => {
  counter.value++
}
</script>

<style scoped>
.home {
  text-align: center;
}

.hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.hero-actions {
  margin-top: 2rem;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.features {
  text-align: left;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>