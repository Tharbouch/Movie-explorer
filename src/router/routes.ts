import HomeView from "../views/HomeView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";
import WatchListView from "../views/WatchListView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetailView,
    props: true,
  },
  { path: "/watchlist", name: "WatchList", component: WatchListView },
  { path: "/favorites", name: "Favorites", component: FavoritesView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

export default routes;
