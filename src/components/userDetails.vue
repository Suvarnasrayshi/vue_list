<template>
<div>
  <h2>todo</h2>
  <ul class="user-detail">
    <li v-for="items in pagination" :key="items.id" class="todo-item">
     {{ items.id }} {{ items.title}} - <strong :style="{color: items.completed ? '#28a745' : '#dc3545'}"  > {{ items.completed ? 'Completed' : 'Pending' }}</strong>

    </li>
  </ul>
  <h2>post</h2>
  <ul>
    <li v-for="item in pagination" :key="item.id">
      <strong>{{ item.title }}</strong>    -----
     {{ item.id }} {{ item.body }}
    </li>
  </ul>
  <button @click="nextpart" :disabled="!lastpagedetail" class="lastpage">More</button>
  <!-- <button @click="nextpart" class="lastpage">More</button> -->
</div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
// console.log("object",route.params.userId);
const todo =ref([]);
const post =ref([])
const start =ref([]);
const last =2;
const userId=route.params.userId;
console.log("userid",userId);


onMounted(async()=>{
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
  todo.value = await response.json();
  console.log('object',todo.value);


  const responsepost =await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  post.value =await responsepost.json();
  console.log("postdata",post.value)
})

const pagination=computed(()=>{
  const startpage = start.value*last
return todo.value.slice(startpage,startpage+last),post.value.slice(startpage,startpage+last)
})


// const lastpagedetail= computed(()=>{
//   const lastdata =(start.value+1)*last
// console.log("lastdata",lastdata);
// console.log("todo",todo.value.length);
// console.log("post",post.value.length);

// if(lastdata){
//   if(todo.value.length>post.value.length){

//     return lastdata>todo.value.length
//   }
// }
// return lastdata>post.value.length

// })
const nextpart=()=>{
// if(lastpagedetail.value){
start.value+=1
}
// }
</script>
<style scoped>
.user-detail{
  list-style-type: none;
  padding: 0;
}
.todo-item {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lastpage{
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button[disabled] {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: not-allowed;
}
</style>