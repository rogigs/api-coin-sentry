import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import cors from "cors";
import express from "express";
import financesRoutes from "./routes/auth/finances.routes";
import userAuthRoutes from "./routes/auth/user.routes";
import userRoute from "./routes/user.routes";

import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import { validateBearerToken } from "./helpers/validateBearerToken";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";

const app = express();

declare module "express-session" {
  export interface SessionData {
    userId: string | null;
  }
}

app.use(cookieParser());
app.use(
  session({
    secret: "teste",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

Sentry.init({
  dsn: `https://${process.env.SENTRY_DSN_PUBLIC_KEY}@${process.env.SENTRY_ORG_SLUG}.ingest.sentry.io/${process.env.SENTRY_PROJECT_ID}`,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
// TODO: vercel doesnt pass the envirament variables
app.use(
  cors({
    origin: [
      process.env.CLIENT_LOCAL,
      process.env.CLIENT_QA,
      process.env.CLIENT_PROD,
      "https://coinsentry-git-feat-new-version-rogigs.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["Authorization"],
    allowedHeaders: "Content-Type,Authorization,access-control-allow-headers",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const PORT = process.env.PORT || 4000;

// TODO: put this in a one archive
app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL })
);

app.use("/api", userRoute);

app.use("*", validateBearerToken);

app.use("/api", financesRoutes);
app.use("/api", userAuthRoutes);

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
