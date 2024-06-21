<template>
  <div>
  <h1>Album data</h1>
<ul class="list-album">
  <li v-for="items in pagination" :key="items.id">
    {{ items.title }}
    <button class="getphotos" @click="getphoto(items.id)">go to photos</button>
  </li>
</ul>
<button class="getphotos" @click="nextbutton" :disabled="!lastpageview">NEXT</button>

</div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const album =ref([]);
const start = ref(0);
const last = 10
const router = useRouter();

onMounted(async()=>{
  const response =await fetch('https://jsonplaceholder.typicode.com/albums')
  album.value= await response.json();
})

const getphoto =(albumId)=>{
  console.log(albumId);
  router.push({name:"AlbumDetails",params:{albumId}})
}

const pagination=computed(()=>{
const startpage =start.value*last;
return album.value.slice(startpage,startpage+last)
})

const lastpageview =computed(() =>{
  const showlast = (start.value+1)*last
  return showlast < album.value.length
})

const nextbutton=()=>{
  if(lastpageview.value){
  start.value+=1
  }
}
</script>
<style scope>
.list-album{
  list-style-type: none;
  padding: 0;
}
.list-album li {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.getphotos {
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