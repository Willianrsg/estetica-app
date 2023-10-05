<template>
    <div class="m-3">
      <!-- <s-title :title="title" /> -->
      <s-title :title="title" :breadcrumb="true" icon="bi bi-people-fill" />
      <div class="card card-body mx-2">
        <form ref="form" @submit.prevent="submitForm" >
            <div class="row">
                <s-input-text
                    v-model="object.name"
                    ref="name"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-7"
                    label="Nome"
                    required
                />
                <s-input-text
                    v-model="object.phone"
                    ref="phone"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                    label="Telefone"
                    v-mask="['(##) # ####-####']"
                    required
                />
                <s-input-text
                    v-model="object.cpfCnpj"
                    ref="cpfCnpj"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                    label="CPF/CNPJ"
                    v-mask="['###.###.###-##', '##.###.###/####-##']"
                />
                <s-input-text
                    v-model="object.zipCode"
                    ref="zipCode"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-2"
                    label="CEP"
                    v-mask="['#####-###']"                  
                />
                <s-input-text
                    v-model="object.street"
                    ref="street"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-6"
                    label="Endereço"
                />
                <s-input-text
                    v-model="object.city"
                    ref="city"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                    label="Cidade"
                />
                <s-input-text
                    v-model="object.state"
                    ref="state"
                    divClass="col-12 col-xs-12 col-sm-2 col-md-2 col-xxl-1"
                    label="UF"
                />
                <s-input-textarea
                    v-model="object.observation"
                    ref="observation"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                    label="Observação"
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
      <s-modal-delete ref="modalError" modalTitle="Falha ao adicionar o registro !" :modalBody="modalBody" />
      <s-modal-notlogged ref="modalNotLogged" @confirm="logout" />
    </div>
  </template>
  
  <script>
  import { validateForm, checkSession, logout } from '@/rule/functions'
  import { insert, search, update } from '@/crud'
  import { Modal } from 'bootstrap'
  
export default {
    name: 'clienteNew',
  
    data: () => ({
        route: 'client',
        object: {},
        Modal: null,
        modalNotLogged: null,
        modalError: null,
        modalBody: null,
        title: null,
    
    }),
  
    methods: {
        async loadItem(id) {
            if (await checkSession()) {
            await search(this.route, { id: id })
                .then((res) => {
                this.object = res.data[0]
                this.object.purchaseValue = parseFloat(this.object.purchaseValue).toFixed(2)
                })
                .catch((err) => {
                console.error(err)
                this.$router.push({ name: 'cliente' })
                })
            } else {
            this.modalNotLogged.show()
            }
        },
  
        async submitForm() {
            if (await validateForm(this.$refs.form)) {
            this.save()
            }
        },
  
        async saveAndKeep() {
            if (await checkSession()) {
            if (await validateForm(this.$refs.form)) {
                this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
    
                const result = await insert(this.route, this.object)
    
                if (result.status) {
                if (result.status != '204') {
                    this.modalBody = result.response.data
                    this.modalError.show()
                } else {
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Cliente criado com sucesso !')
                    this.object = {}
                }
                } else {
                this.modalBody = result.response.data
                this.modalError.show()
                }
            }
            } else {
            this.modalNotLogged.show()
            }
        },
  
        async save() {
            if (await checkSession()) {
            if (this.object.id) {
                this.$cleanObject(this.object)
    
                this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
    
                const result = await update(this.route, this.$route.params.id, this.object)
    
                if (result.status) {
                if (result.status != '204') {
                    this.modalBody = result.response.data
                    this.modalError.show()
                } else {
                    this.object = {}
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Cliente alterado com sucesso !')
                    this.$router.back()
                }
                } else {
                this.modalBody = result.response.data
                this.modalError.show()
                }
            } else {
                this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
    
                const result = await insert(this.route, this.object)
    
                if (result.status) {
                if (result.status != '204') {
                    this.modalBody = result.response.data
                    this.modalError.show()
                } else {
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Cliente criado com sucesso !')
                    this.$router.back()
                }
                } else {
                this.modalBody = result.response.data
                this.modalError.show()
                }
            }
            } else {
            this.modalNotLogged.show()
            }
        },
  
        logout() {
            logout(this)
        },
    },
  
    mounted() {
        this.$route.name == 'clienteUpdate' ? (this.title = 'Edição de Cliente') : (this.title = 'Cadastro de Cliente')
        this.modalNotLogged = new Modal(this.$refs.modalNotLogged.$refs.modalPattern)
        this.modalError = new Modal(this.$refs.modalError.$refs.modalPattern)
    },
    
    async created() {
        const id = this.$route.params.id
    
        if (id) {
            await this.loadItem(id)
        }
    },
}
</script>
  
<style></style>
  