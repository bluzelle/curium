import {
    parse,
    stringify,
} from "https://deno.land/std@0.93.0/encoding/yaml.ts";


Deno.readTextFile('./config.yml')
    .then(parse)
    .then((x: any) => {
        x.init.home = "~/.curium2";
        x.host = x.host || {};
        x.host.rpc = `:${26657 + 10}`;
        x.host.p2p = `:${26656 + 10}`;
        x.host.prof = `:${6061 + 10}`;
        x.host.grpc = `:${9090 + 10}`;
        x.host.api =  `:${1317 + 10}`;
        x.host.frontend = `:${8080 + 10}`;
        x.host['dev-ui'] =  `:${12345 + 10}`;
        x.init.config['p2p.persistent_peers'] = '7703ea267fd2b4ae63673167830bd27dfcd04cc8@127.0.0.1:26656'
        return x;
    })
    .then(stringify)
    .then(c => Deno.writeTextFile('./config2.yml', c))


