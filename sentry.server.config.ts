import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://2d87cf66cc343f8156f8c987b926c3fd@o4510897737629696.ingest.us.sentry.io/4510897740251137",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending of user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
