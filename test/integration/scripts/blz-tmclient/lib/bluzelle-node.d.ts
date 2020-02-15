interface BluzelleConfig {
    address: string,
    mnemonic: string,
    endpoint: string,
    chain_id: string
}

interface GasInfo {
    gas_price: string
}

interface Result {
    UUID: string,
    Key: string,
    Value: string
}

declare class API {
    create: (key: string, value: string, gasInfo?: GasInfo) => Promise<Result>;
    has: (key: string, gasInfo?: GasInfo) => Promise<Result>;
    quickread: (key: string) => Promise<Result>;
}

export function bluzelle(config: BluzelleConfig): Promise<API>

