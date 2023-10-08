<template>
    <div class="m-3">
      <!-- <s-title :title="title" /> -->
      <s-title :title="title" :breadcrumb="true" icon="bi bi-car-front-fill"/>
      <div class="card card-body mx-2">
        <form ref="form" @submit.prevent="submitForm" >
            <div class="row">
                <s-input-zoom
                    v-model="object.idClient"
                    ref="client"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                    label="Cliente"
                    required
                >
                    <template #default>
                        <Cliente :zoom="true" @selectedItem="handleSelectedCliente"/>
                    </template>
                </s-input-zoom>
                <s-input-text
                    v-model="object.manufacturer"
                    ref="manufacture"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                    label="Fabricante"
                />
                <s-input-text
                    v-model="object.model"
                    ref="model"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                    label="Modelo"
                    required
                />
                <s-input-text
                    v-model="object.licensePlate"
                    ref="licencePlate"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                    label="Placa"
                    v-mask="['AAA-####', 'AAA#A##']"
                    required
                />
                <s-input-text
                    v-model="object.color"
                    ref="color"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                    label="Cor"
                />
                <s-input-text
                    v-model="object.fleet"
                    ref="fleet"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                    label="Frota"
                    v-mask="'#####'"
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
    name: 'VehiclesNew',
  
    data: () => ({
        route: 'vehicles',
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
                })
                .catch((err) => {
                console.error(err)
                this.$router.push({ name: 'vehicles' })
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
    
                const result = await insert(this.route, this.object)
    
                if (result.status) {
                if (result.status != '204') {
                    this.modalBody = result.response.data
                    this.modalError.show()
                } else {
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Veículo criado com sucesso !')
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
    
                const result = await update(this.route, this.$route.params.id, this.object)
    
                if (result.status) {
                    if (result.status != '204') {
                        this.modalBody = result.response.data
                        this.modalError.show()
                    } else {
                        this.object = {}
                        this.$store.dispatch('setShowToast', true)
                        this.$store.dispatch('setToastMessage', 'Veículo alterado com sucesso !')
                        this.$router.back()
                    }
                } else {
                this.modalBody = result.response.data
                this.modalError.show()
                }
            } else {
    
                const result = await insert(this.route, this.object)
    
                if (result.status) {
                    if (result.status != '204') {
                        this.modalBody = result.response.data
                        this.modalError.show()
                    } else {
                        this.$store.dispatch('setShowToast', true)
                        this.$store.dispatch('setToastMessage', 'Veículo criado com sucesso !')
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

        handleSelectedCliente(item) {
            this.$refs.idClient.modalZoom.hide()
            this.object.idClient = item.idClient.toString()
        },
  
        logout() {
            logout(this)
        },
    },
  
    mounted() {
        this.$route.name == 'veiculosUpdate' ? (this.title = 'Edição de Veículo') : (this.title = 'Cadastro de Veículo')
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
  