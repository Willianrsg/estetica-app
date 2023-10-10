<template>
<div class="m-3">
    <div class="row">
        <div class="col-8">
            <s-title title="Veículos" :breadcrumb="true" icon="bi bi-car-front-fill" />
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
                    <template v-slot:licensePlate="{ item }">
                        <div class="text-center">
                            {{ item.licensePlate }}
                        </div>
                    </template>                
                    <template v-slot:fleet="{ item }">
                        <div class="text-center">
                            {{ item.fleet }}
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
                @click="this.$router.push({ name: 'veiculosNew' })"
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
    name: 'veiculos',

    data: () => ({
        route: 'vehicles',
        headers: [
            { title: 'Cliente', field: 'idClient' },
            { title: 'Placa', field: 'licensePlate' },
            { title: 'Modelo', field: 'model' },
            { title: 'Montadora', field: 'manufacturer' },
            { title: 'Frota', field: 'fleet' },
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
            { label: 'Cliente', ref: 'idClient', route: 'vehicles',  param: 'idClient', type: 'text', index: 1 },
            {
                label: 'Placa',
                ref: 'licensePlate',
                route: 'vehicles',
                param: 'licensePlate',
                type: 'text',
                index: 2,
            },
            { label: 'Modelo', ref: 'model', route: 'vehicles',  param: 'model', type: 'text', index: 3 },
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
                name: 'veiculosUpdate',
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
                    { title: 'Cliente', field: 'idClient' },
                    { title: 'Placa', field: 'licensePlate' },
                    { title: 'Modelo', field: 'model' },
                    { title: 'Montadora', field: 'manufacturer' },
                    { title: 'Frota', field: 'fleet' },
                    { title: 'Ações', field: 'actions' },
                ]
            } else if (this.filterOption == 2) {
                this.headers = [
                    { title: 'Placa', field: 'licensePlate' },
                    { title: 'Cliente', field: 'idClient' },
                    { title: 'Modelo', field: 'model' },
                    { title: 'Montadora', field: 'manufacturer' },
                    { title: 'Frota', field: 'fleet' },
                    { title: 'Ações', field: 'actions' },
                ]
            } else {
                this.headers = [
                    { title: 'Modelo', field: 'model' },
                    { title: 'Cliente', field: 'idClient' },
                    { title: 'Placa', field: 'licensePlate' },
                    { title: 'Montadora', field: 'manufacturer' },
                    { title: 'Frota', field: 'fleet' },
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
