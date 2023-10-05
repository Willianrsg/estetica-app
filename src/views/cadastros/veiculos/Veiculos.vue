<template>
<div class="m-3">
    <div class="row">
    <div class="col-8">
        <s-title title="Veículos" :breadcrumb="true" icon="bi bi-car-front-fill" />
        <!-- <s-title title="Veículos" /> -->
    </div>
    </div>
    <s-input-filter
        @index="handleIndex"
        @filter="filterAll"
        @clear="loadItems"
        name="filterScreen"
        :filters="filterObject"
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
import { Modal } from 'bootstrap'

export default {
name: 'veiculos',

data: () => ({
    route: 'vehicles',
    headers: [
        { title: 'Modelo', field: 'model' },
        { title: 'Montadora', field: 'manufacturer' },
        { title: 'Placa', field: 'licensePlate' },
        { title: 'Cliente', field: 'client' },
        { title: 'Ações', field: 'actions' },
    ],
    items: [
        {model: '307', manufacturer: 'Peugeot', licensePlate: 'ABC-1234', client: 'Willian'},
        {model: 'Palio', manufacturer: 'Fiat', licensePlate: 'ETO-8561', client: 'Fulano'},
        {model: 'Gol', manufacturer: 'Volkswagen', licensePlate: 'GTR-5561', client: 'Rafael'},
        {model: 'A3', manufacturer: 'Audi', licensePlate: 'ASS1A65', client: 'Sicrano'},
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
        { label: 'Cliente', ref: 'client', route: 'vehicles',  param: 'client', type: 'text', index: 1 },
        {
            label: 'Placa',
            ref: 'licencePlate',
            route: 'vehicles',
            param: 'licencePlate',
            type: 'text',
            index: 2,
        },
    ],

    filterOption: 1,
    filterParam: null
}),

    methods: {
        async loadItems(page = 1) {
            // if (await this.$checkSession()) {
            //     const query = { params: { page: page, limit: this.limit } }
            //     let raw = []
            //     if (this.filterParam) {
            //     this.filterParam.params.page = page
            //     this.filterParam.params.limit = this.limit
            //     raw = await search(this.filterParam.route, this.filterParam.params)
            //     } else {
            //     raw = await get(this.route, query)
            //     }
            //     this.items = raw.data
            //     console.log(this.items);
            //     this.pages = Math.ceil(raw.total / this.limit)
            // } else {
            //     this.modalNotLogged.show()
            // }
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

        // changeHeaders() {
        //     if (this.filterOption == 1) {
        //         this.headers = [
        //         { title: 'Nome', field: 'name' },
        //         { title: 'Rota', field: 'route' },
        //         { title: 'Ordem', field: 'order' },
        //         { title: 'Ações', field: 'actions' },
        //         ]
        //     } else if (this.filterOption == 2) {
        //         this.headers = [
        //         { title: 'Rota', field: 'route' },
        //         { title: 'Nome', field: 'name' },
        //         { title: 'Ordem', field: 'order' },
        //         { title: 'Ações', field: 'actions' },
        //         ]
        //     } else {
        //         this.headers = [
        //         { title: 'Ordem', field: 'order' },
        //         { title: 'Nome', field: 'name' },
        //         { title: 'Rota', field: 'route' },
        //         { title: 'Ações', field: 'actions' },
        //         ]
        //     }
        // },

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
