import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Establishment } from 'entities/establishment';
import { EstablishmentService } from './establishment.service';
import { Response, Request } from 'express';

@Controller('establishment')
export class EstablishmentController {
    constructor(private establishmentService: EstablishmentService) {}
    @Post()
    async create(@Res() res: Response, @Body() etab: Establishment): Promise<any> {
      await this.establishmentService.create(etab);
      res.status(HttpStatus.OK).json([]);
    }

    @Get('categories/:ids')
    async findAllByCategoriesIds(@Res() res: Response, @Param() params): Promise<any> {
      const ids = params.ids.split(',').map((e) => Number(e));
      const etabs = await this.establishmentService.findEtablissmentByIds(ids);
      res.status(HttpStatus.OK).json(etabs);
    }

    @Get('all')
    async findAll(@Res() res: Response): Promise<any> {
      const etabs = await this.establishmentService.findAll();
      res.status(HttpStatus.OK).json(etabs);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@Res() res: Response, @UploadedFile() files) {
      res.status(HttpStatus.OK).json(files);
    }

    @Get('/photo/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './upload' });
    }

}
