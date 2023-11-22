import createApp from "./app";
import ME from "gql/auth/me.graphql";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store, apollo } = createApp(process.env);
    const meta = app.$meta();
    store.state.apollo_token = context.req.session.apollo_token;
    store.state._env = context.req.session._env;
    router.push(context.req.url);
    router.onReady(async () => {
      // Если есть токен пробуем авторизоваться
      if (context.req.session.apollo_token) {
        await apollo.defaultClient
          .query({
            query: ME,
            context: {
              headers: {
                Authorization: "Bearer " + context.req.session.apollo_token,
              },
            },
          })
          .then(({ data }) => {
            // Авторизация успешна сохраняем пользователя
            store.state.user = data.me;
          })
          .catch(() => {
            // Авторизация не прошла выкидываем 403 ошибку
            context.req.session.apollo_token = undefined;
            reject({ code: 403 });
          });
      }
      // Если роут просит авторизацию и пользователя нет то выкидываем 403
      if (router.currentRoute.meta.authRequired && !store.state.user) {
        reject({ code: 403 });
      }
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }
      const pages = matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData(
            Object.assign(context, {
              router,
              route: router.currentRoute,
              store,
              apollo,
            })
          );
        }
      });
      Promise.all(pages)
        .then(() => {
          context.state = store.state;
          context.meta = meta;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
