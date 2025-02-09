import { Request, Response } from 'express';
import { HelloService } from '../services/hello.service';

export class HelloController {
  private helloService: HelloService;

  constructor() {
    this.helloService = new HelloService();
  }

  getHello = (req: Request, res: Response) => {
    const data = this.helloService.getHelloData();
    res.status(200).json(data);
  };
}