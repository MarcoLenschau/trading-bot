import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
let coins: [] = [];
@Injectable()
export class CoinsService {

    constructor(private configService: ConfigService) {}

    async getTradingPairs() {
        if (coins.length <= 0) { 
            const tradingPairs = await this.getProviderTradingPairs(); 
            coins = tradingPairs;
        }
        return coins;
    }

    async getProviderTradingPairs() {
      const url = this.configService.get<string>("COIN_LIST_URL");
      const response = await fetch(url!);
      if (!response.ok) throw new Error(`Provider API not connected: ${response.status}`);
      const data = await response.json();

      return data.symbols
        .filter((symbol: any) =>
            symbol.status === 'TRADING' && 
            symbol.isSpotTradingAllowed && 
            symbol.quoteAsset === 'USDT',
        )
        .map((symbol: any) => symbol.symbol)
        .sort();
    }
}
