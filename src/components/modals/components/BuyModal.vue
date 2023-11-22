<template>
  <form @submit.prevent="submit" class="buy-modal">
    <div class="buy-modal__content">
      <span class="buy-modal__predmet">{{ olympiad.category.title }}</span>
      <div class="buy-modal__price">{{ olympiad.price }} ₽</div>
    </div>

    <button
      class="btn btn--yellow btn--sm"
      v-if="olympiad.status.code !== this.$store.state.OLYMPIAD_EXPIRED"
    >
      Оплатить
    </button>
    <span v-else>Олимпиада уже завершилась!</span>
  </form>
</template>

<script>
import POST from "@/graphql/mutations/OrderCreate.graphql";

export default {
  props: {
    olympiad: Object,
  },
  methods: {
    submit() {
      this.$apollo.provider.defaultClient
        .mutate({
          mutation: POST,
          variables: {
            id: this.olympiad.id,
          },
          context: {
            headers: {
              Authorization: "Bearer " + this.$store.state.apollo_token,
            },
          },
        })
        .then(({ data }) => {
          localStorage.setItem("olympiad", JSON.stringify(this.olympiad));
          if (data.OrderCreate.need_pay) {
            location.replace(data.OrderCreate.payment_url);
          } else {
            this.$router.push("/thanks");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="stylus">
.buy-modal {
  display flex
  justify-content flex-end
  align-items flex-end
  z-index 1000
  width 500px
  height 300px
  background-color var(--white)
  padding 30px
  border-radius 20px

  &__content {
    display: flex;
    flex-direction: column;
    width 100%
    height 100%
    align-self flex-start
    justify-content space-between
  }

  &__predmet {
    font-size 2em
    font-weight 700
  }

  &__price {
    font-size 3em
    font-weight 500
  }
}
</style>
