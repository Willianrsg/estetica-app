<template>
    <div class="m-3">
        <div class="row">
            <div class="col-8">
                <s-title title="Item" :breadcrumb="true" icon="bi bi-journal-plus" />
            </div>
        </div>
        <s-input-filter
            @index="handleIndex"
            @filter="filterAll"
            @clear="loadItems"
            name="filterScreen"
            :filters="filterObject"
            v-if="!zoom"
        />
        <div class="card card-body mx-2">
            <div class="row">
                <div class="col-12">
                    <s-table
                        v-model="actualPage"
                        :headers="headers"
                        :items="items"
                        :totalPages="pages"
                        v-if="!loader"
                    >
                        <template v-slot:quantity="{ item }">
                            <div class="text-center">
                                {{ item.quantity }} <span>un</span>
                            </div>
                        </template>
                        <template v-slot:price="{ item }">
                            <div class="text-center">
                                {{ $filters.formatMoneyS(item.price) }}
                            </div>
                        </template>
                        <template v-slot:actions="{ item }">
                            <div class="text-center" v-if="!zoom">
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
                            <div class="text-center" v-if="zoom">
                                <s-button
                                    type="button"
                                    color="primary btn-sm"
                                    label="Selecionar"
                                    @click="emitSelectedItem(item)"
                                />
                            </div>
                        </template>
                    </s-table>
                </div>
                <div class="col-12" v-if="!loader && !zoom">
                    <s-button
                        type="button"
                        label="Novo"
                        color="primary"
                        icon="plus-lg"
                        @click="this.$router.push({ name: 'itemNew' })"
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
        name: 'Estoque',
    
        data: () => ({
            route: 'stock',
            headers: [
                { title: 'Produto', field: 'product' },
                { title: 'Marca', field: 'brand' },
                { title: 'Quantidade', field: 'quantity' },
                { title: 'Preço', field: 'price' },
                { title: 'Ações', field: 'actions' },
            ],
            items: [
                // {product: 'Shampoo Neutro', brand: 'Vonixx', quantity: 10, price: 'R$ 21,90'},
                // {product: 'Shampoo Ácido', brand: 'Evoxx', quantity: 15, price: 'R$ 35,90'},
                // {product: 'APC', brand: 'Vonixx', quantity: 25, price: 'R$ 17,90'},
                // {product: 'Cera em pasta', brand: 'Cadillac', quantity: 10, price: 'R$ 79,80'},
                // {product: 'Vitrificador', brand: 'MaxPro', quantity: 15, price: 'R$ 210,90'},
            ],
            object: null,
            Modal: null,
            choosed: null,
            loader: false,
            modalDelete: null,
            modalNotLogged: null,
            pages: null,
            actualPage: 1,
            limit: 10,
        
            filterObject: [
                { label: 'Produto', ref: 'product', route: 'stock',  param: 'product', type: 'text', index: 1 },
                {
                    label: 'Marca',
                    ref: 'brand',
                    route: 'stock',
                    param: 'brand',
                    type: 'text',
                    index: 2,
                },
                { label: 'Quantidade', ref: 'quantity', route: 'stock',  param: 'quantity', type: 'text', index: 3 },
            ],
        
            filterOption: 1,
            filterParam: null
        }),

        props: {
            zoom: {
                type: Boolean,
                default: false,
            },
            valueZoom: String,
        },
    
        methods: {
            async loadItems(page = 1) {
                if (await this.$checkSession()) {
                    const query = { params: { page: page, limit: this.limit } }
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
                    name: 'itemUpdate',
                    params: { id: id },
                }
    
                this.$router.push(route)
            },
    
            async remove() {
                if (await this.$checkSession()) {
                    await remove(this.route, this.choosed.id)
    
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Item excluído com sucesso !')
                    this.loadItems()
                } else {
                    this.modalNotLogged.show()
                }
            },
    
            removeConfirm(item) {
                this.choosed = item
                this.modalDelete.show()
            },
    
            async filterAll(event) {
                if (await this.$checkSession()) {
                    this.filterParam = event
                    this.loadItems(1)
                } else {
                    this.modalNotLogged.show()
                }
            },

            emitSelectedItem(item) {
                this.$emit('selectedItem', item)
            },
    
            handleIndex(event) {
                this.filterOption = event
            },
    
            changeHeaders() {
                if (this.filterOption == 1) {
                    this.headers = [
                        { title: 'Produto', field: 'product' },
                        { title: 'Marca', field: 'brand' },
                        { title: 'Quantidade', field: 'quantity' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Ações', field: 'actions' },
                    ]
                } else if (this.filterOption == 2) {
                    this.headers = [
                        { title: 'Marca', field: 'brand' },
                        { title: 'Produto', field: 'product' },
                        { title: 'Quantidade', field: 'quantity' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Ações', field: 'actions' },
                    ]
                } else {
                    this.headers = [
                        { title: 'Quantidade', field: 'quantity' },
                        { title: 'Produto', field: 'product' },
                        { title: 'Marca', field: 'brand' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Ações', field: 'actions' },
                    ]
                }
            },
    
            logout() {
                logout(this)
            },
        },
    
        async mounted() {
            await this.loadItems()
    
            this.modalDelete = new this.$Modal(this.$refs.modalDelete.$refs.modalPattern)
            this.modalNotLogged = new this.$Modal(this.$refs.modalNotLogged.$refs.modalPattern)
        },
    
        watch: {
            filterOption() {
                // this.loadItems()
                this.changeHeaders()
            },
            actualPage() {
                this.loadItems(this.actualPage)
            },
        },
    }
</script>
    
<style></style>
    