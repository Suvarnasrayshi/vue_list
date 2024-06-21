<template>
  <div>
    <h1>Album Photos</h1>
    <ul class="photo-list">
      <li v-for="photo in pagination" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-img" />
        <p class="photo-title">{{ photo.title }}</p>
      </li>
    </ul>
    <button class="morebtn" @click="morebtn" :disabled="!lastpage">More</button>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const albumId= route.params.albumId
console.log("object",albumId)
const photos= ref([]);
const start =ref([]);
const last=12;

onMounted(async()=>{
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  photos.value = await response.json();
  console.log("hfhfudhfrfgrdfgh",photos.value);
})


const pagination=computed(()=>{
  const datastart = start.value*last;
  return photos.value.slice(datastart,datastart+last)
})

const lastpage = computed(()=>{
  const lastdata = (start.value+1)*last
  return lastdata<photos.value.length
})

const morebtn=()=>{
if(lastpage.value){
  start.value+=1
} 
}
</script>
<style scoped>
.photo-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}

.photo-img {
  width: 50%;
  border-radius: 4px;
  height: 150px;
}

.morebtn{
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 20px;
  margin-left: 650px;
}
button[disabled] {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 20px;
  cursor: not-allowed;
}
</style>
