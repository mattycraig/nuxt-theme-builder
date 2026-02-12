export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const expectedPassword = config.comingSoonPassword;

  if (!expectedPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: "Coming soon gate is not configured.",
    });
  }

  const body = await readBody<{ password?: string }>(event);

  if (!body?.password || body.password !== expectedPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid password.",
    });
  }

  // 30-day auth cookie (readable by client-side middleware)
  setCookie(event, "launch_access", "granted", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true };
});
