<template>
  <div class="m-3">
    <div class="row">
      <div class="col-8">
        <s-title title="Grupos" :breadcrumb="true" />
      </div>
    </div>
    <s-input-filter
      @index="handleIndex"
      @filter="filterAll"
      @clear="loadItems"
      name="filterGroup"
      :filters="filterObject"
    />
    <div class="card card-body mx-2">
      <div class="row">
        <div class="col-12">
          <s-table
            v-model="actualPage"
            :headers="headers"
            :items="items"
            v-if="!loader"
            :totalPages="pages"
          >
            <template v-slot:name="{ item }">
              {{ item.name }}
            </template>
            <template v-slot:actions="{ item }">
              <div class="text-center" v-if="!zoom">
                <i
                  class="bi bi-diagram-3-fill text-secondary px-1"
                  style="cursor: pointer"
                  @click="details(item.id)"></i>
                <i
                  class="bi bi-pencil-fill text-secondary px-1"
                  style="cursor: pointer"
                  @click="edit(item.id)"></i>
                <i
                  class="bi bi-trash-fill text-danger px-1"
                  style="cursor: pointer"
                  @click="removeConfirm(item)"></i>
              </div>
              <div class="text-center" v-if="zoom">
                <s-button
                  type="button"
                  color="primary btn-sm"
                  label="Selecionar"
                  @click=";(selectedItem = item), emitSelectedItem(item)"
                />
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
            @click="this.$router.push({ name: 'groupNew' })"
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
  name: 'Group',

  props: {
    zoom: {
      type: Boolean,
      default: false,
    },
    valueZoom: String,
  },

  data: () => ({
    route: 'group',
    headers: [
      { title: 'Nome', field: 'name' },
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
      { label: 'Nome', ref: 'groupName', route: 'group', subRoute: 'by-name', param: 'name', type: 'text', index: 1 },
    ],

    userMail: null,
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
        name: 'groupUpdate',
        params: { id: id },
      }

      this.$router.push(route)
    },

    async remove() {
      if (await this.$checkSession()) {
        await remove(this.route, this.choosed.id)

        this.$store.dispatch('setShowToast', true)
        this.$store.dispatch('setToastMessage', 'Grupo excluído com sucesso !')
        this.loadItems()
      } else {
        this.modalNotLogged.show()
      }
    },

    removeConfirm(item) {
      this.choosed = item
      this.modalDelete.show()
    },

    emitSelectedItem(item) {
      this.$emit('selectedItem', item)
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

    details(id) {
      const route = {
        name: 'aclChildren',
        params: { id_group: id },
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
