<template>
<div>
  <h1>User data</h1>
<ul class="user-list">
  <li v-for="users in user" :key="users.id">
 {{ users.name }}
    <button class="view-todos" @click="gettodo(users.id) ">get the todo list</button>
  </li>
</ul>
</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const user =ref([]);
onMounted(async()=>{
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  user.value = await response.json();
  // console.log('object',user.value);
})

const gettodo =(userId)=>{
  console.log(userId);
router.push({name:'userDetails', params:{userId}})
}
</script>
<style scope>
.user-list{
  list-style-type: none;
  padding: 0;
}
.user-list li {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.view-todos {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
}

</style>