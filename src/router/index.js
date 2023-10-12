import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },

  /* ########## AGENDA ######## */
  {
    path: '/agenda/agenda',
    name: 'agenda',
    component: () => import('@/views/agenda/Agenda.vue')
  },
  {
    path: '/agenda/cadastro/novo',
    name: 'agendaNew',
    component: () => import('@/views/agenda/AgendaNew.vue')
  },
  {
    path: '/agenda/:id/editar',
    name: 'agendaUpdate',
    component: () => import('@/views/agenda/AgendaNew.vue')
  },

  /* ########## CADASTROS ######## */
  {
    path: '/cadastro/cliente',
    name: 'cliente',
    component: () => import('@/views/cadastros/cliente/Cliente.vue')
  },
  {
    path: '/cadastro/cliente/cadastro/novo',
    name: 'clienteNew',
    component: () => import('@/views/cadastros/cliente/ClienteNew.vue')
  },
  {
    path: '/cadastro/cliente/:id/editar',
    name: 'clienteUpdate',
    component: () => import('@/views/cadastros/cliente/ClienteNew.vue')
  },

  /* ######## VEICULOS ####### */
  {
    path: '/cadastro/cliente/:idClient/veiculos',
    name: 'veiculo',
    component: () => import('@/views/cadastros/veiculos/Veiculos.vue')
  },
  {
    path: '/cadastro/cliente/:idClient/veiculos/novo',
    name: 'veiculoNew',
    component: () => import('@/views/cadastros/veiculos/VeiculosNew.vue')
  },
  {
    path: '/cadastro/cliente/:idClient/veiculos/:id/editar',
    name: 'veiculoUpdate',
    component: () => import('@/views/cadastros/veiculos/VeiculosNew.vue')
  },
  // {
  //   path: '/cadastro/veiculos',
  //   name: 'veiculos',
  //   component: () => import('@/views/cadastros/veiculos/Veiculos.vue')
  // },
  // {
  //   path: '/cadastro/veiculos/cadastro/novo',
  //   name: 'veiculosNew',
  //   component: () => import('@/views/cadastros/veiculos/VeiculosNew.vue')
  // },
  // {
  //   path: '/cadastro/veiculos/:id/editar',
  //   name: 'veiculosUpdate',
  //   component: () => import('@/views/cadastros/veiculos/VeiculosNew.vue')
  // },
  {
    path: '/cadastro/servico',
    name: 'servico',
    component: () => import('@/views/cadastros/servico/Servico.vue')
  },
  {
    path: '/cadastro/servico/cadastro/novo',
    name: 'servicoNew',
    component: () => import('@/views/cadastros/servico/ServicoNew.vue')
  },
  {
    path: '/cadastro/servico/:id/editar',
    name: 'servicoUpdate',
    component: () => import('@/views/cadastros/servico/ServicoNew.vue')
  },

  /* ########## PRODUTO SERVIÇO ########## */
  {
    path: '/cadastro/servico/:idService/produto',
    name: 'produto',
    component: () => import('@/views/cadastros/servico/produtos/Produtos.vue')
  },
  {
    path: '/cadastro/servico/:idService/produto/novo',
    name: 'produtoNew',
    component: () => import('@/views/cadastros/servico/produtos/ProdutosNew.vue')
  },
  {
    path: '/cadastro/servico/:idService/produto/:id/editar',
    name: 'produtoUpdate',
    component: () => import('@/views/cadastros/servico/produtos/ProdutosNew.vue')
  },

  /* ########## ESTOQUE ########## */
  {
    path: '/estoque/item',
    name: 'item',
    component: () => import('@/views/estoque/item/Item.vue')
  },
  {
    path: '/estoque/item/cadastro/novo',
    name: 'itemNew',
    component: () => import('@/views/estoque/item/ItemNew.vue')
  },
  {
    path: '/estoque/item/:id/editar',
    name: 'itemUpdate',
    component: () => import('@/views/estoque/item/ItemNew.vue')
  },


  /* ########## USUARIO ########## */
  {
    path: '/administracao/usuario',
    name: 'user',
    component: () => import('@/views/administracao/usuario/Usuario.vue')
  },
  {
    path: '/administracao/usuario/cadastro/novo',
    name: 'userNew',
    component: () => import('@/views/administracao/usuario/UsuarioNovo.vue')
  },
  {
    path: '/administracao/usuario/:id/editar',
    name: 'userUpdate',
    component: () => import('@/views/administracao/usuario/UsuarioNovo.vue')
  },
  /* ########## GRUPO USUÁRIO ########## */
  {
    path: '/administracao/usuario/:idUser/grupoUsuario',
    name: 'userGroupChildren',
    component: () => import('@/views/administracao/usuario/grupoUsuario/GrupoUsuarioPai.vue')
  },
  {
    path: '/administracao/usuario/:idUser/grupoUsuario/cadastro/novo',
    name: 'userGroupNew',
    component: () => import('@/views/administracao/usuario/grupoUsuario/GrupoUsuarioNovo.vue')
  },
  /* ########## GRUPO ########## */
  {
    path: '/administracao/grupo',
    name: 'group',
    component: () => import('@/views/administracao/grupo/Grupo.vue')
  },
  {
    path: '/administracao/grupo/cadastro/novo',
    name: 'groupNew',
    component: () => import('@/views/administracao/grupo/GrupoNovo.vue')
  },
  {
    path: '/administracao/grupo/:id/editar',
    name: 'groupUpdate',
    component: () => import('@/views/administracao/grupo/GrupoNovo.vue')
  },
  /* ########## GRUPO ACL ########## */
  {
    path: '/administracao/grupo/:id_group/acl',
    name: 'aclChildren',
    component: () => import('@/views/administracao/grupo/acl/AclPai.vue')
  },
  {
    path: '/administracao/grupo/:id_group/acl/novo',
    name: 'aclNew',
    component: () => import('@/views/administracao/grupo/acl/AclNovo.vue')
  },
  {
    path: '/administracao/grupo/:id_group/acl/:id/editar',
    name: 'aclUpdate',
    component: () => import('@/views/administracao/grupo/acl/AclNovo.vue')
  },
  /* ########## PROGRAMA ########## */
  {
    path: '/administracao/programa',
    name: 'screen',
    component: () => import('@/views/administracao/programa/Programa.vue')
  },
  {
    path: '/administracao/programa/cadastro/novo',
    name: 'screenNew',
    component: () => import('@/views/administracao/programa/ProgramaNovo.vue')
  },
  {
    path: '/administracao/programa/:id/editar',
    name: 'screenUpdate',
    component: () => import('@/views/administracao/programa/ProgramaNovo.vue')
  },
  /* ########## PERFIL ########## */
  {
    path: '/meu_perfil',
    name: 'myProfile',
    component: () => import('@/views/Perfil.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
