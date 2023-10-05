<template>
  <div class="m-3 row">
    <div class="col-6">
      <s-title title="Grupos do Usuário" :breadcrumb="true"/>
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
      name="filterUserGroup"
      :filters="filterObject"
    />
  </div>
  <div class="card card-body mx-4">
    <div class="row mt-3">
      <div class="col-4">
        <s-input-text
          label="Nome"
          ref="userName"
          :isDisabled="true"
          v-model="object.name"
        />
      </div>
      <div class="col-4">
        <s-input-text
          label="E-mail"
          ref="userEmail"
          :isDisabled="true"
          v-model="object.email"
        />
      </div>
      <div class="col-4">
        <s-input-check
          label="Ativo"
          ref="userStatus"
          :isDisabled="true"
          v-model="object.status"
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
          <template v-slot:idUser="{ item }">
            <div class="text-center">
              {{ item.idUser }}
            </div>
          </template>
          <template v-slot:idGroup="{ item }">
            <div class="text-center">
              {{ item.idGroup }}
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
          @click="this.$router.push({ name: 'userGroupNew' });"
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
import { remove, getById, search } from '@/crud'
export default {
  name: 'UserGroupParent',

  data: () => ({
    object: {},
    items: [],
    choosed: null,
    modalDelete: null,
    modalNotLogged: null,
    Modal: null,
    pages: null,
    actualPage: 1,
    limit: 10,

    headers: [
      { title: 'Grupo', field: 'idGroup' },
      { title: 'Ações', field: 'actions'}
    ],

    filterObject: [
      { label: 'Grupo', ref: 'userGroup', route: "userGroup", subRoute: 'by-idGroup', param: ['idUser', 'idGroup'], paramValue: null, type: 'text', index: 1 }
    ],

    filterOption: 1,
    filterParam: null,
  }),

  methods: {
    async loadItem() {
      if (await this.$checkSession()) {
        await getById('user', this.$route.params.idUser)
        .then((res) => {
          this.object = res
          if (this.object.status == 1) {
            this.object.status = true
          }
          else {
            this.object.status = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: "user" })
        })
      }
    },

    async loadItems(page = 1) {
      if (await this.$checkSession()) {
        let params = {}
        params.userId = this.$route.params.idUser

        const query = { params: { page: page, limit: this.limit } }
        let raw = []
        if (this.filterParam) {
          this.filterParam.params.page = page
          this.filterParam.params.limit = this.limit
          raw = await search(this.filterParam.route, this.filterParam.params)
        } else {
          raw = await search(`user/search/userGroup-by-userId`, params, query)
        }
        this.items = raw.data
        this.pages = Math.ceil(raw.total / this.limit)
      } else {
        this.modalNotLogged.show()
      }
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
          { title: 'Grupo', field: 'idGroup' },
          { title: 'Ações', field: 'actions'}
        ]
      }

      else if (this.filterOption == 2) {
        this.headers = [
          { title: 'Grupo', field: 'idGroup' },
          { title: 'Ações', field: 'actions'}
        ]
      }
    },

    async edit(id) {
      const route = {
        name: 'userGroupUpdate',
        params: { id: id }
      }

      this.$router.push(route)
    },

    async remove() {
      if (await this.$checkSession()) {
        await remove('userGroup', this.choosed.id)
        this.loadItems()
        this.$store.dispatch('setShowToast', true)
        this.$store.dispatch('setToastMessage', 'Grupo excluído com sucesso !')
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
    this.filterObject[0].paramValue = this.$route.params.idUser
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