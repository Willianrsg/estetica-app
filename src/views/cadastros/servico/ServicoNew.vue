<template>
    <div class="m-3">
      <s-title :title="title" :breadcrumb="true" />
      <div class="card card-body mx-2">
        <form ref="form" @submit.prevent="submitForm" >
            <div class="row">
                <s-input-text
                    v-model="object.name"
                    ref="name"
                    divClass="col-12 col-xs-12 col-sm-10 col-md-10 col-xxl-10"
                    label="Nome"
                    required
                />
                <s-input-text
                    v-model="object.price"
                    ref="price"
                    divClass="col-12 col-xs-12 col-sm-2 col-md-2 col-xxl-2"
                    label="Preço"
                    v-money="moneyConfig"
                    required
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
      <s-modal-error ref="modalError" modalTitle="Falha ao adicionar o registro !" :modalBody="modalBody" />
      <s-modal-notlogged ref="modalNotLogged" @confirm="logout" />
    </div>
  </template>
  
  <script>
  import { validateForm, checkSession, logout } from '@/rule/functions'
  import { insert, search, update } from '@/crud'
  import { Modal } from 'bootstrap'
  
export default {
    name: 'servicoNew',
  
    data: () => ({
        route: 'service',
        object: {},
        Modal: null,
        modalNotLogged: null,
        modalError: null,
        modalBody: null,
        title: null,
    
        moneyConfig: {
            decimal: ',',
            thousands: '.',
            precision: 2,
            masked: false,
        },
    }),
  
    methods: {
        async loadItem(id) {
            if (await checkSession()) {
                await search(this.route, { id: id })
                    .then((res) => {
                    this.object = res.data[0]
                    this.object.price = parseFloat(this.object.price).toFixed(2)
                    })
                    .catch((err) => {
                    console.error(err)
                    this.$router.push({ name: 'servico' })
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
                    this.object.price = this.$filters.unformatMoney(this.object.price)
        
                    const result = await insert(this.route, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Serviço criado com sucesso !')
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
        
                    this.object.price = this.$filters.unformatMoney(this.object.price)
        
                    const result = await update(this.route, this.$route.params.id, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.object = {}
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Serviço alterado com sucesso !')
                            this.$router.back()
                        }
                    } else {
                        this.modalBody = result.response.data
                        this.modalError.show()
                    }
                } else {
                    this.object.price = this.$filters.unformatMoney(this.object.price)
        
                    const result = await insert(this.route, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Serviço criado com sucesso !')
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
        this.$route.name == 'servicoUpdate' ? (this.title = 'Edição de Serviço') : (this.title = 'Cadastro de Serviço')
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
  