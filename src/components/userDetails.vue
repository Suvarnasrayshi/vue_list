<template>
  <div>
    <h2>Todo</h2>
    <ul class="user-detail">
      <router-link :to="{ name: 'PostForm' }">Posts</router-link>
      <li v-for="item in paginatedTodos" :key="item.id" class="todo-item">
        {{ item.id }} {{ item.title }} - 
        <strong :style="{ color: item.completed ? '#28a745' : '#dc3545' }">
          {{ item.completed ? 'Completed' : 'Pending' }}
        </strong>
      </li>
    </ul>
    <button @click="nextTodoPage" :disabled="!hasMoreTodos" class="lastpage">More Todos</button>
    
    <h2>Post</h2>
    <ul>
      <li v-for="item in paginatedPosts" :key="item.id">
        <strong>{{ item.title }}</strong> ----- {{ item.id }} {{ item.body }}
        <PostForm :userID=item.id />
      </li>
    </ul>
    <button @click="nextPostPage" :disabled="!hasMorePosts" class="lastpage">More Posts</button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PostForm from "./PostForm.vue"

const route = useRoute();
const userId = route.params.userId;

const todos = ref([]);
const posts = ref([]);

const todoPage = ref(0);
const postPage = ref(0);
const itemsPerPage = 5;

onMounted(async () => {
  const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
  todos.value = await responseTodos.json();

  const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  posts.value = await responsePosts.json();
});

const paginatedTodos = computed(() => {
  const start = todoPage.value * itemsPerPage;
  return todos.value.slice(start, start + itemsPerPage);
});

const paginatedPosts = computed(() => {
  const start = postPage.value * itemsPerPage;
  return posts.value.slice(start, start + itemsPerPage);
});

const hasMoreTodos = computed(() => {
  return (todoPage.value + 1) * itemsPerPage < todos.value.length;
});

const hasMorePosts = computed(() => {
  return (postPage.value + 1) * itemsPerPage < posts.value.length;
});

const nextTodoPage = () => {
  if (hasMoreTodos.value) {
    todoPage.value += 1;
  }
};

const nextPostPage = () => {
  if (hasMorePosts.value) {
    postPage.value += 1;
  }
};
</script>

<style scoped>
.user-detail {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lastpage {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button[disabled] {
  background-color: #999;
  cursor: not-allowed;
}
</style>
