
---
## Product

✅ Product 1 — Indoor Toy
```

{
  "name": "Kids Building Blocks",
  "slug": "kids-building-blocks",
  "description": "Colorful indoor building blocks for kids",
  "brandId": "brand-1",
  "categoryId": "cat-indoor-1",
  "ageMin": 3,
  "ageMax": 8,
  "isFeatured": true,
  "status": "active",
  "variants": [
    {
      "sku": "BLOCK-001",
      "variantName": "Small Box",
      "basePrice": 800,
      "sellPrice": 950,
      "inventory": {
        "stockQuantity": 50
      }
    }
  ],
  "images": [
    { "imageUrl": "https://img.com/block1.jpg", "isPrimary": true }
  ]
}



```
✅ Product 2 — Outdoor Toy
```
{
  "name": "Remote Control Car",
  "slug": "remote-control-car",
  "description": "Fast outdoor remote control car",
  "brandId": "brand-1",
  "categoryId": "cat-outdoor-1",
  "ageMin": 6,
  "ageMax": 14,
  "isFeatured": false,
  "status": "active",
  "variants": [
    {
      "sku": "RC-001",
      "variantName": "Standard",
      "basePrice": 2500,
      "sellPrice": 2999,
      "inventory": {
        "stockQuantity": 20
      }
    }
  ],
  "images": [
    { "imageUrl": "https://img.com/rc1.jpg", "isPrimary": true }
  ]
}

```
✅ Product 3 — Featured Indoor
```
{
  "name": "Kids Puzzle Set",
  "slug": "kids-puzzle-set",
  "description": "Brain development puzzle set",
  "brandId": "brand-1",
  "categoryId": "cat-indoor-1",
  "ageMin": 4,
  "ageMax": 10,
  "isFeatured": true,
  "status": "active",
  "variants": [
    {
      "sku": "PUZZLE-001",
      "variantName": "Wooden",
      "basePrice": 600,
      "sellPrice": 750,
      "inventory": {
        "stockQuantity": 0
      }
    }
  ],
  "images": [
    { "imageUrl": "https://img.com/puzzle.jpg", "isPrimary": true }
  ]
}

```
✅ Product 4 — Draft Product
```
{
  "name": "Toy Train Set",
  "slug": "toy-train-set",
  "description": "Electric toy train",
  "brandId": "brand-1",
  "categoryId": "cat-indoor-1",
  "ageMin": 5,
  "ageMax": 12,
  "isFeatured": false,
  "status": "draft",
  "variants": [
    {
      "sku": "TRAIN-001",
      "variantName": "Electric",
      "basePrice": 3200,
      "sellPrice": 3800,
      "inventory": {
        "stockQuantity": 15
      }
    }
  ],
  "images": [
    { "imageUrl": "https://img.com/train.jpg", "isPrimary": true }
  ]
}

```
✅ Product 5 — Outdoor Sports
```
{
  "name": "Kids Football",
  "slug": "kids-football",
  "description": "Outdoor football for kids",
  "brandId": "brand-1",
  "categoryId": "cat-outdoor-1",
  "ageMin": 5,
  "ageMax": 15,
  "isFeatured": false,
  "status": "active",
  "variants": [
    {
      "sku": "BALL-001",
      "variantName": "Size 3",
      "basePrice": 400,
      "sellPrice": 550,
      "inventory": {
        "stockQuantity": 100
      }
    }
  ],
  "images": [
    { "imageUrl": "https://img.com/ball.jpg", "isPrimary": true }
  ]
}

```

## Brand
```
[
  {
   
    "name": "Nike",
    "country": "USA",
  }
  {
   
    "name": "Adidas",  
    "country": "Germany",
    
  },
  {
    "name": "Puma",
    "country": "Germany"
  }
  {
  
    "name": "IKEA",   
    "country": "Sweden",
   
    
  },
  {
   
    "name": "Samsung",    
    "country": "South Korea"
    
  }
]

```

## Category

```
 http://localhost:5000/api/v1/categories
```

```
   [
  {
    "id": "c1d2e3f4-001",
    "name": "Bikes",
    "slug": "bikes",
    "parentId": null,
    "type": "outdoor",
    "icon": "🚲",
    "isActive": true,
    "createdAt": "2026-01-14T10:00:00.000Z",
    "children": [],
    "products": []
  },
  {
    "id": "c1d2e3f4-002",
    "name": "Mountain Bikes",
    "slug": "mountain-bikes",
    "parentId": "c1d2e3f4-001",
    "type": "outdoor",
    "icon": "⛰️",
    "isActive": true,
    "createdAt": "2026-01-14T10:05:00.000Z",
    "children": [],
    "products": []
  },
  {
    "id": "c1d2e3f4-003",
    "name": "Furniture",
    "slug": "furniture",
    "parentId": null,
    "type": "indoor",
    "icon": "🛋️",
    "isActive": true,
    "createdAt": "2026-01-14T10:10:00.000Z",
    "children": [],
    "products": []
  },
  {
    "id": "c1d2e3f4-004",
    "name": "Chairs",
    "slug": "chairs",
    "parentId": "c1d2e3f4-003",
    "type": "indoor",
    "icon": "🪑",
    "isActive": true,
    "createdAt": "2026-01-14T10:15:00.000Z",
    "children": [],
    "products": []
  },
  {
    "id": "c1d2e3f4-005",
    "name": "Lighting",
    "slug": "lighting",
    "parentId": null,
    "type": "indoor",
    "icon": "💡",
    "isActive": true,
    "createdAt": "2026-01-14T10:20:00.000Z",
    "children": [],
    "products": []
  }
]

```

 ## Order
 ```
 ```
---