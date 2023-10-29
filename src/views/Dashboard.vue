<template>
    <div class="m-3">
      <div class="row">
        <div class="col-8">
          <s-title title="Dashboard" icon="bi bi-pie-chart-fill"/>
        </div>
      </div>
      <div class="mx-2">        
        <div class="text-center text-secondary">
          <h6>Atualizado em:</h6>
        </div>
      </div>
    </div>
  </template>
  
<script>
// import moment from 'moment'
// import { checkSession } from '@/rule/functions.js'
// import { get, search } from '@/crud.js'
// import Servico from '@/views/sistema/servico/Servico.vue'
// import Equipe from '@/views/sistema/equipe/Equipe.vue'
// import TheKPICard from '@/components/formComponents/TheKPICard.vue'
// import { Modal } from 'bootstrap'

export default {
name: 'Dashboard',

// components: {
//     Servico,
//     Equipe,
//     TheKPICard
// },

data: () => ({
    headerUrgentOrders: [
    { title: 'Protocolo', field: 'protocolo' },
    { title: 'Serviço', field: 'idServiceRequested' },
    { title: 'Equipe', field: 'idTeam' },
    { title: 'SLA', field: 'time' },
    { title: 'Vencimento', field: 'Vencimento' },
    { title: 'Status', field: 'Status' },
    { title: 'Andamento', field: 'status' }
    ],
    itemsUrgentOrders: [],
    itemsExpiredOrders: [],
    lastUpdate: null,

    allOsFilterStatus: null,
    allOsProtocolNumber: null,
    allOsService: null,
    allOsServiceOptions: [],
    allOsTeam: null,
    allOsTeamOptions: [],
    allOsSla: null,
    allOsSlaOptions: [],

    Modal: null,
    modalFilterAllOs: null,

    pages: null,
    actualPage: 1,
    limit: 10,

    totalOpenUrgent: 0,
    totalExpired: 0
}),

methods: {
    // async loadUrgentOrders (page = 1) {
    // if (await checkSession()) {
    //     const query = { params: { page: page, limit: this.limit } }
    //     const raw = await get('dashboard/getDailyUrgentOrders', query)

    //     this.itemsUrgentOrders = raw.data
    //     this.pages = Math.ceil(raw.total / this.limit)
    //     this.totalOpenUrgent = raw.total
    // }
    // },

    // async loadExpiredOrders (page = 1) {
    // if (await checkSession()) {
    //     const query = { params: { page: page, limit: this.limit } }
    //     const raw = await get('dashboard/getExpiredOrders', query)

    //     // this.itemsExpiredOrders = raw.data
    //     // this.pages = Math.ceil(raw.total / this.limit)
    //     this.totalExpired = raw.total
    // }
    // },

    // formatDate (date) {
    // return moment(date).add(3, 'hour').format('DD/MM/YYYY HH:mm')
    // },

    // formatDateAdd (date, time) {
    // if (!date) {
    //     return ''
    // }
    // return moment(date)
    //     .add(time + 3, 'hour')
    //     .format('DD/MM/YYYY HH:mm')
    // },

    // translateProgressText (status) {
    // let text = status

    // switch (status) {
    //     case 'PENDENTE DE CARGA NO EQUIPAMENTO':
    //     text = 'PENDENTE DE CARGA'
    //     break
    //     case 'AGUARDANDO EQUIPE CONFIRMAR RECEBIMENTO':
    //     text = 'AGUARDAR RECEBIMENTO'
    //     break
    // }

    // return text
    // },

    // getProgressColor (status) {
    // switch (status) {
    //     case 'PENDENTE DE ROTEIRIZAÇÃO':
    //     return 'badge rounded-pill text-bg-warning'
    //     case 'PENDENTE DE CARGA NO EQUIPAMENTO':
    //     return 'badge rounded-pill text-bg-warning'
    //     case 'PENDENTE DE EXECUÇÃO':
    //     return 'badge rounded-pill text-bg-warning'
    //     case 'AGUARDANDO EQUIPE CONFIRMAR RECEBIMENTO':
    //     return 'badge rounded-pill text-bg-primary'
    //     case 'EM EXECUÇÃO':
    //     return 'badge rounded-pill text-bg-primary'
    //     case 'EXECUTADO':
    //     return 'badge rounded-pill text-bg-success'
    //     case 'REJEITADO PELA EQUIPE':
    //     return 'badge rounded-pill text-bg-danger text-white'
    //     case 'NÃO EXECUTADO':
    //     return 'badge rounded-pill text-bg-danger text-white'
    // }
    // },

    // translateStatusText (item) {
    // let text = ''

    // if (this.calculateDueTime(item.protocolDate, item.time) <= 0) {
    //     text = 'EM ATRASO'
    // } else if (
    //     this.calculateDueTime(item.protocolDate, item.time) <
    //     (item.time * 60) / 2
    // ) {
    //     text = 'EXPIRANDO'
    // } else if (
    //     this.calculateDueTime(item.protocolDate, item.time) >=
    //     (item.time * 60) / 2
    // ) {
    //     text = 'NO PRAZO'
    // }

    // return text
    // },

    // getStatusColor (item) {
    // let classes = ''

    // if (this.calculateDueTime(item.protocolDate, item.time) <= 0) {
    //     classes = 'badge rounded-pill text-bg-danger text-white'
    // } else if (
    //     this.calculateDueTime(item.protocolDate, item.time) <
    //     (item.time * 60) / 2
    // ) {
    //     classes = 'badge rounded-pill text-bg-warning'
    // } else if (
    //     this.calculateDueTime(item.protocolDate, item.time) >=
    //     (item.time * 60) / 2
    // ) {
    //     classes = 'badge rounded-pill text-bg-success'
    // }

    // return classes
    // },

    // calculateDueTime (protocolDate, time) {
    // let currentDate = moment()
    // let limitDate = moment(protocolDate).add(time + 3, 'hour')

    // return limitDate.diff(currentDate, 'minutes')
    // },

    // async filterAllOs () {
    // if (await checkSession()) {
    //     let subRoute = ''
    //     let params = {}

    //     if (this.allOsProtocolNumber) {
    //     params.protocolo = this.allOsProtocolNumber
    //     subRoute = 'by-numero-protocolo'
    //     }

    //     if (this.allOsService) {
    //     params.id_service_requested = this.allOsService
    //     subRoute = 'by-service-requested'
    //     }

    //     if (this.allOsTeam) {
    //     params.id_team = this.allOsTeam
    //     subRoute = 'by-team'
    //     }

    //     if (this.allOsSla) {
    //     params.time = this.allOsSla
    //     subRoute = 'by-sla'
    //     }

    //     if (subRoute) {
    //     this.itemsUrgentOrders = await search(
    //         `os/urgentOrders/${subRoute}`,
    //         params
    //     )

    //     if (!this.itemsUrgentOrders) {
    //         this.itemsUrgentOrders = []
    //     }
    //     } else [await this.loadUrgentOrders()]
    // }
    // },

    // handleSelectedService (item) {
    // this.$refs.allOsService.modalZoom.hide()
    // this.allOsService = item.externalCode.toString()
    // },

    // handleSelectedTeam (item) {
    // this.$refs.allOsTeam.modalZoom.hide()
    // this.allOsTeam = item.id.toString()
    // },

    // clearFilterAllOs () {
    // this.allOsProtocolNumber = null
    // this.allOsService = null
    // this.allOsTeam = null
    // this.allOsSla = null

    // this.filterAllOs()
    // },

    // async reloadData () {
    // this.lastUpdate = moment().format('DD/MM/YYYY HH:mm:ss')

    // await this.filterAllOs()
    // await this.loadUrgentOrders(this.actualPage)
    // await this.loadExpiredOrders(this.actualPage)
    // },

    // detailOS (id) {
    // if (this.$route.name == 'dashboard') {
    //     const route = {
    //     name: 'osDetail',
    //     params: { id: id }
    //     }

    //     const url = this.$router.resolve(route).href
    //     window.open(url, '_blank')
    // }
    // }
},

async mounted () {
    // setInterval(this.reloadData, 2 * 60 * 1000)
    // this.lastUpdate = moment().format('DD/MM/YYYY HH:mm:ss')

    // await this.loadUrgentOrders(1)
    // await this.loadExpiredOrders()

    // let filter = await get('dashboard/filter')

    // filter.idServiceRequested.forEach(e => {
    // this.allOsServiceOptions.push({ label: e, value: e })
    // })

    // filter.time.forEach(e => {
    // this.allOsSlaOptions.push({ label: e, value: e })
    // })

    // this.modalFilterAllOs = new Modal(
    // this.$refs.modalFilterAllOs.$refs.modalPattern
    // )
},

watch: {
    // actualPage () {
    // this.loadUrgentOrders(this.actualPage)
    // }
}
}
</script>
  
<style>
.details {
cursor: pointer;
text-decoration: underline;
}
.red {
border: none;
border-radius: 5px;
background: rgb(241,142,39);
background: linear-gradient(-115deg, rgba(241,142,39,1) 0%, rgba(253,100,79,1) 100%);
}

.blue {
border: none;
border-radius: 5px;
background: rgb(63,187,254);
background: linear-gradient(-115deg, rgba(63,187,254,1) 0%, rgba(165,65,255,1) 100%);
}
</style>
  