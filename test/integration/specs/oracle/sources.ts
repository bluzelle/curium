export const feedSources = [
    {
        name: 'binance-eth-in-usdt',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT',
        property: 'price'
    },
    {
        name: 'coingecko-usdt-in-eth',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=eth',
        property: 'tether.eth'
    },
    {
        name: 'gateio-eth-in-usdt',
        url: 'https://data.gateapi.io/api2/1/ticker/eth_usdt',
        property: 'last'
    },
    {
        name: 'huobi-eth-in-usdt',
        url: 'https://api.huobi.pro/market/detail?symbol=ethusdt',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-eth-in-usdt',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDT',
        property: 'USDT'
    },
    {
        name: 'nomics-eth-in-usdt',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=ETH&convert=USDT',
        property: '[0].price'
    },
    {
        name: 'cryptocompare-eth-in-usdc',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDC',
        property: 'USDC'
    },
    {
        name: 'nomics-eth-in-usdc',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=ETH&convert=USDC',
        property: '[0].price'
    },
    {
        name: 'nomics-eth-in-usd',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=ETH&convert=USD',
        property: '[0].price'
    },
    {
        name: 'coincap-eth-in-usd',
        url: 'https://api.coincap.io/v2/rates/ethereum',
        property: 'data.rateUsd'
    },
    {
        name: 'binance-eth-in-btc',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=ETHBTC',
        property: 'price'
    },
    {
        name: 'coingecko-eth-in-btc',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc',
        property: 'ethereum.btc'
    },
    {
        name: 'gateio-eth-in-btc',
        url: 'https://data.gateapi.io/api2/1/ticker/eth_btc',
        property: 'last'
    },
    {
        name: 'huobi-eth-in-btc',
        url: 'https://api.huobi.pro/market/detail?symbol=ethbtc',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-eth-in-btc',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC',
        property: 'BTC'
    },
    {
        name: 'nomics-eth-in-btc',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=ETH&convert=BTC',
        property: '[0].price'
    },
    {
        name: 'binance-btc-in-usdt',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT',
        property: 'price'
    },
    {
        name: 'coingecko-usdt-in-btc',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=btc',
        property: 'tether.btc'
    },
    {
        name: 'gateio-btc-in-usdt',
        url: 'https://data.gateapi.io/api2/1/ticker/btc_usdt',
        property: 'last'
    },
    {
        name: 'huobi-btc-in-usdt',
        url: 'https://api.huobi.pro/market/detail?symbol=btcusdt',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-btc-in-usdt',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDT',
        property: 'USDT'
    },
    {
        name: 'nomics-btc-in-usdt',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USDT',
        property: '[0].price'
    },
    {
        name: 'gateio-btc-in-usdc',
        url: 'https://data.gateapi.io/api2/1/ticker/btc_usdc',
        property: 'last'
    },
    {
        name: 'cryptocompare-btc-in-usdc',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDC',
        property: 'USDC'
    },
    {
        name: 'nomics-btc-in-usdc',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USDC',
        property: '[0].price'
    },
    {
        name: 'nomics-btc-in-usd',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USD',
        property: '[0].price'
    },
    {
        name: 'coincap-btc-in-usd',
        url: 'https://api.coincap.io/v2/rates/bitcoin',
        property: 'data.rateUsd'
    },
    {
        name: 'binance-blz-in-usdt',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=BLZUSDT',
        property: 'price'
    },
    {
        name: 'gateio-blz-in-usdt',
        url: 'https://data.gateapi.io/api2/1/ticker/blz_usdt',
        property: 'last'
    },
    {
        name: 'huobi-blz-in-usdt',
        url: 'https://api.huobi.pro/market/detail?symbol=blzusdt',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-blz-in-usdt',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BLZ&tsyms=USDT',
        property: 'USDT'
    },
    {
        name: 'nomics-blz-in-usdt',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BLZ&convert=USDT',
        property: '[0].price'
    },
    {
        name: 'cryptocompare-blz-in-usdc',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BLZ&tsyms=USDC',
        property: 'USDC'
    },
    {
        name: 'nomics-blz-in-usdc',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BLZ&convert=USDC',
        property: '[0].price'
    },
    {
        name: 'nomics-blz-in-usd',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BLZ&convert=USD',
        property: '[0].price'
    },
    {
        name: 'binance-blz-in-eth',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=BLZETH',
        property: 'price'
    },
    {
        name: 'coingecko-blz-in-eth',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=eth',
        property: 'bluzelle.eth'
    },
    {
        name: 'gateio-blz-in-eth',
        url: 'https://data.gateapi.io/api2/1/ticker/blz_eth',
        property: 'last'
    },
    {
        name: 'huobi-blz-in-eth',
        url: 'https://api.huobi.pro/market/detail?symbol=blzeth',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-blz-in-eth',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BLZ&tsyms=ETH',
        property: 'ETH'
    },
    {
        name: 'nomics-blz-in-eth',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BLZ&convert=ETH',
        property: '[0].price'
    },
    {
        name: 'binance-blz-in-btc',
        url: 'https://api.binance.com/api/v1/ticker/price?symbol=BLZBTC',
        property: 'price'
    },
    {
        name: 'coingecko-blz-in-btc',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=btc',
        property: 'bluzelle.btc'
    },
    {
        name: 'huobi-blz-in-btc',
        url: 'https://api.huobi.pro/market/detail?symbol=blzbtc',
        property: 'tick.close'
    },
    {
        name: 'cryptocompare-blz-in-btc',
        url: 'https://min-api.cryptocompare.com/data/price?fsym=BLZ&tsyms=BTC',
        property: 'BTC'
    },
    {
        name: 'nomics-blz-in-btc',
        url: 'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BLZ&convert=BTC',
        property: '[0].price'
    }
]
