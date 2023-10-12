<template>
    <div class="m-3">
        <div class="row">
            <div class="col-6">
                <!-- <s-title title="Produtos"  /> -->
                <s-title title="Produtos" :breadcrumb="true" icon="bi bi-car-front-fill" />
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
        <div class="card card-body mx-2 mt-3">
            <div class="row mt-3">
                <div class="col-12">
                    <s-input-text
                        label="Serviço"
                        ref="serviceName"
                        :isDisabled="true"
                        v-model="object.name"                    
                    />
                </div>
            </div>
            <hr class="border border-1"/>
            <div class="row">
                <div class="col-12">
                    <s-table
                        v-model="actualPage"
                        :headers="headers"
                        :items="items"
                        :totalPages="pages"
                        v-if="!loader"
                    >
                        <template v-slot:idProduct="{ item }">
                            <div class="text-center">
                                {{ item.idProduct }}
                            </div>
                        </template>                
                        <template v-slot:quantity="{ item }">
                            <div class="text-center">
                                {{ item.quantity }}
                            </div>
                        </template>                
                        <template v-slot:actions="{ item }">
                            <div class="text-center">
                                <s-tooltip label="Editar">
                                    <i
                                        class="bi bi-pencil-fill text-secondary px-1"
                                        style="cursor: pointer"
                                        @click="edit(item.id)"
                                    ></i>
                                </s-tooltip>
                                <s-tooltip label="Editar">
                                    <i
                                        class="bi bi-trash-fill text-danger px-1"
                                        style="cursor: pointer"
                                        @click="removeConfirm(item)"
                                    ></i>
                                </s-tooltip>
                            </div>                    
                        </template>
                    </s-table>
                </div>
                <div class="col-12" v-if="!loader">
                <s-button
                    type="button"
                    label="Novo"
                    color="primary"
                    icon="plus-lg"
                    @click="this.$router.push({ name: 'produtoNew' })"
                />
                </div>
            </div>
        <!-- <TheLoader v-if="loader" /> -->
        </div>
        <s-modal-delete ref="modalDelete" @confirm="remove" />
        <s-modal-notlogged ref="modalNotLogged" @confirm="logout" />
    </div>
    </template>
    
    <script>
    import { logout } from '@/rule/functions.js'
    import { get, remove, search } from '@/crud.js'
    
    export default {
        name: 'produtos',
    
        data: () => ({
            route: 'serviceProduct',
            headers: [
                { title: 'Produto', field: 'idProduct' },
                { title: 'Quantidade', field: 'quantity' },
                { title: 'Medida', field: 'measure' },
                { title: 'Ações', field: 'actions' },
            ],
            items: [],
            object: null,
            Modal: null,
            choosed: null,
            loader: false,
            modalDelete: null,
            modalNotLogged: null,
            pages: null,
            actualPage: 1,
            limit: 10,
    
            // filterObject: [
            //     { label: 'Cliente', ref: 'idClient', route: 'vehicles',  param: 'idClient', type: 'text', index: 1 },
            //     {
            //         label: 'Placa',
            //         ref: 'licensePlate',
            //         route: 'vehicles',
            //         param: 'licensePlate',
            //         type: 'text',
            //         index: 2,
            //     },
            //     { label: 'Modelo', ref: 'model', route: 'vehicles',  param: 'model', type: 'text', index: 3 },
            // ],
    
            filterOption: 1,
            filterParam: null
        }),
    
        // props: {
        //     zoom: {
        //         type: Boolean,
        //         default: false,
        //     },
        //     valueZoom: String,
        // },
    
        methods: {
            async loadItem() {
                if (await this.$checkSession()) {
                    let params = {}
                    params.id = this.$route.params.idService
    
                    await search(`service`, params)
                        .then((res) => {
                        this.object = res.data[0]
                    })
                    .catch((err) => {
                        console.log(err)
                        this.$router.go(-2)
                    })
                }
            },
            async loadItems(page = 1) {
                if (await this.$checkSession()) {
                    const query = { params: { page: page, limit: this.limit, idService: this.$route.params.idService } }
                    let raw = []
                    if (this.filterParam) {
                        this.filterParam.params.page = page
                        this.filterParam.params.limit = this.limit
                        raw = await search(this.filterParam.route, this.filterParam.params)
                    } else {
                        raw = await get(this.route, query)
                    }
                    this.items = raw.data
                    this.pages = Math.ceil(raw.total / this.limit)
                } else {
                    this.modalNotLogged.show()
                }
            },
    
            async edit(id) {
                const route = {
                    name: 'produtoUpdate',
                    params: { id: id },
                }
    
                this.$router.push(route)
            },
    
            async remove() {
                if (await this.$checkSession()) {
                    await remove(this.route, this.choosed.id)
    
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Veículo excluído com sucesso !')
                    this.loadItems()
                } else {
                    this.modalNotLogged.show()
                }
            },
    
            removeConfirm(item) {
                this.choosed = item
                this.modalDelete.show()
            },
    
            // async filterAll(event) {
            //     if (await this.$checkSession()) {
            //         this.filterParam = event
            //         this.loadItems(1)
            //     } else {
            //         this.modalNotLogged.show()
            //     }
            // },
    
            // handleIndex(event) {
            //     this.filterOption = event
            // },
    
            // changeHeaders() {
            //     if (this.filterOption == 1) {
            //         this.headers = [
            //             { title: 'Cliente', field: 'idClient' },
            //             { title: 'Placa', field: 'licensePlate' },
            //             { title: 'Modelo', field: 'model' },
            //             { title: 'Montadora', field: 'manufacturer' },
            //             { title: 'Frota', field: 'fleet' },
            //             { title: 'Ações', field: 'actions' },
            //         ]
            //     } else if (this.filterOption == 2) {
            //         this.headers = [
            //             { title: 'Placa', field: 'licensePlate' },
            //             { title: 'Cliente', field: 'idClient' },
            //             { title: 'Modelo', field: 'model' },
            //             { title: 'Montadora', field: 'manufacturer' },
            //             { title: 'Frota', field: 'fleet' },
            //             { title: 'Ações', field: 'actions' },
            //         ]
            //     } else {
            //         this.headers = [
            //             { title: 'Modelo', field: 'model' },
            //             { title: 'Cliente', field: 'idClient' },
            //             { title: 'Placa', field: 'licensePlate' },
            //             { title: 'Montadora', field: 'manufacturer' },
            //             { title: 'Frota', field: 'fleet' },
            //             { title: 'Ações', field: 'actions' },
            //         ]
            //     }
            // },
    
            logout() {
                logout(this)
            },
        },
    
        async created() {
            await this.loadItem()
            await this.loadItems()
        },
    
        async mounted() {
            await this.loadItems()
    
            this.modalDelete = new this.$Modal(this.$refs.modalDelete.$refs.modalPattern)
            this.modalNotLogged = new this.$Modal(this.$refs.modalNotLogged.$refs.modalPattern)
        },
    
        watch: {
            filterOption() {
                this.loadItems()
                this.changeHeaders()
            },
            actualPage() {
                this.loadItems(this.actualPage)
            },
        },
    }
</script>
    
<style></style>
    