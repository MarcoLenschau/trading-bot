import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('coins')
export class CoinsController {
    constructor(private coinService: CoinsService) {}

    @Get()
    @ApiOperation({
        summary: 'Show all trading pairs',
        description: 'Load and show all trading pairs from the provider API',
    })
    @ApiResponse({
      status: 200,
      description: 'Successfully',
    })
    @ApiResponse({
      status: 404,
      description: 'Can not connect to the provider API',
    })
    showAllCoins() {
        return this.coinService.getTradingPairs();
    }
}
