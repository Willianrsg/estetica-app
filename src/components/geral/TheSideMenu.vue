<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="d-flex flex-column">
      <ul class="nav nav-pills flex-column">
        <li v-for="(menuItem, i) in menuList" :key="i">
          <a
            href="#"
            :class="menuItemClasses(menuItem, menuItem.code)"
            data-bs-toggle="collapse"
            :aria-expanded="menuItem.status"
            @click.prevent="navItemCollapse(i), goTo(menuItem.code)"
          >
            <i :class="menuItemIcon(menuItem)"></i>
            <span class="sidebar-item-title">{{ menuItem.title }}</span>
            <span class="ms-auto"></span>
          </a>
          <div v-if="menuItem.children.length > 0" :class="divSubItemClasses(menuItem)">
            <ul class="btn-toggle-nav list-unstyled fw-normal p-1 ms-2">
              <li v-for="(subItem, j) in menuItem.children" :key="j">
                <a
                  href="#"
                  :class="menuSubItemClasses(subItem.code, subItem.child)"
                  @click.prevent="goTo(subItem.code)"
                >
                  <i :class="menuSubItemIcon(subItem.code, subItem.child, subItem.icon)"></i>
                  {{ subItem.title }}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheButton from '../button/TheButton.vue'
import { mapState } from 'vuex'
import { get } from '@/crud'
import menu from '@/plugins/menuList.json'

export default {
  components: {
    TheButton,
  },

  data() {
    return {
      subMenu: null,
      menuList: [],
    }
  },

  computed: {
    ...mapState(['logged']),
    route() {
      return this.$route.name
    },
  },

  methods: {
    navItemCollapse(index) {
      this.menuItems = this.menuList.map((item, i) => {
        item.status = !item.status

        if (i !== index) item.status = false

        return item
      })
    },

    divSubItemClasses(menuItem) {
      let classes = 'collapse'
      if (menuItem.status) classes += 'show'
      return classes
    },

    menuItemClasses(menuItem, code) {
      let classes = 'item-firstLevel nav-link hstack gap-1 text-dark'

      if (code === this.route) {
        this.subMenu = null
        classes += 'active'
      } else {
        classes += ''
      }

      if (menuItem.children.length > 0) {
        const itemFound = menuItem.children.find((e) => e.code == this.subMenu)
        if (itemFound) {
          classes = classes.replace('text-dark', 'text-white')
          classes += 'btn-toggle active'
        } else {
          classes += ''
        }
      } else {
        classes += ''
      }

      return classes
    },

    menuSubItemClasses(code, child) {
      let classes = 'nav-link hstack gap-3 text-dark'

      if (code === this.route) {
        this.subMenu = code
        classes += 'subItemActive'
      } else if (this.route) {
        if (this.route.includes('New') && (this.route.split('New')[0] == code || this.route.split('New')[0] == child)) {
          this.subMenu = code
          classes += 'subItemActive'
        }

        if (
          this.route.includes('Update') &&
          (this.route.split('Update')[0] == code || this.route.split('Update')[0] == child)
        ) {
          this.subMenu = code
          classes += 'subItemActive'
        }

        if (
          this.route.includes('Children') &&
          (this.route.split('Children')[0] == child || this.route.split('Children')[0] == code)
        ) {
          this.subMenu = code
          classes += 'subItemActive'
        }
      } else {
        classes += ''
      }

      return classes
    },

    menuSubItemIcon(code, child, icon) {
      if (code === this.route) {
        this.subMenu = code
        icon = 'bi bi-circle-fill'
      } else if (this.route) {
        if (this.route.includes('New') && (this.route.split('New')[0] == code || this.route.split('New')[0] == child)) {
          this.subMenu = code
          icon = 'bi bi-circle-fill'
        }

        if (
          this.route.includes('Update') &&
          (this.route.split('Update')[0] == code || this.route.split('Update')[0] == child)
        ) {
          this.subMenu = code
          icon = 'bi bi-circle-fill'
        }

        if (
          this.route.includes('Children') &&
          (this.route.split('Children')[0] == child || this.route.split('Children')[0] == code)
        ) {
          this.subMenu = code
          icon = 'bi bi-circle-fill'
        }
      } else {
        icon += ''
      }

      return icon
    },
    // async validarDados(result, menu) {
    //   const validMenus = result.map((el) => el.name)
    //   console.log('result: ');
    //   console.log(result);
    //   console.log('menu: ');
    //   console.log(menu);
    //   console.log('validMenus: ');
    //   console.log(validMenus);
    //   const menuList = []
    //   for (let i = 0; i < menu.length; i++) {
    //     const dad = menu[i]
    //     const childrens = []
    //     for (let j = 0; j < dad.children.length; j++) {
    //       const child = dad.children[j]
    //       if (validMenus.includes(child.code)) {
    //         childrens.push(child)
    //       }
    //     }
    //     if (childrens.length > 0) {
    //       dad.children = childrens
    //       menuList.push(dad)
    //     } else {
    //       if (validMenus.includes(dad.code)) {
    //         menuList.push(dad)
    //       }
    //     }
    //   }
    //   console.log('menuList: ');
    //   console.log(menuList);
    //   this.menuList = menuList
    // },

    async getMenu() {
      // const res = await get('menu')
      this.menuList = menu.menuList
      // this.validarDados(res.data, menu.menuList)
    },
    menuItemIcon(menuItem) {
      let classes = `${menuItem.icon} me-2`
      return classes
    },

    goTo(code) {
      this.$router.push({ name: code })
    },
  },

  async mounted() {
    await this.getMenu()
    this.menuSubItemClasses(this.menu)
    this.menuSubItemClasses(this.menu)
  },
}
</script>

<style>
.subItemActive {
  background-color: #f3f3f3 !important;
}
</style>
