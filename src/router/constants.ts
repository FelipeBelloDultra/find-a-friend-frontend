enum RoutesCollection {
  signIn = "/sign-in",
  signUp = "/sign-up",
  dashboard = "/dashboard",
}

export const ROUTES = {
  signIn: {
    path: RoutesCollection.signIn,
    needAuthentication: false,
  },
  signUp: {
    path: RoutesCollection.signUp,
    needAuthentication: false,
  },
  dashboard: {
    path: RoutesCollection.dashboard,
    needAuthentication: true,
  },
};
