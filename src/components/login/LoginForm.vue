<template>
  <div class="col-md-4 d-flex flex-column justify-content-center align-items-center bg-color text-white">
    <div class="row">
      <div class="col-12 mb-4">
        <h4>Bem-vindo !</h4>
      </div>
    </div>
    <div class="row">
      <form ref="form" @submit.prevent="submitForm">
        <s-input-email
          ref="un"
          v-model="object.email"
          divClass="col-12"
          label="E-mail"
          placeholder="E-mail"
        />
        <s-input-password
          ref="pw"
          v-model="object.password"
          divClass="col-12"
          label="Senha"
          placeholder="Senha"
          @enter="login"
        />
      </form>
    </div>
    <hr />
    <div class="row">
      <div class="col-12">
        <s-button
          label="Entrar"
          color="light"
          type="submit"
          icon="box-arrow-in-right"
          @click="login()"
        />
      </div>
    </div>
    <s-modal-error
      ref="modalMessage"
      modalTitle="Falha ao conectar!"
      :modalBody="modalBody"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { get } from '@/crud.js'
import { baseApiUrl } from '@/global'

export default {
  name: 'Login',

  data: () => ({
    object: {},

    Modal: null,
    modalBody: null,
  }),

  methods: {
    async login() {
      if (!this.object.password || !this.object.email) {
        this.modalBody = 'Informe o Usuário e a Senha de acesso.'
        this.modalMessage.show()
      } else {
        const url = `${baseApiUrl}/login`
        axios.defaults.withCredentials = true

        await axios
          .post(url, this.object)
          .then(async (res) => {
            const rawUser = await get('me')
            this.$store.dispatch('setLogged', true)
            this.$store.dispatch('setUser', rawUser)
            this.$router.push({ name: 'dashboard' })
            // this.$router.push({ name: 'agenda' })
            return true
          })
          .catch((err) => {
            console.log(err)
            if(err.response.status == 401) {
              this.modalBody = 'Usuário ou senha incorretos. Por favor, verifique.'
              this.modalMessage.show()
            } else if (err.response.status == 400) {
              this.modalBody = 'Usuário ou senha não informados. Por favor, verifique.'
              this.modalMessage.show()
            } else if (err.response.status == 403) {
              this.modalBody = 'Usuário inativo.'
              this.modalMessage.show()
            }
          })
      }
    },

    interpretador(param) {
      eval(`this.${param}()`)
    },
  },

  mounted() {
    this.modalMessage = new this.$Modal(this.$refs.modalMessage.$refs.modalPattern)
  },
}
</script>

<style>
.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-20deg, rgb(87, 140, 255) 50%, rgb(101, 171, 236) 50%);
  bottom: 0;
  left: -100%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg-color{
  background-color: #88cdda;
  /* background-color: #05C3F3; */
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}

@media screen and (max-width: 768px) {
  .divContent {
    display: none;
  }
}

.iconButton {
  cursor: pointer;
}
</style>
