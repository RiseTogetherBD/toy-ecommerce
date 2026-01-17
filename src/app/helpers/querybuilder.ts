import { CategoryType, ProductStatus } from "@prisma/client";
import { IGetProductsQuery } from "../types/product";

 export const buildProductQuery = (reqQuery: any): IGetProductsQuery => {
      const query: IGetProductsQuery = {};

      if (typeof reqQuery.search === "string") query.search = reqQuery.search;
      if (reqQuery.status) query.status = reqQuery.status as ProductStatus;
      if (reqQuery.type) query.type = reqQuery.type as CategoryType;
      if (reqQuery.minPrice) query.minPrice = Number(reqQuery.minPrice);
      if (reqQuery.maxPrice) query.maxPrice = Number(reqQuery.maxPrice);
      if (reqQuery.isFeatured !== undefined)
        query.isFeatured = reqQuery.isFeatured === "true";
      if (reqQuery.ageMin) query.ageMin = Number(reqQuery.ageMin);
      if (reqQuery.ageMax) query.ageMax = Number(reqQuery.ageMax);

      query.page = reqQuery.page || "1";
      query.limit = reqQuery.limit || "10";
      query.sortBy = reqQuery.sortBy || "createdAt";
      query.sortOrder = reqQuery.sortOrder || "desc";

      return query;
    };