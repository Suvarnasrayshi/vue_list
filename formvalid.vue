<template>
  <div class="root">
    <h2>Form</h2>
    <p>
      <input type="text" name="email" id="email" placeholder="Email" v-model="formData.email" @blur="v$.email.$touch()" />
      <span v-if="v$.email.$error">Email is required and must be valid</span>
    </p>
    <p>
      <input type="text" name="password" id="password" placeholder="Password" v-model="formData.password"
        @blur="v$.password.$touch" />
      <span v-if="v$.password.$error">Password is required and must be at least 2 characters</span>
      <span v-if="v$.password.hasNumber"><p @blur="v$.password.$touch">number required</p></span>
    </p>
    <p>
      <input type="text" name="confirm" id="confirm" placeholder="Confirm Password" v-model="formData.confirm"
        @blur="v$.confirm.$touch()" />
      <span v-if="v$.confirm.$error">Confirmation is required and must match the password</span>
    </p>
    <p>
      True
      <input type="radio" name="bool" v-model="formData.bool" :value="true" @blur="v$.bool.$touch()" />
      False
      <input type="radio" name="bool" v-model="formData.bool" :value="false" @blur="v$.bool.$touch()" />
      <span v-if="v$.bool.$error && v$.bool.$dirty">Selection is required</span>
    </p>
    <p>
      <label for="cars">Choose a car:</label>
      <select name="cars" id="cars" v-model="formData.car" @blur="v$.car.$touch()">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <span v-if="v$.car.$error">Select a car</span>
    </p>
    <p>
      <label>Select Hobbies:</label><br />
      Reading <input type="checkbox" value="reading" v-model="formData.hobbies" @blur="v$.hobbies.$touch()" />
      Traveling <input type="checkbox" value="traveling" v-model="formData.hobbies" @blur="v$.hobbies.$touch()" />
      Sports <input type="checkbox" value="sports" v-model="formData.hobbies" @blur="v$.hobbies.$touch()" />
      <span v-if="v$.hobbies.$error">Select at least one hobby</span>
    </p>
    <button @click="submitdata">Submit</button>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { reactive } from 'vue'
import {hasNumber} from '../validation.js'
const formData = reactive({
  email: '',
  password: '',
  confirm: '',
  bool: null,
  car: '',
  hobbies: []
})


const rules = {
  email:{required,email},
  password: { required, minLength: minLength(2),hasNumber },
  confirm: { required},
  bool: { required },
  car: { required },
  hobbies: { required }
}

const v$ = useVuelidate(rules, formData)

const submitdata = async () => {
  const result =
   await v$.value.$validate()
  if (result) {
    alert('Success')
  } else {
    alert('Error')
  }
}
</script>

<style scoped>
span {
  color: red;
}
button {
  margin-top: 10px;
}
</style>
