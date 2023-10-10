<template>
    <div class="m-3">
        <div class="row">
            <div class="col-8">
                <s-title title="Agenda" :breadcrumb="true" icon="bi bi-calendar-week" />
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
                        <template v-slot:idClient="{ item }">
                            <div class="text-center">
                                {{ item.idClient }}
                            </div>
                        </template>
                        <template v-slot:idVehicles="{ item }">
                            <div class="text-center">
                                {{ item.idVehicles }}
                            </div>
                        </template>
                        <template v-slot:idService="{ item }">
                            <div class="text-center">
                                {{ item.idService }}
                            </div>
                        </template>
                        <template v-slot:date="{ item }">
                            <div class="text-center">
                                {{ $filters.formatDate(item.date) }}
                            </div>
                        </template>
                        <template v-slot:hour="{ item }">
                            <div class="text-center">
                                {{ item.hour }}
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
                    @click="this.$router.push({ name: 'agendaNew' })"
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
    name: 'agenda',
    
    data: () => ({
        route: 'schedule',
        headers: [
            { title: 'Cliente', field: 'idClient' },
            { title: 'Veículo', field: 'idVehicles' },
            { title: 'Serviço', field: 'idService' },
            // { title: 'Preço', field: 'price' },
            { title: 'Data', field: 'date' },
            { title: 'Hora', field: 'hour' },
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
            { label: 'Cliente', ref: 'idClient', route: 'agenda',  param: 'idClient', type: 'text', index: 1 },
            {
                label: 'Serviço',
                ref: 'idService',
                route: 'agenda',
                param: 'idService',
                type: 'text',
                index: 2,
            },
            {
                label: 'Data',
                ref: 'date',
                route: 'agenda',
                param: 'date',
                type: 'date',
                index: 3,
            },
            {
                label: 'Hora',
                ref: 'hour',
                route: 'agenda',
                param: 'hour',
                type: 'text',
                index: 4,
            },
        ],
    
        filterOption: 1,
        filterParam: null
    }),
    
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
                    name: 'agendaUpdate',
                    params: { id: id },
                }
    
                this.$router.push(route)
            },
    
            async remove() {
                if (await this.$checkSession()) {
                    await remove(this.route, this.choosed.id)
    
                    this.$store.dispatch('setShowToast', true)
                    this.$store.dispatch('setToastMessage', 'Agenda excluído com sucesso !')
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
                        { title: 'Veículo', field: 'idVehicle' },
                        { title: 'Serviço', field: 'idService' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Data', field: 'date' },
                        { title: 'Hora', field: 'hour' },
                        { title: 'Ações', field: 'actions' },
                    ]
                } else if (this.filterOption == 2) {
                    this.headers = [
                        { title: 'Serviço', field: 'idService' },
                        { title: 'Cliente', field: 'idClient' },
                        { title: 'Veículo', field: 'idVehicle' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Data', field: 'date' },
                        { title: 'Hora', field: 'hour' },
                        { title: 'Ações', field: 'actions' },
                    ]
                } else if (this.filterOption == 3) {
                    this.headers = [
                        { title: 'Data', field: 'date' },
                        { title: 'Cliente', field: 'idClient' },
                        { title: 'Veículo', field: 'idVehicle' },
                        { title: 'Serviço', field: 'idService' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Hora', field: 'hour' },
                        { title: 'Ações', field: 'actions' },
                    ]
                } else {
                    this.headers = [
                        { title: 'Hora', field: 'hour' },
                        { title: 'Cliente', field: 'idClient' },
                        { title: 'Veículo', field: 'idVehicle' },
                        { title: 'Serviço', field: 'idService' },
                        { title: 'Preço', field: 'price' },
                        { title: 'Data', field: 'date' },
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
    