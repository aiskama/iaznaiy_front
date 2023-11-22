import Vue from "vue";
import VueApollo from "vue-apollo";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

Vue.use(VueApollo);

export default function createApollo(env) {
  const cache = new InMemoryCache({
    addTypename: false,
  });
  const defaultClient = new ApolloClient({
    link: createUploadLink({
      uri: env.APOLLO_ENDPOINT,
      fetch: fetch,
    }),
    cache,
  });
  return new VueApollo({
    defaultClient: defaultClient,
  });
}
