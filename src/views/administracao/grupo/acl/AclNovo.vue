<template>
  <div class="m-3">
    <s-title :title="title" :breadcrumb="true"/>
    <div class="card card-body mx-2">
      <form ref="form" @submit.prevent="submitForm" >
        <div class="row">
          <s-input-text
            v-model="object.idScreen"
            ref="idScreen"
            divClass="col-12 col-xs-12 col-sm-6 col-md-6 col-xxl-6"
            label="Programa"
            required
          />
          <s-input-text
            v-model="object.status"
            ref="status"
            divClass="col-12 col-xs-12 col-sm-6 col-md-6 col-xxl-6"
            label="Status"
            required
          />
        </div>
        <div class="row">
          <s-label-required />
        </div>
        <hr />
        <div class="row">
          <div class="col-12 d-flex justify-content-between">
            <div>
              <s-button
                type="submit"
                label="Salvar"
                color="primary"
                icon="check2"
              />
              <s-button
                type="button"
                label="Salvar e Continuar"
                color="secondary"
                icon="check2"
                v-if="!object.id"
                @click="saveAndKeep"
              />
            </div>
            <div>
              <s-button
                type="button"
                label="Cancelar"
                color="outline-danger"
                icon="x-lg"
                @click="$router.back"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    <s-modal-error
      ref="modalError"
      modalTitle="Falha ao adicionar o registro !"
      :modalBody="modalBody"
    />
    <s-modal-notlogged
      ref="modalNotLogged"
      @confirm="logout"
    />
  </div>
</template>

<script>
import { validateForm, logout } from '@/rule/functions'
import { insert, getById, update } from '@/crud'


export default {
  name: 'AclNew',

  data: () => ({
    route: 'acl',
    object: {},
    Modal: null,
    modalNotLogged: null,
    modalError: null,
    modalBody: null,
    title: null,
  }),

  methods: {
    async loadItem(id) {
      if (await this.$checkSession()) {
        await getById(this.route, id)
        .then((res) => {
          this.object = res

          if (this.object.status == 1) { this.object.status = true }
          else { this.object.status = false }
        })
        .catch((err) => {
          console.error(err)
          this.$router.push({ name: 'aclChildren'})
        })
      }

      else { this.modalNotLogged.show() }
    },

    async submitForm() {
      if (await validateForm(this.$refs.form)) { this.save() }
    },

    async saveAndKeep() {
      if (await this.$checkSession()) {
        if (await validateForm(this.$refs.form)) {
          const result = await insert(this.route, this.object)

          if (result.status) {
            if (result.status != '204') {
              this.modalBody = result.response.data
              this.modalError.show()
            }

            else {
              this.$store.dispatch('setShowToast', true)
              this.$store.dispatch('setToastMessage', 'ACL criada com sucesso !')
              this.object = {}
              this.loadIdGroup();
            }
          }

          else {
            this.modalBody = result.response.data
            this.modalError.show()
          }
        }
      }

      else { this.TheModalNotLogged.show()}
    },

    async save() {
      if (await this.$checkSession()) {
        if (this.object.id) {

          this.$cleanObject(this.object)

          const result = await update(this.route, this.$route.params.id, this.object)

          if (result.status) {
            if (result.status != '204') {
              this.modalBody = result.response.data
              this.modalError.show()
            }

            else {
              this.$store.dispatch('setShowToast', true)
              this.$store.dispatch('setToastMessage', 'ACL alterada com sucesso !')
              this.$router.back()
            }
          }

          else {
            this.modalBody = result.response.data
            this.modalError.show()
          }
        }

        else {
          const result = await insert(this.route, this.object)

          if (result.status) {
            if (result.status != '204') {
              this.modalBody = result.response.data
              this.modalError.show()
            }

            else {
              this.$store.dispatch('setShowToast', true)
              this.$store.dispatch('setToastMessage', 'ACL criada com sucesso !')
              this.$router.back()
            }
          }

          else {
            this.modalBody = result.response.data
            this.modalError.show()
          }
        }
      }

      else { this.modalNotLogged.show() }
    },

    loadIdGroup() {
      this.object.idGroup = this.$route.params.id_group
    },

    logout() { logout(this) }
  },

  mounted() {
    this.loadIdGroup();
    this.$route.name == 'aclUpdate' ? this.title = 'Edição de Controle de Acessos' : this.title = 'Cadastro de Controle de Acessos'
    this.modalNotLogged = new this.$Modal(this.$refs.modalNotLogged.$refs.modalPattern)
    this.modalError = new this.$Modal(this.$refs.modalError.$refs.modalPattern)
  },

  async created() {
    const id = this.$route.params.id

    if (id) { await this.loadItem(id) }
  },
}
</script>

<style></style>