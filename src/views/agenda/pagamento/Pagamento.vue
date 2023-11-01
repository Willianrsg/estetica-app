<template>
    <div class="m-3">
        <div class="row">
            <div class="col-6">
                <s-title title="Pagamento" :breadcrumb="true" icon="bi bi-currency-dollar" />
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
        
        <div class="row mt-1">

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
                                <s-input-text
                                    label="COD"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                    :isDisabled="true"
                                    v-model="object.idClient"                                            
                                />
                                <s-input-text
                                    label="Cliente"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                    :isDisabled="true"
                                    v-model="object.nameClient"                                            
                                />
                                <s-input-text
                                    label="Telefone"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-6"
                                    :isDisabled="true"
                                    v-model="object.phoneClient"                                       
                                />
                                <s-input-text
                                    label="CPF/CNPJ"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-6"
                                    :isDisabled="true"
                                    v-model="object.cpfCnpjClient"                                            
                                />
                                <s-input-text
                                    label="Endereço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                    :isDisabled="true"
                                    v-model="object.streetClient"                                            
                                />
                                <s-input-text
                                    label="N°"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                    :isDisabled="true"
                                    v-model="object.numberClient"                                            
                                />
                                <s-input-text
                                    label="Cidade"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-10"
                                    :isDisabled="true"
                                    v-model="object.cityClient"                                            
                                />
                                <s-input-text
                                    label="UF"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-12 col-xxl-2"
                                    :isDisabled="true"
                                    v-model="object.ufClient"                                            
                                />
                            </div>

                            <!-- DADOS SERVIÇO -->
                            <div class="row mt-2" v-if="service">
                                <s-input-text
                                    label="Serviço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                                    :isDisabled="true"
                                    v-model="object.idService"                                            
                                />
                                <s-input-text
                                    label="Serviço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-7 col-xxl-7"
                                    :isDisabled="true"
                                    v-model="object.nameService"                                            
                                />
                                <s-input-text
                                    label="Preço"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                                    :isDisabled="true"
                                    v-model="object.priceService"                                            
                                />
                                <s-input-text
                                    label="Veículo"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-7"
                                    :isDisabled="true"
                                    v-model="object.modelVehicles"                                            
                                />
                                <s-input-text
                                    label="Placa"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-3 col-xxl-3"
                                    :isDisabled="true"
                                    v-model="object.licensePlateVehicles"                                            
                                />
                                <s-input-text
                                    label="Frota"
                                    divClass="col-12 col-xs-12 col-sm-12 col-md-2 col-xxl-2"
                                    :isDisabled="true"
                                    v-model="object.fleetVehicles"                                            
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

                <!-- DIV BOTÕES  -->
                <div class="col-12 mt-2">
                    <div class="card card-body mx-2 mt-3" v-if="object">
                        <div class="row mt-1">
                            <span>Comprovante</span>
                            <hr class="border border-1"/>
                            <div class="col-12 mt-3 text-end">
                                <!-- <s-button
                                    type="button"
                                    color="primary"
                                    label="Finalizar"
                                    icon="bi bi-cart-check"
                                /> -->
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
                <div class="card card-body mx-2 mt-3">
                    <div class="row mt-1">
                        <span>Formas de Pagamento</span>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" @click="detailsPix()">
                                <i class="fa-brands fa-pix"></i>
                                <span>PIX</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" @click="detailsMoney()">
                                <span>Dinheiro</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" @click="detailsCard()">
                                <span>Cartão</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card pag card-body mx-2 mt-3" @click="detailsCredit()">
                                <span>Cartão Parcelado</span>
                            </div>
                        </div>
                    </div>

                    <hr class="border border-1"/>

                    <!-- PAG. DINHEIRO -->
                    <div class="row mt-2" v-if="money">
                        <h2>Dinheiro</h2>
                        <hr class="border border-1"/>
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

                    <!-- <hr class="border border-1"/> -->

                    <!-- PAG. CRÉDITO  -->
                    <div class="row mt-2" v-if="credito">
                        <h2>Cartão Parcelado</h2>
                        <hr class="border border-1"/>
                        <s-input-text
                            label="Sub Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="dataService.price"
                            :isDisabled="true"
                        />
                        <s-input-text
                            label="Desconto"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="desc"
                            @input="calcularTotal()"
                        />
                        <s-input-text
                            label="Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="total"
                            :isDisabled="true"
                        />
                        <s-select
                            label="Parcelas"
                            :items="installment"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="parcelas"
                        />
                        <!-- <s-input-text
                            label="Troco"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            v-model="troco"
                            :isDisabled="true"
                        /> -->
                    </div>

                    <!-- PAG. PIX  -->
                    <div class="row mt-2" v-if="pix">
                        <h2>PIX</h2>
                        <hr class="border border-1"/>
                        <s-input-text
                            label="Sub Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="dataService.price"
                            isDisabled="true"
                        />
                        <s-input-text
                            label="Desconto"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="desc"
                            @input="calcularTotal()"
                        />
                        <s-input-text
                            label="Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="total"
                            :isDisabled="true"
                        />
                        <s-input-text
                            label="Total Recebido no PIX"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="recDin"
                        />
                        <!-- <s-input-text
                            label="Troco"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            v-model="troco"
                            :isDisabled="true"
                        /> -->
                    </div>

                    <!-- PAG. CARTÃO  -->
                    <div class="row mt-2" v-if="card">
                        <h2>Cartão</h2>
                        <hr class="border border-1"/>
                        <s-input-text
                            label="Sub Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="dataService.price"
                            isDisabled="true"
                        />
                        <s-input-text
                            label="Desconto"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="desc"
                            @input="calcularTotal()"
                        />
                        <s-input-text
                            label="Total"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="total"
                            :isDisabled="true"
                        />
                        <s-select
                            label="Tipo"
                            :items="card" 
                            divClass="col-12 col-xs-12 col-sm-2 col-md-3 col-xxl-3"
                            v-model="card"
                        />
                        <!-- <s-input-text
                            label="Troco"
                            v-money="moneyConfig"
                            divClass="col-12 col-xs-12 col-sm-2 col-md-6 col-xxl-6"
                            v-model="troco"
                            :isDisabled="true"
                        /> -->
                    </div>

                    <div v-if="modo">
                        <hr class="border border-1"/>
                        <div class="row mt-1">
                            <div class="col-4">
                                <h5 >Modo de pagamento: </h5><span>{{ modo }}</span>
                            </div>
                            <div class="col-4 text-center">
                                <h5 >Parcelas: </h5><!-- <span v-if="parcelas">{{ parcelas }}</span> -->
                                <span >{{ '1' }}</span>
                                <template v-if="valorParcela">
                                    <div>
                                        <h5>Valor da Parcela:</h5>
                                        <span>R$ {{ valorParcela }}</span>
                                    </div>
                                </template>
                            </div>
                            <div class="col-4 text-end">
                                <h5>Total </h5><span>R$ {{ total }}</span>
                            </div>
                        </div>
                    </div>
                    






                    <div class="row mt-1">
                        <hr class="border border-1"/>
                        <div class="col-12 mt-3 text-end">
                            <s-button
                                type="button"
                                color="primary"
                                label="Finalizar"
                                icon="bi bi-cart-check"
                            />
                            <!-- <s-button
                                type="button"
                                color="primary"
                                label="Imprimir"
                                icon="bi bi-printer"
                            /> -->
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
import moment from 'moment'
    
    export default {
        name: 'agendaChildren',
    
        data: () => ({
            route: 'serviceProduct',

            client: true,
            service: false,
            product: false,

            credito: false,
            money: false,
            pix: false,
            card: false,

            total: null,
            desc: null,
            recDin: null,
            troco: null,
            modo: null,
            parcelas: null,
            valorParcela: null,

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

            card: [
                {label: 'Débito', value: 'Débito'},
                {label: 'Crédito', value: 'Crédito'},
            ],

            installment: [
                {label: '2x', value: '2'},
                {label: '3x', value: '3'},
                {label: '4x', value: '4'},
                {label: '5x', value: '5'},
                {label: '6x', value: '6'},
            ]
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
                        console.log(valorRecebido);
                        return (valorRecebido - valorTotal).toFixed(2).replace('.', ',')
                    }
                }
                return "0,00"
            }
        },

        methods: {
            calcularValorParcela() {
                if (this.parcelas) {
                    const total = parseFloat(this.total.replace(',', '.'));
                    const numParcelas = parseInt(this.parcelas);
                    const desconto = parseFloat(this.desc.replace(',', '.'));

                    if (!isNaN(total) && !isNaN(numParcelas) && numParcelas > 0) {
                        const valorComDesconto = total - desconto;
                        this.valorParcela = (valorComDesconto / numParcelas).toFixed(2).replace('.', ',');
                    }
                }
            },

            async loadItem() {
                if (await this.$checkSession()) {
                    let params = {}
                    params.id = this.$route.params.idAgenda
    
                    await search(`payment`, params)
                        .then((res) => {
                        this.object = res.data[0]
                        this.object.date = moment(this.object.date).format('DD/MM/YYYY')
                        this.object.priceService = parseFloat(this.object.priceService).toFixed(2).replace('.',',')
                        console.log('DADOS: ');
                        console.log(this.object);
                    })
                    .catch((err) => {
                        console.log(err)
                        this.$router.go(-2)
                    })
                }
            },

            async loadClient() {
                let params = {}
                params.id = this.object.idClient

                await search(`client`, params)
                    .then((res) => {
                        this.dataClient = res.data[0]
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            
            async loadService() {
                let params = {}
                params.id = this.object.idService

                await search(`service`, params)
                    .then((res) => {
                        this.dataService = res.data[0]
                        this.dataService.price = parseFloat(this.dataService.price).toFixed(2)
                        // this.total = parseFloat(this.dataService.price).toFixed(2)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            async loadProduct() {
                let params = {}
                params.id =  this.dataService.id

                await search(`serviceProduct`, params)
                    .then((res) => {
                        this.dataProduct = res/* .data[0] */
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

            detailsCredit(){
                this.credito = true
                this.money = false
                this.pix = false
                this.card = false
                this.modo = 'Parcelado'
                // this.parcelas = null
            },

            detailsMoney(){
                this.credito = false
                this.money = true
                this.pix = false
                this.card = false
                this.modo = 'Dinheiro'
                this.parcelas = null
            },
            
            detailsPix(){
                this.credito = false
                this.money = false
                this.pix = true
                this.card = false
                this.modo = 'PIX'
                this.parcelas = null
            },
            
            detailsCard(){
                this.credito = false
                this.money = false
                this.pix = false
                this.card = true
                this.modo = 'Cartão'
                this.parcelas = null
            },

            logout() {
                logout(this)
            },
        },
    
        async created() {
            await this.loadItem()
            await this.loadClient()
            await this.loadService()
            await this.loadProduct()
        },
    
        async mounted() {    
            this.modalDelete = new this.$Modal(this.$refs.modalDelete.$refs.modalPattern)
            this.modalNotLogged = new this.$Modal(this.$refs.modalNotLogged.$refs.modalPattern)
        },

        watch: {
            parcelas: 'calcularValorParcela',
            total: 'calcularValorParcela',
            desc: 'calcularValorParcela',
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
        background: #555555;
        color: #ffffff;
    }
    .pag:hover {
        cursor: pointer;
        background: #2a2a2a;
    }
</style>
    