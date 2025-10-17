<template>
  <div id="app">
    <header class="app-header">
      <nav class="nav">
        <div class="nav-brand">
          <h1>Vue 3 + Vite 应用</h1>
        </div>
        <ul class="nav-links">
          <li><RouterLink to="/">首页</RouterLink></li>
          <li><RouterLink to="/about">关于</RouterLink></li>
        </ul>
      </nav>
    </header>
    
    <main class="main-content">
      <RouterView />
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2024 Vue 3 + Vite 应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  opacity: 0.8;
  text-decoration: underline;
}

.main-content {
  min-height: calc(100vh - 160px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-footer {
  background: #f8f9fa;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
}
</style>