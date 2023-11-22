<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <router-link :to="{ name: 'home' }" class="header__logo-wrap">
            <IconComponent name="logo" />
          </router-link>
          <nav class="header__nav">
            <router-link :to="{ name: 'catalog' }">Олимпиады</router-link>
            <router-link to=""> <span @click="openModal">Результаты</span> </router-link>
            <router-link :to="{ name: 'about' }">О проекте</router-link>
          </nav>
        </div>
        <div class="header__burger" @click="toggleBurgerMenuOpen">
          <IconComponent name="Burger" />
        </div>
        <div class="header-mobile__menu" v-if="showBurgerMenu">
          <div>
            <div class="header-mobile__close" @click="closeBurgerMenu">
              <IconComponent name="close" />
            </div>
            <!--          <div class="header-mobile__search"></div>-->
            <a class="header-mobile__login" href="#" v-if="!user" @click.prevent="openLoginModal">Войти</a>
            <div v-if="user" class="header-mobile__user-info">
              <div class="header-mobile__profile" @click="toggleMobileMenuOpen">
                <div class="header-mobile__profile-logo">
                  <ImgComponent v-if="head_img" :head_img="head_img" />
                </div>
                <span>{{ fullName }}</span>
              </div>
              <div class="header-mobile__down-svg" @click="toggleMobileMenuOpen">
                <IconComponent name="CaretDown" />
              </div>
            </div>
            <div v-if="dropMobileMenuOpen" class="header-mobile__profile-drop-menu">
              <ul>
                <li @click="closeBurgerMenu">
                  <router-link :to="{ name: 'profile', params: { id: 1 } }">
                    <IconComponent name="User" />
                    <span>Профиль</span>
                  </router-link>
                </li>
                <li @click="closeBurgerMenu">
                  <router-link :to="{ name: 'profile', params: { id: 2 } }">
                    <IconComponent name="Bacalavr" />
                    <span>Мои олимпиады</span>
                  </router-link>
                </li>
                <li @click="closeBurgerMenu">
                  <router-link :to="{ name: 'profile', params: { id: 3 } }">
                    <IconComponent name="Archive" />
                    <span>Архив олимпиад</span>
                  </router-link>
                </li>
                <li @click="logout">
                  <router-link to="">
                    <IconComponent name="Exit" />
                    <span>Выйти</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <nav class="header-mobile__nav">
              <router-link :to="{ name: 'catalog' }">
                <button @click="closeBurgerMenu">Олимпиады</button>
              </router-link>
              <router-link to=""> <button @click="openModal">Результаты</button> </router-link>
              <router-link :to="{ name: 'news' }">
                <button @click="closeBurgerMenu">Наше СМИ</button>
              </router-link>
              <router-link :to="{ name: 'about' }">
                <button @click="closeBurgerMenu">О проекте</button>
              </router-link>
            </nav>
          </div>
          <div class="header-mobile__footer">
            <div @click="closeBurgerMenu">
              <router-link :to="{ name: 'home' }" class="header__logo-wrap">
                <IconComponent name="logo" />
              </router-link>
            </div>
            <span>ЯЗНАЮ©</span>
          </div>
        </div>
        <div class="header__profile" v-click-outside="hideMenuOpen" @click="toggleMenuOpen">
          <!--          <div class="header__profile-search"></div>-->
          <div v-if="user" class="header__profile-logo">
            <ImgComponent v-if="head_img" :head_img="head_img" />
          </div>
          <a href="#" v-if="!user" @click.prevent="openLoginModal">Войти</a>
          <span v-else>{{ fullName }}</span>
          <div v-if="user" class="header__down-svg">
            <IconComponent name="CaretDown" />
            <ul v-if="dropMenuOpen" class="header__drop-menu">
              <li>
                <router-link :to="{ name: 'profile', params: { id: 1 } }">
                  <IconComponent name="User" />
                  <span>Профиль</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'profile', params: { id: 2 } }">
                  <IconComponent name="Bacalavr" />
                  <span>Мои олимпиады</span>
                </router-link>
              </li>
              <li @click="logout">
                <router-link to="">
                  <IconComponent name="Exit" />
                  <span>Выйти</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LoginModal from "components/modals/components/LoginModal.vue";
import IconComponent from "components/IconComponent.vue";
import ImgComponent from "components/ImgComponent.vue";
import ClickOutside from "vue-click-outside";
import SoonModal from "components/modals/components/SoonModal.vue";
export default {
  data() {
    return {
      dropMobileMenuOpen: false,
      showBurgerMenu: false,
      dropMenuOpen: false,
    };
  },
  directives: {
    ClickOutside,
  },

  methods: {
    logout() {
      if (confirm("Вы уверены?")) {
        require(["axios"], (axios) => {
          axios.default({
            method: "post",
            url: "/token",
            data: {
              token: undefined,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });
        }).then(() => {
          this.$store.state.user = null;
          if (this.$route.name !== "home") {
            this.$router.push({
              name: "home",
            });
          }
          this.$notify({
            title: "Готово",
            duration: 5000,
            speed: 200,
            type: "success",
          });
          this.showBurgerMenu = false;
          this.dropMobileMenuOpen = false;
        });
      }
    },
    closeBurgerMenu() {
      this.showBurgerMenu = false;
      if (document.body.classList.contains("lock-scroll")) {
        document.body.classList.remove("lock-scroll");
      }
    },
    toggleMobileMenuOpen() {
      this.dropMobileMenuOpen = !this.dropMobileMenuOpen;
    },
    toggleBurgerMenuOpen() {
      this.showBurgerMenu = !this.showBurgerMenu;
      if (!document.body.classList.contains("lock-scroll")) {
        document.body.classList.add("lock-scroll");
      }
    },
    toggleMenuOpen() {
      this.dropMenuOpen = !this.dropMenuOpen;
    },
    hideMenuOpen() {
      this.dropMenuOpen = false;
    },
    openLoginModal() {
      this.$store.state._modals.push({
        component: LoginModal,
      });
    },
    openModal() {
      this.$store.state._modals.push({
        component: SoonModal,
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    fullName() {
      return this.user ? this.user.name + " " + this.user.surname : null;
    },
    head_img() {
      return this.$store.state.user?.head_img;
    },
  },
  components: {
    IconComponent,
    ImgComponent,
  },
};
</script>
<style lang="stylus">
.lock-scroll{
  overflow hidden
}
.header-mobile {

  &__menu {
    position absolute
    display flex
    flex-direction column
    justify-content space-between
    background-color var(--white)
    top 0
    left 0
    width 100%
    padding 30px
    height 100vh
  }
  &__close {
    display flex
    justify-content flex-end
    margin-bottom 24px
  }

  &__login {
    color var(--black)
    font-size 1.125em
    text-decoration none
    font-weight 500
  }

  &__user-info {
    display flex
    justify-content space-between
    align-items center

  }
  &__profile {
    display flex
    align-items center
    gap 10px

    a {
      color var(--black)
      font-weight 500
      font-size 1.125em
    }

    span {
      font-weight 500
      font-size 1.125em
    }
  }
  &__profile-logo {
    width 30px
    height 30px
    border-radius 100px
    overflow hidden

    img {
      width 100%
      height 100%
      object-fit cover
    }
  }

  &__down-svg {
    display flex
    align-items center
    justify-content center
    width 30px
    height 30px

    .icon {
      width 30px
      height 30px
    }
  }

  &__profile-drop-menu {
    padding 15px

    ul {
      display flex
      flex-direction column
      gap 15px
    }

    li {
      a {
        display flex
        gap 10px
        align-items center

        span {
          font-weight 500
          font-size 1.125em
          color var(--black)
          tarnsition var(--transition)
        }

        .icon {
          width 25px
          height 25px

          svg path {
            tarnsition var(--transition)
            stroke: var(--black)
          }
        }

        &:hover {
          span {
            color var(--red)
          }

          .icon {

            svg path {
              stroke var(--red)
            }
          }
        }
      }
    }
  }

  &__nav {
    margin-top 30px
    display flex
    flex-direction column
    gap 30px

    a {
      display block
      color var(--black)

      button {
        background var(--white)
        border none
        font-size 1.125em
        font-weight 500
      }
    }
  }

  &__footer {
    span {
      display block
      margin-top 17px
      font-weight 500
      font-size 1.5em
    }
  }
}
.header {
  padding 0 30px
  position: fixed;
  z-index 100
  background-color var(--white)
  top 0
  left 0
  display flex
  height 90px
  width 100%
  align-items center

  &__content {
    display flex
    justify-content space-between

    +below(1060px) {
      flex-direction row-reverse
    }
  }

  &__logo {
    display flex
    align-items center
    gap 41px
  }

  &__logo-wrap {
    width 60px
    height 60px
    background-color var(--yellow)
    border-radius 100px
    display flex
    justify-content center
    align-items center

    .icon {
      width 44px
      height 44px
      overflow hidden

      svg {
        width 44px
        height: 44px
        path {
          fill var(--black)
        }
      }
    }
  }

  &__nav {
    display flex
    gap 30px

    +below(1060px) {
      display none
    }

    a {
      color var(--black)
      font-size 1.250em
      font-weight 500
    }
  }

  &__burger {
     display none
     +below(1060px) {
       display flex
     }
  }

  &__profile {
    position relative
    display flex
    gap 30px
    align-items center

    +below(1060px) {
      display none
    }

    > a {
      color var(--black)
      font-weight 500
      font-size 1.250em
    }

    span {
      color var(--black)
      font-size 1.250em
      font-weight 500
      cursor pointer
      transition var(--transition)
    }
  }

  &__down-svg {
    display flex
    cursor pointer
    align-items center
    width 26px
    height 26px

    .icon {
      width 26px
      height 26px
    }
  }

  &__drop-menu {
    position absolute
    width: 266px;
    background var(--white)
    border-radius 6px
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    top: 100px;
    left 0

    li {
      a {
        display flex
        align-items center
        padding 12px
        gap 13px
      }

      span {
        color var(--black)
        tarnsition var(--transition)
      }

      .icon {

        svg path {
          tarnsition var(--transition)
          stroke: var(--black)
        }
      }

      &:hover {
        span {
          color var(--red)
        }

        .icon {

          svg path {
            stroke var(--red)
          }
        }
      }
    }
  }

  &__profile-logo {
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 100px;
    cursor pointer

    img {
      width 100%
      height 100%
      object-fit cover
    }
  }
}
</style>
