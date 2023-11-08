import {Data} from "./types.js"

export class Fetch {
    private static _cache: Record<string, { data:Data, timestamp: number }> = {
    }

    static async get(url: string, coin: any) {
        const now = Date.now();
        const CACHE_TTL = 2 * 60 * 1000;
        if (Fetch._cache[url] && (now - Fetch._cache[url].timestamp) <= CACHE_TTL) {
            console.log(`Found cached '${coin}'. Remaining ${(CACHE_TTL-(now - Fetch._cache[url].timestamp))/1000} seconds`);
            return Fetch._cache[url].data;
        }

        try {
            const result = await fetch(url);            
            const data:{market_data:{current_price:Data},image:{thumb:string}} = await result.json();
            const currentPrice = data.market_data.current_price;
            const newImage = data.image.thumb;
            const newCoinData = {usd:currentPrice.usd,eur:currentPrice.eur,ils:currentPrice.ils,image:newImage};
            
            const newCachedData = { data: newCoinData, timestamp: Date.now() };
            Fetch._cache[url] = newCachedData;
            
            return newCoinData;   
        }
        catch (error) {
            console.log(error);
            throw error;
        }

    }
}

export const  service = (() => {
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/list';
   
    async function getAllCoins() {
        const response = await fetch(`${baseUrl}`);
        if (response.ok) {
            const coins = await response.json();
             console.log(response);
            //  console.log(coins)
             return coins;
        }
        throw new Error('Failed to fetch Coins Data');
    }

    return {
        getAllCoins,
    };

})();



