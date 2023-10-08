<template>
  <div class="m-3 row">
    <div class="col-6">
      <s-title title="Regras - Controle de Acessos" :breadcrumb="true"/>
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
    <s-input-filter
      @index="handleIndex"
      @filter="filterAll"
      @clear="loadItems"
      name="filterAcl"
      :filters="filterObject"
    />
  </div>
  <div class="card card-body mx-4">
    <div class="row mt-3">
      <div class="col-12">
        <s-input-text
          label="Nome"
          ref="groupName"
          :isDisabled="true"
          v-model="object.name"
        />
      </div>
    </div>
    <hr class="border border-1"/>
    <div clas="row">
      <div class="col-12">
        <s-table
          :headers="headers"
          :items="items"
          :totalPages="pages"
          v-model="actualPage"
        >
          <template v-slot:idGroup="{ item }">
            <div class="text-center">
              {{ item.idGroup }}
            </div>
          </template>
          <template v-slot:idScreen="{ item }">
            <div class="text-center">
              {{ item.idScreen }}
            </div>
          </template>
          <template v-slot:status="{ item }">
            <div class="text-center">
              {{ item.status }}
            </div>
          </template>
          <template v-slot:actions="{ item }">
            <div class="text-center">
              <i
                class="bi bi-pencil-fill text-secondary px-1"
                style="cursor: pointer"
                @click="edit(item.id)"></i>
              <i
                class="bi bi-trash-fill text-danger px-1"
                style="cursor: pointer"
                @click="removeConfirm(item)"></i>
            </div>
          </template>
        </s-table>
      </div>
      <div class="col-12">
        <s-button
          type="button"
          label="Novo"
          color="primary"
          icon="plus-lg"
          @click="this.$router.push({ name: 'aclNew' });"
        />
      </div>
    </div>

    <s-modal-delete
      ref="modalDelete"
      @confirm="remove"
    />
    <s-modal-notlogged
      ref="modalNotLogged"
      @confirm="logout"
    />
  </div>
</template>

<script>
import { logout } from '@/rule/functions'
import { remove, search } from '@/crud'

export default {
  name: 'AclParent',

  data: () => ({
    object: {},
    items: [],
    choosed: null,
    modalNotLogged: null,
    modalDelete: null,
    Modal: null,
    pages: null,
    actualPage: 1,
    limit: 2,

    headers: [
      { title: 'Programa', field: 'idScreen' },
      { title: 'Status', field: 'status' },
      { title: 'Ações', field: 'actions' },
    ],

    filterObject: [
      { label: 'Programa', ref: 'aclScreen', route: "acl", subRoute: 'by-id-screen', param: 'id_screen', type: 'text', index: 1 },
      { label: 'Status', ref: 'aclStatus', route: "acl", subRoute: 'by-status', param: 'status', type: 'text', index: 2 }
    ],

    filterOption: 10,
    filterParam: null,
  }),

  methods: {
    async loadItem() {
      if (await this.$checkSession()) {
        let params = {}
        params.id = this.$route.params.id_group

        await search(`group`, params)
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
        const query = { params: { page: page, limit: this.limit, id_group: this.$route.params.id_group } }

        let raw = []
        if (this.filterParam) {
          this.filterParam.page = page
          this.filterParam.limit = this.limit
          raw = await search("acl", this.filterParam)
        } else {
          raw = await search(`acl`, query.params)
        }
        this.items = raw.data
        this.pages = Math.ceil(raw.total / this.limit)
        this.totalRows = raw.total
      } else {
        this.modalNotLogged.show()
      }
    },

    async edit(event, id) {
      const el = event.srcElement.tagName;

      if (el === 'DIV') {
        const route = {
          name: 'aclUpdate',
          params: { id: id },
        }

        this.$router.push(route)
      }
    },
    // async loadItem() {
    //   if (await this.$checkSession()) {
    //     let params = {}
    //     params.id = this.$route.params.id_group

    //     await search(`group/search/by-id`, params)
    //     .then((res) => {
    //       this.object = res.data[0]
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.$router.go(-2)
    //     })
    //   }
    // },

    // async loadItems(page = 1) {
    //   if (await this.$checkSession()) {
    //     let params = {}
    //     params.id_group = this.$route.params.id_group

    //     const query = { params: { page: page, limit: this.limit } }

    //     let raw = []
    //     if (this.filterParam) {
    //       this.filterParam.params.page = page
    //       this.filterParam.params.limit = this.limit
    //       raw = await search(this.filterParam.route, this.filterParam.params)
    //     } else {
    //       raw = await search(`group/search/acl-by-id`, params, query)
    //       console.log(raw)
    //     }
    //     this.items = raw.data
    //     this.pages = Math.ceil(raw.total / this.limit)
    //   } else {
    //     this.modalNotLogged.show()
    //   }
    // },

    async filterAll(event) {
      if (await this.$checkSession()) {
          this.items = event

          if (!this.items) { this.items = [] }
        }

       else { this.modalNotLogged.show() }
    },

    handleIndex(event) {
      this.filterOption = event
    },

    changeHeaders() {
      if (this.filterOption == 1) {
        this.headers = [
          { title: 'Programa', field: 'idScreen' },
          { title: 'Status', field: 'status' },
          { title: 'Ações', field: 'actions' },
        ]
      } else if (this.filterOption == 2) {
        this.headers = [
          { title: 'Status', field: 'status' },
          { title: 'Programa', field: 'idScreen' },
          { title: 'Ações', field: 'actions' },
        ]
      }
    },

    // async edit(id) {
    //   const route = {
    //     name: 'aclUpdate',
    //     params: { id: id }
    //   }

    //   this.$router.push(route)
    // },

    async remove() {
      if (await this.$checkSession()) {
        await remove('acl', this.choosed.id)

        this.$emit('removed')
        this.$store.dispatch('setShowToast', true)
        this.$store.dispatch('setToastMessage', 'ACL excluída com sucesso !')
        this.loadItems()
      }

      else { this.modalNotLogged.show() }
    },

    removeConfirm(item) {
      this.choosed = item
      this.modalDelete.show()
    },

    logout() { logout(this) }
  },

  async created() {
    await this.loadItem()
    await this.loadItems()
  },

  mounted() {
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
  }
}
</script>

<style>

</style>