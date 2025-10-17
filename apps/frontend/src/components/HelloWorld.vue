<template>
  <div class="hello-world">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="counter-section">
      <button @click="increment" class="counter-btn">+</button>
      <span class="counter-display">{{ count }}</span>
      <button @click="decrement" class="counter-btn">-</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

interface Props {
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hello World',
  message: '这是一个 Vue 3 组件示例'
})

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<style scoped>
.hello-world {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.hello-world h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.hello-world p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.counter-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.counter-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.counter-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.counter-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  min-width: 3rem;
}
</style>