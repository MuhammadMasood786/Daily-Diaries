import { Server, Model, Factory, belongsTo, hasMany, Response } from "miragejs";
import user from "./routes/user";
import * as diary from "./routes/diary";

export const handleErrors = (error: any, message = "An error occur!") => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "development",

    // Models wrap your database and allow you to create relationships
    models: {
      entry: Model.extend({
        diary: belongsTo,
      }),
      diary: Model.extend({
        entry: hasMany,
        user: belongsTo,
      }),
      user: Model.extend({
        diary: hasMany,
      }),
    },

    factories: {
      user: Factory.extend({
        username: "masood",
        password: "masood786",
        email: "masoood786@gmail.com",
      }),
    },
    seeds: (server): any => {
      server.create("user");
    },
    routes(): void {
      this.urlPrefix = "https://diaries.app";

      this.get("/diaries/entries/:id", diary.getEntries);
      this.get("/diaries/:id", diary.getDiaries);

      this.post("/auth/login", user.login);
      this.post("/auth/signup", user.signup);

      this.post("/diaries/", diary.create);
      this.post("/diaries/entry/:id", diary.addEntry);

      this.put("/diaries/entry/:id", diary.updateEntry);
      this.put("/diaireis/:id", diary.updateDiary);
    },
  });
};
