<template>
  <div class="root">
    <h2>form</h2>
    <p>
      <input type="text" name="email" id="email" placeholder="email" v-model="formData.email" @blur="v$.email.$touch">
      <span v-if="v$.email.$error">email is required</span>
    </p>
    <p>
      <input type="text" name="password" id="password" placeholder="password"  v-model="formData.password"  @blur="v$.password.$touch">
      <span v-if="v$.password.$error">password is not proper</span>
    </p>
    <p>
      <input type="text" name="confirm" id="confirm" placeholder="confirm password"  v-model="formData.confirm" @blur="v$.confirm.$touch">
      <span v-if="v$.confirm.$error">required</span>
    </p>
    <p>
      True
      <input type="radio" name="bool" v-model="bool" :value="true" @blur="v$.bool.$touch"/>
  
      False
      <input type="radio" name="bool" v-model="bool" :value="false" @blur="v$.bool.$touch"/>
      <span v-if="v$.bool.$error && v$.bool.$dirty">check is not proper</span>
      <pre>{{ $v }}</pre>
    </p>
    <button @click="submitdata">submit</button>
  </div>
  </template>
  <script setup> 
  import { useVuelidate } from '@vuelidate/core'
  import { required,email,minLength } from '@vuelidate/validators'
  import { reactive } from 'vue' 
  
  
  
  const formData = reactive({
       email:"",
       password:"",
       confirm:"",
       bool:"",
      })
  const rules={
    email:{ required,email },
    password:{ required ,minLength:minLength(2)},
    // confirm:{ required,sameAs:sameAs(formData.password) },
    confirm:{required},
    bool:{required}
  }
  const submitdata = async () => {
  console.log("formdatapassword",formData.password)
  console.log("confirm",formData.password);
    console.log(v$.value);
   const result=await v$.value.$validate();
   if(result){alert("success")}
   else{
    alert("error")
   }
  }
  
  const v$ = useVuelidate(rules, formData)
  </script>
  