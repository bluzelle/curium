import { serve, ServerRequest } from "https://deno.land/std@0.86.0/http/server.ts";

const port = 8080;
const server = serve({ hostname: "0.0.0.0", port });
console.log(`http://localhost:${port}`);

const counter = function* (): Generator<number>  {
    let count = 1;
    while(1) {
        yield count += 1
    }
}()


for await (const request of server) {
    const fn = endpoints()[request.url]
    if(fn) {
        const body = JSON.stringify(fn(request))
        request.respond({ status: 200, body});
    } else {
        request.respond({status: 200, body: ''})
    }
}



function endpoints() {
    return {
        '/number-whole': (req: ServerRequest) => ({
            price: counter.next().value
        }),
        '/number-fractional': (req: ServerRequest) => ({
            price: counter.next().value *.1
        }),
        '/string-whole': (req: ServerRequest) => ({
            price: counter.next().value.toString()
        }),
        '/deep': (req: ServerRequest) => ({
            deep: {
                deeper: {
                    price: counter.next().value
                }
            }
        })
    } as Record<string, any>
}
