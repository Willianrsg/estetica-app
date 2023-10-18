<template>
    <div class="m-3">
        <div class="row">
        <div class="col-8">
            <s-title title="Clientes" :breadcrumb="true" icon="bi bi-peoplebi bi-people-fill" />
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
                    <template v-slot:phone="{ item }">
                        <div class="text-center">
                            {{ item.phone }}
                        </div>
                    </template>
                    <template v-slot:actions="{ item }">
                        <div class="text-center" v-if="!zoom">
                            <s-tooltip label="Veículos">
                                <i
                                    class="bi bi-car-front-fill px-2"
                                    style="cursor: pointer"
                                    @click="details(item.id)"
                                ></i>
                            </s-tooltip>
                            <s-tooltip label="Editar">
                                <i
                                    class="bi bi-pencil-fill text-secondary px-2"
                                    style="cursor: pointer"
                                    @click="edit(item.id)"
                                ></i>
                            </s-tooltip>
                            <s-tooltip label="Excluir">
                                <i
                                    class="bi bi-trash-fill text-danger px-2"
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
                @click="this.$router.push({ name: 'clienteNew' })"
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
    // import { Modal } from 'bootstrap'
    
    export default {
        name: 'veiculos',
    
        data: () => ({
            route: 'client',
            headers: [
                { title: 'Nome', field: 'name' },
                { title: 'Contato', field: 'phone' },
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
                { label: 'Nome', ref: 'name', route: 'client',  param: 'name', type: 'text', index: 1 },
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
                    name: 'clienteUpdate',
                    params: { id: id },
                }
    
                this.$router.push(route)
            },
    
            async remove() {
                if (await this.$checkSession()) {
                    await remove(this.route, this.choosed.id)
    
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Cliente excluído com sucesso !')
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

            details(id) {
                const route = {
                    name: 'veiculo',
                    params: { idClient: id },
                }

                this.$router.push(route)
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
    }
</script>
    
<style></style>
    