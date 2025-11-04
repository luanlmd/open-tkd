FROM denoland/deno:2.4.0

WORKDIR /src
ADD src .

RUN deno run build

CMD ["deno", "run", "start"]
