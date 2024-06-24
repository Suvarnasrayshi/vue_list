<template>
<div>
  <h2>Add New Post</h2>
  <form @submit.prevent="submitPost">
    <div>
      <label for="title">Title:</label>
      <input type="text" v-model="title" id="title" required />
    </div>
    <div>
      <label for="body">Body:</label>
      <textarea v-model="body" id="body" required></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>

  <h2>Posts</h2>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <strong>{{ post.title }}</strong> - {{ post.body }}
    </li>
  </ul>
</div>
</template>

 <script setup>
 import { ref, defineProps, onMounted } from 'vue';

 const props = defineProps({
   userId: Number,
 });
console.log("id"+props.userId);

 const title = ref('');
 const body = ref('');
 const posts = ref([]);
 const submitPost = async () => {
   const newPost = {
     title: title.value,
     body: body.value,
     userId: props.userId,
    };
console.log("newpost-",newPost);
   const response = await fetch('https:jsonplaceholder.typicode.com/posts', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(newPost), 
   });

   const result = await response.json();
   console.log('Created Post:', result);


   posts.value.push(result);


   title.value = '';
   body.value = '';
 };

 onMounted(async () => {
   const response = await fetch(`https:jsonplaceholder.typicode.com/users/${props.userId}/posts`);
   posts.value = await response.json();
 });
 </script>
 ```