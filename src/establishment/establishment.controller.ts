import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Establishment } from 'entities/establishment';
import { EstablishmentService, IFilter } from './establishment.service';
import { Response, Request } from 'express';

@Controller('establishment')
export class EstablishmentController {
    constructor(private establishmentService: EstablishmentService) {}
    @Post()
    async create(@Res() res: Response, @Body() etab: Establishment): Promise<any> {
      await this.establishmentService.create(etab);
      res.status(HttpStatus.OK).json([]);
    }

    @Post('save')
    async save(@Res() res: Response, @Body() etab: Establishment): Promise<any> {
      await this.establishmentService.save(etab);
      res.status(HttpStatus.OK).json([]);
    }

    @Post('find')
    async findAllByCategoriesIds(@Res() res: Response, @Body() filter: IFilter): Promise<any> {
      const etabs = await this.establishmentService.findEtablissmentByIds(filter);
      res.status(HttpStatus.OK).json(etabs);
    }

    @Get('all')
    async findAll(@Res() res: Response): Promise<any> {
      const etabs = await this.establishmentService.findAll();
      res.status(HttpStatus.OK).json(etabs);
    }

    @Get('self/:id')
    async findOne(@Res() res: Response, @Param() params): Promise<any> {
      const etabs = await this.establishmentService.findOne(params);
      res.status(HttpStatus.OK).json(etabs);
    }

    @Post('approuved')
    async approuved(@Res() res: Response, @Body() etab: Establishment): Promise<any> {
      const etabs = await this.establishmentService.approuveEstablishment(etab.id);
      res.status(HttpStatus.OK).json(etabs);
    }

    @Get('user/:id')
    async findByUserId(@Res() res: Response, @Param() params): Promise<any> {
      const etabs = await this.establishmentService.findByUserId(params);
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
