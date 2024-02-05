<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-primary text-white d-flex justify-content-between py-1" v-if="logged">
        <div class="py-1">
          <i class="bi bi-list icon_action ps-3" @click="toggleSidebar"></i>
          <!-- <img src="@/assets/hs-h.png" class="p-4" style="width: 200px" /> -->
          <!-- <span class="mx-3">|</span> -->
          <img src="@/assets/logExe.png" class="ps-3" style="width: 200px" />
        </div>
        <div class="px-5">
          <i class="bi bi-gear-fill icon" @click="$router.push({ name: 'myProfile' })"></i>
        </div>
      </nav>
      <div class="wrapper">
        <nav ref="sidebar" class="sidebar bg-white text-bg-white pb-3 border" v-if="logged">
          <div class="d-flex flex-column h-100 w-100">
            <div class="col-2 w-100 p-4 border-bottom">
              <div class="text-center">
                <b>{{ user.name }}</b>
              </div>
            </div>
            <TheSideMenu class="px-3 mt-3" />
            <div class="col-2 w-100 p-2 border-top">
              <TheButton type="button" class="w-100" label="Sair" color="primary" @click="logout" />
            </div>
          </div>
        </nav>
  
        <div id="content" class="content bg-slate p-0">
          <router-view />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { mapState } from 'vuex'
  import { baseApiUrl } from '@/global'
  import axios from 'axios'
  import TheButton from '@/components/button/TheButton.vue'
  import TheSideMenu from '@/components/geral/TheSideMenu.vue'
//   import image from '@/assets/logExec'
  
  export default {
    setup() {
      const sidebar = ref(null)
  
      const toggleSidebar = () => {
        sidebar.value.classList.toggle('active')
      }
  
      return { sidebar, toggleSidebar }
    },
  
    components: { TheSideMenu, TheButton },
  
    computed: {
      ...mapState(['logged', 'user']),
    },
  
    methods: {
      async logout() {
        const url = `${baseApiUrl}/logout`
        axios.defaults.withCredentials = true
  
        const result = await axios
          .post(url)
          .then((res) => {
            this.$store.dispatch('setLogged', false)
            this.$router.push({ name: 'login' })
          })
          .catch((err) => {
            console.log(err)
            return err
          })
  
        return result
      },
    },
  }
  </script>
  
  <style>
  .bg-slate {
    background-color: #f8fafc;
  }
  
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: stretch;
  }
  
  .sidebar {
    min-width: 250px;
    max-width: 250px;
    transition: all 0.3s;
    position: relative;
  }
  
  .sidebar .sidebarBottom {
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 10%;
    width: 250px;
    padding: 10px;
  }
  
  .sidebar.active {
    margin-left: -250px;
  }
  
  .content {
    width: 100%;
    height: 100%;
    min-height: 95vh;
    transition: all 0.3s;
  }
  
  .navbar {
    height: 5vh;
  }
  
  .item-firstLevel:hover {
    color: #000;
    background-color: #8dc4f1;
  }
  
  .btn-toggle-nav a:hover,
  .btn-toggle-nav a:focus {
    background-color: #acacac;
  }
  
  .btn-toggle::after {
    width: 1.25em;
    line-height: 0;
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    transition: transform 0.35s ease;
    transform-origin: 0.5em 50%;
  }
  
  .btn-toggle[aria-expanded='true']::after {
    transform: rotate(450deg);
  }
  
  @media (max-width: 768px) {
    .sidebar {
      margin-left: -250px;
    }
  
    .sidebar.active {
      margin-left: 0;
    }
  
    .sidebarCollapse span {
      display: none;
    }
  }
  
  @media screen and (width < 1550px) {
    .content {
      min-height: 90vh;
    }
  
    .navbar {
      height: 10vh;
    }
  
    .icon {
      font-size: 18px;
      cursor: pointer;
    }
  }
  </style>
  