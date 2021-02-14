
import { Server, Model, Factory, belongsTo, hasMany, Response } from "miragejs";

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
        this.urlPrefix = 'https://diaries.app'
    },
  });
};
