import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/product/DeleteProductService';

class DeleteProductController {
  async handle(req: Request, res: Response) {    
    const product_id = req.params.id;

    const deleteProductService = new DeleteProductService();
    const product = await deleteProductService.execute({ product_id });
    
    return res.json(product);
  }
}

export { DeleteProductController }	
