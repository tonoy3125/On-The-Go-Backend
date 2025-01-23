import express from "express";

const router = express.Router();

const routerModules = [
  {
    path: "/review",
    route: "*",
  },
];

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route)
);
