import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default function createStore(state) {
  return new Vuex.Store({
    state() {
      return (
        state || {
          _modals: [],
          user: null,
          social: [],
          // Олимпиада активна
          OLYMPIAD_ACTIVE: 1,
          // Олимпиада еще не началась
          OLYMPIAD_NOT_STARTED: 10,
          // Олимпиада завершилась
          OLYMPIAD_EXPIRED: 11,

          profile_page: {
            olympiads: [],
          },
          home_page: {
            olympiads: [],
            olympiad_categories: [],
            news: [],
            faq: [],
          },
          news_page: {
            news: [],
            news_item: [],
          },
          olympiads_page: [],
          catalog_page: {
            catalogs: [],
            catalog_item: [],
            news: [],
            olympiad_categories: [],
          },
          about_page: {
            news: [],
            about: [],
          },
        }
      );
    },
  });
}
