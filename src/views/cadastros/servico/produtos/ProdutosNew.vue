<template>
    <div class="m-3">
        <!-- <s-title title="Cadastro de produto" /> -->
        <s-title :title="title" :breadcrumb="true" icon="bi bi-journal-plus" />
        <div class="card card-body mx-2">
            <form ref="form" @submit.prevent="submitForm" >
                <div class="row">
                    <s-input-zoom
                        v-model="object.idProduct"
                        ref="idProduct"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-6 col-xxl-6"
                        label="Produto"
                        required
                    >
                        <template #default>
                            <Produto :zoom="true" @selectedItem="handleSelectedProduto"/>
                        </template>
                    </s-input-zoom>
                    <!-- <s-input-zoom
                        v-model="object.idVehicles"
                        ref="idVehicles"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                        label="Veiculo"
                        required
                    >
                        <template #default>
                            <Veiculos :zoom="true" @selectedItem="handleSelectedVeiculos"/>
                        </template>
                    </s-input-zoom>
                    <s-input-zoom
                        v-model="object.idService"
                        ref="idService"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                        label="Serviço"
                        required
                    >
                        <template #default>
                            <Servicos :zoom="true" @selectedItem="handleSelectedServico"/>
                        </template>
                    </s-input-zoom> -->
                    <!-- <s-input-date
                        v-model="object.date"
                        ref="date"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                        label="Data"
                        required
                    /> -->
                    <s-input-text
                        v-model="object.quantity"
                        ref="quantity"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-4 col-xxl-4"
                        label="Quantidade"
                        v-mask="['####']"
                        required
                    />
                    <s-input-text
                        v-model="object.measure"
                        ref="measure"
                        divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                        label="Medida"
                        placeholder="ml"
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
  import Produto from '@/views/estoque/item/Item.vue'
//   import Veiculos from '@/views/cadastros/veiculos/Veiculos.vue'
//   import Servicos from '@/views/cadastros/servico/Servico.vue'
  
export default {
    name: 'produtosNew',

    components: {
      Produto,
    //   Veiculos,
    //   Servicos
    },
  
    data: () => ({
        route: 'serviceProduct',
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
                        // this.object.purchaseValue = parseFloat(this.object.purchaseValue).toFixed(2)
                    })
                    .catch((err) => {
                        console.error(err)
                        this.$router.push({ name: 'agenda' })
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
                    // this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
        
                    const result = await insert(this.route, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Agenda criado com sucesso !')
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
        
                    // this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
        
                    const result = await update(this.route, this.$route.params.id, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.object = {}
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Agenda alterado com sucesso !')
                            this.$router.back()
                        }
                    } else {
                        this.modalBody = result.response.data
                        this.modalError.show()
                    }
                } else {
                    // this.object.purchaseValue = this.$filters.unformatMoney(this.object.purchaseValue)
        
                    const result = await insert(this.route, this.object)
        
                    if (result.status) {
                        if (result.status != '204') {
                            this.modalBody = result.response.data
                            this.modalError.show()
                        } else {
                            this.$store.dispatch('setShowToast', true)
                            this.$store.dispatch('setToastMessage', 'Agenda criado com sucesso !')
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

        handleSelectedProduto(item) {
            this.$refs.idProduct.modalZoom.hide()
            this.object.idProduct = item.id.toString()
        },

        // handleSelectedVeiculos(item) {
        //     this.$refs.idVehicles.modalZoom.hide()
        //     this.object.idVehicles = item.id.toString()
        // },

        // handleSelectedServico(item) {
        //     this.$refs.idService.modalZoom.hide()
        //     this.object.idService = item.id.toString()
        // },

        loadParam() {
            this.object.idService = this.$route.params.idService
        },
  
        logout() {
            logout(this)
        },
    },
  
    mounted() {
        this.loadParam()
        this.$route.name == 'produtoUpdate' ? (this.title = 'Edição de Produtos') : (this.title = 'Cadastro de Produtos')
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
  