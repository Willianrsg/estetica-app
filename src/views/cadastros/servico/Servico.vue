<template>
    <div class="m-3">
        <div class="row">
            <div class="col-8">
                <s-title title="Serviço" :breadcrumb="true" />
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
                        @click="this.$router.push({ name: 'servicoNew' })"
                    />
                </div>
            </div>
        <!-- <TheLoader v-if="loader" /> -->
        </div>
        <s-modal-error ref="modalDelete" @confirm="remove" />
        <s-modal-notlogged ref="modalNotLogged" @confirm="logout" />
    </div>
</template>
    
<script>
    import { logout } from '@/rule/functions.js'
    import { get, remove, search } from '@/crud.js'
    
export default {
    name: 'servico',

    data: () => ({
        route: 'service',
        headers: [
            { title: 'Nome', field: 'name' },
            { title: 'Preço', field: 'price' },
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
    
        filterObject: [
            { label: 'Nome', ref: 'name', route: 'service',  param: 'name', type: 'text', index: 1 },
            { label: 'Preço',ref: 'price', route: 'service', param: 'price', type: 'text', index: 2,},
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
                console.log(this.items);
                this.pages = Math.ceil(raw.total / this.limit)
            } else {
                this.modalNotLogged.show()
            }
        },

        async edit(id) {
            const route = {
                name: 'servicoUpdate',
                params: { id: id },
            }

            this.$router.push(route)
        },

        async remove() {
            if (await this.$checkSession()) {
                await remove(this.route, this.choosed.id)

                this.$store.dispatch('setShowToast', true)
                this.$store.dispatch('setToastMessage', 'Serviço excluído com sucesso !')
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

        handleIndex(event) {
            this.filterOption = event
        },

        changeHeaders() {
            if (this.filterOption == 1) {
                this.headers = [
                    { title: 'Nome', field: 'name' },
                    { title: 'Preço', field: 'price' },
                    { title: 'Ações', field: 'actions' },
                ]
            } else if (this.filterOption == 2) {
                this.headers = [
                    { title: 'Preço', field: 'price' },
                    { title: 'Nome', field: 'name' },
                    { title: 'Ações', field: 'actions' },
                ]
            } 
        },

        emitSelectedItem(item) {
            this.$emit('selectedItem', item)
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
    