FROM denoland/deno:2.4.0

WORKDIR /src

ENTRYPOINT ["deno", "run", "dev"]
