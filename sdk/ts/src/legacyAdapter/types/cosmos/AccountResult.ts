export interface AccountResult {
    "address": string
    "coins": {
        "denom": string
        "amount": string
    }[]
    "public_key": {
        type: string
        value: string
    }
    "account_number": number,
    "sequence": number
}

