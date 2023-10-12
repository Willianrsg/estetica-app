import { nextTick } from 'vue'
import store from '@/store/index'

export async function validateForm(ref) {
  if (!ref) { return false }

  const elementInput = ref.getElementsByTagName('input')
  const elementSelect = ref.getElementsByTagName('select')
  let valid = true
  let countInvalid = 0

  for (let i = 0; i < elementInput.length; i++) {
    const element = elementInput[i]
    element.focus()
    element.blur()
    await nextTick()

    if (element.className.includes('is-invalid') || element.className.includes('dp-custom-input')) {
      countInvalid++
    }
  }

  for (let i = 0; i < elementSelect.length; i++) {
    const element = elementSelect[i]
    element.focus()
    element.blur()
    await nextTick()

    if (element.className.includes('is-invalid')) {
      countInvalid++
    }
  }

  if (countInvalid > 0) { valid = false }
  return valid
}

export function getRouteName(route) {
  let theRoute = {
    agenda: {
      parent: 'Agenda',
      name: 'Agenda',
      path: 'agenda',
      childrenName: 'Cadastro de Agenda',
      childrenPath: 'agendaNew',
      UpdateName: 'Edição de Ageda',
      UpdatePath: 'agendaUpdate',
    },
    user: {
      parent: 'Administração',
      name: 'Usuários',
      path: 'user',
      childrenName: 'Cadastro de Usuário',
      childrenPath: 'userNew',
      UpdateName: 'Edição de Usuário',
      UpdatePath: 'userUpdate',
    },
    cliente: {
      parent: 'Cadastro',
      name: 'Cliente',
      path: 'cliente',
      childrenName: 'Cadastro de Cliente',
      childrenPath: 'clienteNew',
      UpdateName: 'Edição de Cliente',
      UpdatePath: 'clienteUpdate',
    },
    veiculo: {
      parent: 'Cadastro',
      name: 'Veiculos',
      path: 'veiculo',
      childrenName: 'Cadastro de Veículo',
      childrenPath: 'veiculoNew',
      UpdateName: 'Edição de Veículo',
      UpdatePath: 'veiculoUpdate',
    },
    veiculoChildren:{
      parent: 'Cliente', 
      name: 'Veiculos',
      path: 'veiculoChildren',
      childrenName: '',
      childrenPath: '',
    },
    servico: {
      parent: 'Cadastro',
      name: 'servico',
      path: 'servico',
      childrenName: 'Cadastro de Serviço',
      childrenPath: 'servicoNew',
      UpdateName: 'Edição de Serviço',
      UpdatePath: 'servicoUpdate',
    },
    produto: {
      parent: 'Serviços',
      name: 'Produtos',
      path: 'produto',
      childrenName: 'Cadastro de Produtos',
      childrenPath: 'produtoNew',
      UpdateName: 'Edição de Produtos',
      UpdatePath: 'produtoUpdate',
    },
    produtoChildren:{
      parent: 'Servico', 
      name: 'Produto',
      path: 'produtoChildren',
      childrenName: '',
      childrenPath: '',
    },
    item: {
      parent: 'Estoque',
      name: 'item',
      path: 'item',
      childrenName: 'Cadastro de Item',
      childrenPath: 'itemNew',
      UpdateName: 'Edição de Item',
      UpdatePath: 'itemUpdate',
    },
    userGroup: {
      parent: 'Usuários',
      name: 'Grupo de Usuários',
      path: 'userGroup',
      childrenName: 'Cadastro de Grupo',
      childrenPath: 'userGroupNew',
      UpdateName: 'Edição de Grupo',
      UpdatePath: 'userGroupUpdate',
    },
    userGroupChildren: {
      parent: 'Usuários',
      name: 'Grupo de Usuários',
      path: 'userGroupChildren',
      childrenName: '',
      childrenPath: ''
    },
    screen: {
      parent: 'Administração',
      name: 'Programas',
      path: 'screen',
      childrenName: 'Cadastro de Programas',
      childrenPath: 'screenNew',
      UpdateName: 'Edição de Programas',
      UpdatePath: 'screenUpdate',
    },
    acl: {
      parent: 'Administração',
      name: 'Acl',
      path: 'acl',
      childrenName: 'Cadastro de Acl',
      childrenPath: 'aclNew',
      UpdateName: 'Edição de Acl',
      UpdatePath: 'aclUpdate',
    },
    aclChildren: {
      parent: 'Grupos',
      name: 'Acl',
      path: 'aclChildren',
      childrenName: '',
      childrenPath: ''
    },
    group: {
      parent: 'Administração',
      name: 'Grupos',
      path: 'group',
      childrenName: 'Cadastro de Grupo',
      childrenPath: 'groupNew',
      UpdateName: 'Edição de Grupo',
      UpdatePath: 'groupUpdate',
    },
    myProfile: {
      parent: '',
      name: '',
      path: '',
      childrenName: '',
      childrenPath: '',
      UpdateName: '',
      UpdatePath: '',
    }
  }

  if (route in theRoute) { return theRoute[route] }
  else if (route.split('New')[0] in theRoute) { return theRoute[route.split('New')[0]] }
  else { return theRoute[route.split('Update')[0]] }
}

export function logout(vueInstance) {
  vueInstance.$store.dispatch('setLogged', false)
  vueInstance.$router.push({ name: 'login' })
}

export function cleanObject(object) {
  if (object.status && !object.password) {
    delete object.id
    delete object.createdAt
    delete object.deletedAt
    delete object.updatedAt
  }

  else {
    delete object.id
    delete object.status
    delete object.createdAt
    delete object.deletedAt
    delete object.updatedAt
  }
}

let firstTry = false
import { get } from '@/crud.js'
export async function checkSession() {

  let rawUser = null

  if (!firstTry) {
    rawUser = await get('me')
    firstTry = true
  }

  else {
    const state = JSON.parse(JSON.stringify(store.state))
    rawUser = state.user
  }

  if (!rawUser || rawUser == '') { return false }
  else {
    store.dispatch('setLogged', true)
    store.dispatch('setUser', rawUser)
    return true
  }
}