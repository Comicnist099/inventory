import type { Request, Response } from "express";
import type { ProductService } from "../services/ProductService";
import type { ProductValidator } from "../validators/ProductValidator";
import type { ProductMapper } from "../mappers/ProductMapper";
import { ValidationError } from "../../../services/ValidationError";
import logger from "../../../utils/logger";

export class ProductController {
  private productService: ProductService;
  private productValidator: ProductValidator;
  private productMapper: ProductMapper;

  constructor(
    productService: ProductService,
    productValidator: ProductValidator,
    productMapper: ProductMapper
  ) {
    this.productService = productService;
    this.productValidator = productValidator;
    this.productMapper = productMapper;
  }

  async create(req: Request, res: Response): Promise<void> {
    logger.info('Request received to create a product', { body: req.body });
    try {
      const validatedProductData = await this.productValidator.validateCreate(
        req.body
      );
      const productEntity = this.productMapper.mapFrom(validatedProductData);
      const createdProduct = await this.productService.createProduct(
        productEntity
      );
      const productDto = this.productMapper.mapTo(createdProduct);
      res.status(201).json(productDto);
      logger.info('Product created successfully', { status: 201, productId: createdProduct.id }); 
    } catch (error) {
      logger.error('Error creating product', { error });
      this.handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    logger.info('Request received to fetch all products', { query: req.query });
    try {
      const validatedQueryProduct = await this.productValidator.validateQuery(
        req.query
      );
      const products = await this.productService.getProducts(
        validatedQueryProduct
      );
      const productDtos = products.map((product) =>
        this.productMapper.mapTo(product)
      );
      res.json(productDtos);
      logger.info('Products fetched successfully', { status: 200, count: productDtos.length }); 
    } catch (error) {
      logger.error('Error fetching all products', { error });
      this.handleError(res, error);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    logger.info('Request received to fetch product by ID', { id });
    try {
      const product = await this.productService.getProduct(id);
      if (!product) {
        res.status(404).json({ error: `El producto ${id} no existe` });
        logger.warn('Product not found', { status: 404, id }); 
        return;
      }
      const productDto = this.productMapper.mapTo(product);
      res.status(200).json(productDto);
      logger.info('Product fetched successfully', { status: 200, id }); 
    } catch (error) {
      logger.error('Error fetching product by ID', { id, error });
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    logger.info('Request received to update product', { id, body: req.body });
    try {
      if (!id) {
        res.status(400).json({ error: "El ID proporcionado no es válido." });
        logger.warn('Invalid ID provided', { status: 400, id }); 
        return;
      }

      const validatedBody = await this.productValidator.validateUpdate(
        req.body
      );
      const productEntity = this.productMapper.mapFrom({
        ...validatedBody,
        idUnique: id,
      });
      const updatedProduct = await this.productService.updateProduct(
        productEntity
      );
      const productDto = this.productMapper.mapTo(updatedProduct);
      res.status(200).json(productDto);
      logger.info('Product updated successfully', { status: 200, id }); 
    } catch (error) {
      logger.error('Error updating product', { id, error });
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    logger.info('Request received to delete product', { id });
    try {
      const deletedProduct = await this.productService.deleteProduct(id);
      res.status(200).json(deletedProduct);
      logger.info('Product deleted successfully', { status: 200, id }); 
    } catch (error) {
      logger.error('Error deleting product', { id, error });
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    if (error instanceof ValidationError) {
      const notFoundError = error.errors.find((e) => e.type === "not-found");

      if (notFoundError) {
        res.status(404).json({
          message: "Recurso no encontrado",
          errors: error.errors,
        });
        logger.warn('Resource not found', { status: 404, errors: error.errors }); 
        return;
      }

      res.status(400).json({
        message: "Error de validación",
        errors: error.errors,
      });
      logger.warn('Validation error', { status: 400, errors: error.errors }); 
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({
        error: error.message,
      });
      logger.error('Internal server error', { status: 500, error: error.message }); 
      return;
    }

    res.status(500).json({
      error: "Error desconocido",
    });
    logger.error('Unknown error', { status: 500 }); 
  }
}