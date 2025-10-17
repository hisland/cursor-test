<template>
  <div class="about">
    <div class="about-header">
      <h1>关于我们</h1>
      <p>了解更多关于这个 Vue 3 + Vite 项目的信息</p>
    </div>
    
    <div class="about-content">
      <div class="tech-stack">
        <h2>技术栈</h2>
        <div class="tech-grid">
          <div class="tech-item" v-for="tech in techStack" :key="tech.name">
            <div class="tech-icon">{{ tech.icon }}</div>
            <h3>{{ tech.name }}</h3>
            <p>{{ tech.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="project-info">
        <h2>项目信息</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>版本:</strong> {{ projectInfo.version }}
          </div>
          <div class="info-item">
            <strong>构建工具:</strong> {{ projectInfo.buildTool }}
          </div>
          <div class="info-item">
            <strong>开发语言:</strong> {{ projectInfo.language }}
          </div>
          <div class="info-item">
            <strong>状态管理:</strong> {{ projectInfo.stateManagement }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const techStack = reactive([
  {
    name: 'Vue 3',
    icon: '🚀',
    description: '渐进式 JavaScript 框架，具有组合式 API 和更好的性能'
  },
  {
    name: 'Vite',
    icon: '⚡',
    description: '下一代前端构建工具，提供极快的开发体验'
  },
  {
    name: 'TypeScript',
    icon: '📘',
    description: 'JavaScript 的超集，提供静态类型检查'
  },
  {
    name: 'Vue Router',
    icon: '🛣️',
    description: 'Vue.js 的官方路由管理器'
  },
  {
    name: 'Pinia',
    icon: '🍍',
    description: 'Vue 的状态管理库，直观且类型安全'
  }
])

const projectInfo = reactive({
  version: '1.0.0',
  buildTool: 'Vite 5.0+',
  language: 'TypeScript',
  stateManagement: 'Pinia'
})
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.about-header p {
  font-size: 1.125rem;
  color: #7f8c8d;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tech-stack h2,
.project-info h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tech-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-3px);
}

.tech-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tech-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tech-item p {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.info-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>