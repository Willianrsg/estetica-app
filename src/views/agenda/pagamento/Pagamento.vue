<template>
    <div class="m-3">
        <div class="row">
            <div class="col-6">
                <s-title title="Pagamento"  />
                <!-- <s-title title="Pagamento" :breadcrumb="true" icon="bi bi-currency-dollar" /> -->
            </div>
            <div class="col-6 text-end">
                <s-button
                    type="button"
                    color="primary"
                    label="Voltar"
                    icon="bi bi-arrow-left"
                    @click="$router.back()"
                />
            </div>
        </div>

        <!-- <div class="card card-body mx-2 mt-3" v-if="object">
            <div class="row mt-3">
                <s-input-text
                    label="COD"
                    divClass="col-12 col-xs-12 col-sm-2 col-md-2 col-xxl-2"
                    :isDisabled="true"
                    v-model="object.id"                                            
                />
                <s-input-text
                    label="Cliente"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-10 col-xxl-10"
                    :isDisabled="true"
                    v-model="object.clientName"                                            
                />
                <s-input-text
                    label="Veículo"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-4 col-xxl-4"
                    :isDisabled="true"
                    v-model="object.vehiclesModel"                                           
                />
                <s-input-text
                    label="Serviço"
                    divClass="col-12 col-xs-12 col-sm-12 col-md-4 col-xxl-4"
                    :isDisabled="true"
                    v-model="object.serviceName"                                           
                />
                <s-input-text
                    label="Data"
                    divClass="col-12 col-xs-12 col-sm-2 col-md-2 col-xxl-2"
                    :isDisabled="true"
                    v-model="object.date"                                           
                />
                <s-input-text
                    label="Hora"
                    divClass="col-12 col-xs-12 col-sm-2 col-md-2 col-xxl-2"
                    :isDisabled="true"
                    v-model="object.hour"                                            
                />
            </div>
            <hr class="border border-1"/>            
        
        </div> -->
        
        <div class="row mt-3">

            <!-- CARD DE DADOS -->
            <div class="col-6">
                <div class="card card-body mx-2 mt-3" v-if="object">

                    <!-- CARD DE BOTÕES -->
                    <div class="row mt-1">

                        <!-- CLIENTE -->
                        <div class="col-4">
                            <div class="card card-body test mt-1" @click="detailsClient()">
                                <span class="text-center text-white">
                                    Cliente
                                    <i
                                        class="bi bi-peoplebi bi-people-fill text-white px-1"
                                        style="cursor: pointer"                                        
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <!-- SERVIÇO -->
                        <div class="col-4">
                            <div class="card card-body test mt-1" @click="detailsService()">
                                <span class="text-center text-white">
                                    Serviço
                                    <i
                                        class="bi bi-wrench-adjustable-circle text-white px-1"
                                        style="cursor: pointer"
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <!-- PRODUTO -->
                        <div class="col-4">
                            <div class="card card-body test mt-1" @click="detailsProduct()">
                                <span class="text-center text-white">
                                    Produtos
                                    <i
                                        class="bi bi-box-seam text-white px-1"
                                        style="cursor: pointer"
                                    ></i>
                                </span>
                            </div>
                        </div>

                    </div> 
                    
                    <!-- CARD DE DADOS -->
                    <div class="row mt-2">
                        <div class="card card-body mx-2 mt-3" v-if="dataClient">

                            <!-- DADOS CLIENTE -->
                            <div class="row mt-2" v-if="client">
                                <!-- <div id="cliente" v-if="client"> -->
                                    <s-input-text
                                        label="COD"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                        :isDisabled="true"
                                        v-model="dataClient.id"                                            
                                    />
                                    <s-input-text
                                        label="Cliente"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                        :isDisabled="true"
                                        v-model="dataClient.name"                                            
                                    />
                                    <s-input-text
                                        label="Telefone"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-6"
                                        :isDisabled="true"
                                        v-model="dataClient.phone"                                       
                                    />
                                    <s-input-text
                                        label="CPF/CNPJ"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-6"
                                        :isDisabled="true"
                                        v-model="dataClient.cpfCnpj"                                            
                                    />
                                    <s-input-text
                                        label="Endereço"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                        :isDisabled="true"
                                        v-model="dataClient.street"                                            
                                    />
                                    <s-input-text
                                        label="N°"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                        :isDisabled="true"
                                        v-model="dataClient.number"                                            
                                    />
                                    <s-input-text
                                        label="Cidade"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                        :isDisabled="true"
                                        v-model="dataClient.city"                                            
                                    />
                                    <s-input-text
                                        label="UF"
                                        divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                        :isDisabled="true"
                                        v-model="dataClient.state"                                            
                                    />
                                <!-- </div> -->
                            </div>

                            <!-- DADOS SERVIÇO -->
                            <div id="servico" v-if="service">
                                <s-input-text
                                    label="Serviço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataService.id"                                            
                                />
                                <s-input-text
                                    label="Serviço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataService.name"                                            
                                />
                                <s-input-text
                                    label="Preço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataService.price"                                            
                                />
                            </div>

                            <!-- DADOS PRODUTO -->
                            <div id="produto" v-if="product">
                                <s-input-text
                                    label="COD"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataProduct.id"                                            
                                />
                                <s-input-text
                                    label="Produto"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataProduct.productName"                                            
                                />
                                <s-input-text
                                    label="Quantidade"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataProduct.quantity"                                            
                                />
                                <s-input-text
                                    label="Medida"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-12"
                                    :isDisabled="true"
                                    v-model="dataProduct.measure"                                            
                                />
                            </div>
                        </div>
                    </div>
                    <TheLoader v-if="loader" />
                </div>
            </div>

            <!-- CARD INFO PAGAMENTO -->
            <div class="col-6">
                <div class="card card-body mx-2 mt-3" v-if="object">
                    <div class="row mt-2">
                        <s-input-text
                            label="Data"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            :isDisabled="true"
                            v-model="object.date"
                        />
                        <s-input-text
                            label="Hora"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            :isDisabled="true"
                            v-model="object.hour"
                        />
                    </div>
                </div>
                <div class="card card-body mx-2 mt-3" v-if="object">
                    <div class="row mt-2">
                        <!-- <span>teste</span> -->
                        <s-input-text
                            label="Sub Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-4 col-xxl-4"
                            :isDisabled="true"
                            v-model="dataService.price"
                        />
                        <s-input-text
                            label="Desconto"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-4 col-xxl-4"
                            v-model="desc"
                            @input="calcularTotal()"
                        />
                        <s-input-text
                            label="Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-4 col-xxl-4"
                            v-model="total"
                            :isDisabled="true"
                        />
                        <s-input-text
                            label="Total Recebido em Dinheiro"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            v-model="recDin"
                            @input="calcularTroco()"
                        />
                        <s-input-text
                            label="Troco"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            v-model="troco"
                            :isDisabled="true"
                        />
                    </div>
                    <hr class="border border-1"/>
                    <div class="row mt-1">
                        <span>Formas de Pagamento</span>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" v-if="object">
                                <i class="fa-brands fa-pix"></i>
                                <span>PIX</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" v-if="object">
                                <span>Dinheiro</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" v-if="object">
                                <span>Cartão</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" v-if="object">
                                <span>Cartão Parcelado</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 mt-3 text-end">
                            <s-button
                                type="button"
                                color="primary"
                                label="Finalizar"
                                icon="bi bi-cart-check"
                            />
                        <!-- </div>
                        <div class="col-6 mt-3 text-end"> -->
                            <s-button
                                type="button"
                                color="primary"
                                label="Imprimir"
                                icon="bi bi-printer"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        
        <s-modal-delete ref="modalDelete" @confirm="remove" />
        <s-modal-notlogged ref="modalNotLogged" @confirm="logout" />
    </div>
    </template>
    
<script>
    import { logout } from '@/rule/functions.js'
    import { search } from '@/crud.js'
    import TheLoader from '@/components/efeito/TheLoader.vue'
    
    export default {
        name: 'pagamento',
    
        data: () => ({
            route: 'serviceProduct',

            client: true,
            service: false,
            product: false,

            total: null,
            desc: null,
            recDin: null,
            troco: null,

            loader: false,

            dataClient: null,
            dataService: null,
            dataProduct: null,
            item: null,

            object: null,
            modalDelete: null,
            modalNotLogged: null,

            moneyConfig: {
            decimal: ',',
            thousands: '.',
            precision: 2,
            masked: false,
        },
        }),

        computed: {
            total() {
                if (this.desc) {
                    const desconto = parseFloat(this.desc.replace(',', '.'))
                    const precoServico = parseFloat(this.dataService.price.replace(',', '.'))
                    
                    if (!isNaN(desconto) && !isNaN(precoServico)) {
                        const subTotal = precoServico;
                        return (subTotal - desconto).toFixed(2).replace('.', ',')
                    }
                }
                return null
            }, 

            troco() {
                if (this.recDin) {
                    const valorRecebido = parseFloat(this.recDin.replace(',', '.'))
                    const valorTotal = parseFloat(this.total.replace(',', '.'))

                    if (!isNaN(valorRecebido) && !isNaN(valorTotal)) {
                        return (valorRecebido - valorTotal).toFixed(2).replace('.', ',')
                    }
                }
                return null
            }
        },

        methods: {
            async loadItem() {
                if (await this.$checkSession()) {
                    let params = {}
                    params.id = this.$route.params.idAgenda
    
                    await search(`schedule`, params)
                        .then((res) => {
                        this.object = res.data[0]
                        // this.object.date = $formatDate(this.object.date)
                        console.log('AGENDA');
                        console.log(this.object);
                    })
                    .catch((err) => {
                        console.log(err)
                        this.$router.go(-2)
                    })
                }
            },

            // async loadItems(page = 1) {
            //     if (await this.$checkSession()) {
            //         const query = { params: { page: page, limit: this.limit, idService: this.$route.params.idService } }
            //         let raw = []
            //         if (this.filterParam) {
            //             this.filterParam.params.page = page
            //             this.filterParam.params.limit = this.limit
            //             raw = await search(this.filterParam.route, this.filterParam.params)
            //         } else {
            //             raw = await get(this.route, query)
            //         }
            //         this.items = raw.data
            //         console.log(this.items);
            //         this.pages = Math.ceil(raw.total / this.limit)
            //     } else {
            //         this.modalNotLogged.show()
            //     }
            // },

            async loadClient() {
                let params = {}
                params.id = this.object.idClient

                await search(`client`, params)
                    .then((res) => {
                        this.dataClient = res.data[0]
                        console.log('Cliente: ');
                        console.log(this.dataClient);
                    })
                    .catch((err) => {
                        console.log(err)
                        // this.$router.go(-2)
                    })
            },
            
            async loadService() {
                let params = {}
                params.id = this.object.idService

                await search(`service`, params)
                    .then((res) => {
                        this.dataService = res.data[0]
                        this.dataService.price = parseFloat(this.dataService.price).toFixed(2)
                        this.total = parseFloat(this.dataService.price).toFixed(2)
                        console.log('SERVIÇO: ');
                        console.log(this.dataService);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            async loadProduct() {
                let params = {}
                params.id = await this.dataService.id

                await search(`serviceProduct`, params)
                    .then((res) => {
                        this.dataProduct = res/* .data[0] */
                        console.log('PRODUTO: ');
                        console.log(this.dataProduct);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            async detailsClient(){
                this.client = true
                this.service = false
                this.product = false
                this.loader = true                
            },
            
            detailsService(){
                this.service = true
                this.client = false
                this.product = false
            },

            detailsProduct(){
                this.product = true
                this.client = false
                this.service = false
            },

            calcularTotal() {
                if (this.desc) {
                    const desconto = parseFloat(this.desc.replace(',', '.'))

                    if (!isNaN(desconto)) {
                        const precoServico = parseFloat(this.dataService.price.replace(',', '.'))
                        const subTotal = precoServico
                        const total = subTotal - desconto
                        this.total = total.toFixed(2).replace('.', ',')
                    }
                }
            },

            calcularTroco() {
                if (this.recDin) {
                    const valorRecebido = parseFloat(this.recDin.replace(',', '.'));
                    const valorTotal = parseFloat(this.total.replace(',', '.')); // Certifique-se de que this.total esteja definido

                    if (!isNaN(valorRecebido) && !isNaN(valorTotal)) {
                        this.troco = (valorRecebido - valorTotal).toFixed(2).replace('.', ',');
                    }
                }
            },

    
            // async edit(id) {
            //     const route = {
            //         name: 'produtoUpdate',
            //         params: { id: id },
            //     }
    
            //     this.$router.push(route)
            // },
    
            // async remove() {
            //     if (await this.$checkSession()) {
            //         await remove(this.route, this.choosed.id)
    
            //         this.$store.dispatch('setShowToast', true)
            //         this.$store.dispatch('setToastMessage', 'Veículo excluído com sucesso !')
            //         this.loadItems()
            //     } else {
            //         this.modalNotLogged.show()
            //     }
            // },
    
            // removeConfirm(item) {
            //     this.choosed = item
            //     this.modalDelete.show()
            // },
    
            logout() {
                logout(this)
            },
        },
    
        async created() {
            await this.loadItem()
            await this.loadClient()
            await this.loadService()
            await this.loadProduct()
            // await this.loadItems()
        },
    
        async mounted() {
            // await this.loadItems()
    
            this.modalDelete = new this.$Modal(this.$refs.modalDelete.$refs.modalPattern)
            this.modalNotLogged = new this.$Modal(this.$refs.modalNotLogged.$refs.modalPattern)
        },
    }
</script>
    
<style>
    .test {
        background: black;
    }
    .test:hover {
        cursor: pointer;
        background: #555555;
    }
    .pag {
        background: #cacaf7;
    }
    .pag:hover {
        cursor: pointer;
        background: #b4b4f7;
    }
</style>
    