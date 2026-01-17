

import { CategoryType, ProductStatus } from "@prisma/client";

export interface IGetProductsQuery {
  page?: string;
  limit?: string;
  sortBy?: "createdAt"  | "name";
  sortOrder?: "asc" | "desc";
  search?: string;

  status?: ProductStatus;
  type?: CategoryType;     // indoor | outdoor

  minPrice?: number;
  maxPrice?: number;

  isFeatured?: boolean; 
  ageMin?: number;   
  ageMax?: number;  }


export interface IOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

