<template>
<div class="root">
  <h2>form</h2>
  <p>
    <input type="text" name="email" id="email" placeholder="email" v-model="email">
  </p>
  <p>
    <input type="password" name="password" id="password" placeholder="password"  v-model="password">
  </p>
  <button @click="submitdata">submit</button>
</div>
</template>
<script setup> 
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive } from 'vue' 



const formData = reactive({
     email:"",
     password:"",
    })

const rules={
  email:{ required },
  password:{ required },
}
const submitdata = async () => {
  console.log(v$.value.$validate());
  const result = await v$.value.$validate();
  if (result) {
    alert("success")
  } else {
    alert("error")
  }
}
console.log(submitdata);
const v$ = useVuelidate(rules, formData)
</script>
