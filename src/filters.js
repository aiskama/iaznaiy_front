import Vue from "vue";
import moment from "moment";
import { VueMaskFilter } from "v-mask";
import plural from "plural-ru";

Vue.filter("formatDate", (date) => {
  return moment(date).format("DD.MM.YYYY");
});

Vue.filter("humanDate", (date) => {
  moment.locale("ru");
  return moment(date).format("DD MMMM YYYY");
});

Vue.filter("catalogDate", (date) => {
  moment.locale("ru");
  return moment(date).format("DD MMMM");
});

Vue.filter("robotDate", (date) => {
  return moment(date);
});

Vue.filter("plural", (count, ...words) => {
  return plural(count, ...words.map((w) => "%d " + w));
});

Vue.filter("plural_word", (count, ...words) => {
  return plural(count, ...words.map((w) => w));
});

Vue.filter("vMask", VueMaskFilter);

Vue.filter("image", (entity, api) => {
  if (entity && entity.img) {
    return api + entity.img.url;
  }
  return "/static/images/no-image.png";
});

Vue.filter("image_alt", (entity) => {
  if (entity && entity.img) {
    return entity.img.alt;
  }
  return "";
});
