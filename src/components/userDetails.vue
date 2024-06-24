<template>
  <div>
    <h2>Todo</h2>
    <ul class="user-detail">
      <button @click="funShowtodo">Add New Post</button>
      <div v-if="showFormtodo">
        <TodoForm :userId="userId" />
      </div>
      <li v-for="item in paginatedTodos" :key="item.id" class="todo-item">
        {{ item.id }} {{ item.title }} -
        <strong :style="{ color: item.completed ? '#28a745' : '#dc3545' }">
          {{ item.completed ? 'Completed' : 'Pending' }}

        </strong>
      </li>
    </ul>
    <button @click="nextTodoPage" :disabled="!hasMoreTodos" class="lastpage">More Todos</button>
   
    <h2>Post</h2>
    <button @click="funShow">Add New Post</button>
    <div v-if="showForm">
      <PostForm :userId="userId" />
    </div>
    <ul>
      <li v-for="item in paginatedPosts" :key="item.id">
        <strong>{{ item.title }}</strong> ----- {{ item.id }} {{ item.body }}
      </li>
    </ul>
    <button @click="nextPostPage" :disabled="!hasMorePosts" class="lastpage">More Posts</button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PostForm from "./PostForm.vue"
import TodoForm from "./TodoForm.vue"
const route = useRoute();
const userId = route.params.userId;

const todos = ref([]);
const posts = ref([]);

const todoPage = ref(0);
const postPage = ref(0);
const itemsPerPage = 5

const showForm = ref(false);
const showFormtodo = ref(false);

onMounted(async () => {
  const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
  todos.value = await responseTodos.json();
console.log("todo:  ",todos.value);
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

const funShow = () => {
  console.log(!showForm.value)
  showForm.value = !showForm.value;
};

const funShowtodo =()=>{
  showFormtodo.value = !showFormtodo.value;

}
</script>


