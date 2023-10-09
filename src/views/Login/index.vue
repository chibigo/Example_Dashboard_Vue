<template>
  <section class="wrap-login">
    <div class="content">
      <h1>LOGIN</h1>
      <p>Please login with your Username and Password.</p>
      <form>
        <div class="field">
          <label>Email</label>
          <InputText type="text" v-model="dataLogin.username" />
        </div>
        <div class="field">
          <label>Password</label>
          <InputText type="text" v-model="dataLogin.password" />
        </div>
        <Button class="button-submit" type="button" label="Submit" :loading="loading" size="small" @click="handleLogin" />
      </form>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const dataLogin = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const handleLogin = () => {
  loading.value = true
}
</script>

<style scoped lang="scss">
.wrap-login {
  width: 100%;
  height: 100vh;
  background-image: url('/public/background/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 20px;
  margin: 15px;
  background: #fff;
  border-radius: 6px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  .field {
    display: flex;
    flex-direction: column;
  }
}

h1 {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: #4fc08d;
}

p {
  width: 80%;
  margin: 10px auto;
  line-height: 18px;
  text-align: center;
}

.button-submit {
  width: 130px;
  margin: 0 auto;
  background: #4fc08d;
  border: #4fc08d;
}
</style>

