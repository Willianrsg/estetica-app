<template>
  <div>
    <TheAppShell></TheAppShell>
    <TheToastSuccess ref="toastSuccess" :message="toastMessage" />
    <TheModalNotLogged ref="modalNotLogged" @confirm="logout" />
    <TheModalError ref="modalError" modalTitle="Falha na requisição!" :modalBody="errorMessage" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import TheAppShell from '@/components/geral/TheAppShell.vue'
import TheToastSuccess from '@/components/toast/TheToastSuccess.vue'
import TheModalNotLogged from './components/modal/TheModalNotLogged.vue'
import TheModalError from '@/components/modal/TheModalError.vue'
import { Modal } from 'bootstrap'
import { get } from '@/crud.js'
export default {
  data: () => ({
    modalNotLogged: null,
  }),
  components: {
    TheAppShell,
    TheToastSuccess,
    TheModalNotLogged,
    TheModalError,
  },

  computed: {
    ...mapState(['logged', 'toastMessage', 'statusCode', 'errorMessage']),
  },

  methods: {
    handleStatusCode(status) {
      switch (status) {
        case 401:
          this.modalNotLogged.show()
          this.$store.dispatch('setLogged', false)
          this.$router.push({ name: 'login' })
          break
        case 204:
          new bootstrap.Toast(this.$refs.toastSuccess.$refs.toastPattern).show()
          break
        case 200:
          // new bootstrap.Toast(this.$refs.toastSuccess.$refs.toastPattern).show()
          break
        case 400:
          this.modalError.show()
          break
      }
      this.$store.dispatch('setStatusCode', 0)
    },
    async checkSession() {
      const response = await get('me')

      if (response.status === 401) return false
      else {
        this.$store.dispatch('setLogged', true)
        this.$store.dispatch('setUser', response)
        return true
      }
    },
  },

  async mounted() {
    if (!(await this.checkSession())) {
      // this.$store.dispatch('setLogged', false)
      this.$router.push({ name: 'login' })
    }
    this.modalNotLogged = new Modal(this.$refs.modalNotLogged.$refs.modalPattern)
    this.modalError = new Modal(this.$refs.modalError.$refs.modalPattern)
  },

  watch: {
    statusCode() {
      this.handleStatusCode(this.statusCode)
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/app.scss';
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

html {
  font-family: 'Poppins', sans-serif !important;
}

.icon_action {
  cursor: pointer;
}

.bebas {
  font-family: 'Bebas Neue', sans-serif !important;
}
</style>
