# Clothing Store - Schema Customization Guide

## Overview
This guide explains how to customize your Sanity CMS schema to handle clothing-specific features like sizes, colors, materials, and fit information.

---

## Current Product Schema

Your store uses the product schema located at:
```
sanity/schemaTypes/productType.ts
```

This schema includes basic e-commerce fields. For a clothing store, you'll want to add clothing-specific fields.

---

## Fields to Add for Clothing

### 1. **Size System**

Add a sizes array to handle multiple sizes with stock tracking:

```typescript
{
  name: 'sizes',
  title: 'Available Sizes',
  type: 'array',
  of: [
    {
      type: 'object',
      title: 'Size Option',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
          options: {
            list: [
              { title: 'XS', value: 'xs' },
              { title: 'S', value: 's' },
              { title: 'M', value: 'm' },
              { title: 'L', value: 'l' },
              { title: 'XL', value: 'xl' },
              { title: 'XXL', value: 'xxl' },
              { title: '2XL', value: '2xl' },
              { title: '3XL', value: '3xl' },
            ]
          }
        },
        {
          name: 'stock',
          title: 'Stock Quantity',
          type: 'number',
          description: 'Available units for this size'
        },
        {
          name: 'sku',
          title: 'SKU for this size',
          type: 'string',
          description: 'Unique code for inventory tracking'
        }
      ],
      preview: {
        select: {
          title: 'size',
          subtitle: 'stock'
        }
      }
    }
  ]
}
```

### 2. **Color Field**

```typescript
{
  name: 'color',
  title: 'Color',
  type: 'string',
  description: 'Main product color',
  options: {
    list: [
      { title: 'Black', value: 'black' },
      { title: 'White', value: 'white' },
      { title: 'Red', value: 'red' },
      { title: 'Blue', value: 'blue' },
      { title: 'Green', value: 'green' },
      { title: 'Yellow', value: 'yellow' },
      { title: 'Gray', value: 'gray' },
      { title: 'Brown', value: 'brown' },
      { title: 'Navy', value: 'navy' },
      { title: 'Purple', value: 'purple' },
      { title: 'Pink', value: 'pink' },
      { title: 'Orange', value: 'orange' },
      { title: 'Beige', value: 'beige' },
      { title: 'Multi-color', value: 'multicolor' },
    ]
  }
}
```

### 3. **Material/Fabric Field**

```typescript
{
  name: 'material',
  title: 'Material / Fabric',
  type: 'string',
  description: 'What is the item made of?',
  options: {
    list: [
      { title: 'Cotton', value: 'cotton' },
      { title: 'Polyester', value: 'polyester' },
      { title: 'Cotton Blend', value: 'cotton-blend' },
      { title: 'Linen', value: 'linen' },
      { title: 'Denim', value: 'denim' },
      { title: 'Wool', value: 'wool' },
      { title: 'Silk', value: 'silk' },
      { title: 'Leather', value: 'leather' },
      { title: 'Synthetic', value: 'synthetic' },
      { title: 'Spandex/Elastic', value: 'spandex' },
      { title: 'Rayon', value: 'rayon' },
      { title: 'Nylon', value: 'nylon' },
    ]
  }
}
```

### 4. **Care Instructions**

```typescript
{
  name: 'careInstructions',
  title: 'Care Instructions',
  type: 'object',
  fields: [
    {
      name: 'washing',
      title: 'Washing',
      type: 'string',
      description: 'e.g., "Machine wash cold with similar colors"'
    },
    {
      name: 'drying',
      title: 'Drying',
      type: 'string',
      description: 'e.g., "Tumble dry low, remove promptly"'
    },
    {
      name: 'ironing',
      title: 'Ironing',
      type: 'string',
      description: 'e.g., "Iron on low if needed"'
    },
    {
      name: 'special',
      title: 'Special Instructions',
      type: 'string',
      description: 'e.g., "Do not bleach"'
    }
  ]
}
```

### 5. **Fit Information**

```typescript
{
  name: 'fit',
  title: 'Fit',
  type: 'string',
  description: 'How does this item fit?',
  options: {
    list: [
      { title: 'Slim Fit', value: 'slim' },
      { title: 'Regular Fit', value: 'regular' },
      { title: 'Loose Fit', value: 'loose' },
      { title: 'Relaxed Fit', value: 'relaxed' },
      { title: 'Skinny Fit', value: 'skinny' },
      { title: 'One Size', value: 'onesize' },
    ]
  }
}
```

### 6. **Measurements/Size Guide**

```typescript
{
  name: 'measurements',
  title: 'Size Guide / Measurements',
  type: 'object',
  fields: [
    {
      name: 'chart',
      title: 'Size Chart',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string'
            },
            {
              name: 'chest',
              title: 'Chest (inches)',
              type: 'number'
            },
            {
              name: 'waist',
              title: 'Waist (inches)',
              type: 'number'
            },
            {
              name: 'length',
              title: 'Length (inches)',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'fitNotes',
      title: 'Fit Notes',
      type: 'text',
      description: 'Additional notes about sizing'
    }
  ]
}
```

### 7. **Seasonal/Collection Field**

```typescript
{
  name: 'season',
  title: 'Season / Collection',
  type: 'string',
  description: 'Which season or collection is this from?',
  options: {
    list: [
      { title: 'Spring/Summer 2025', value: 'ss2025' },
      { title: 'Fall/Winter 2024', value: 'fw2024' },
      { title: 'Summer 2024', value: 'summer2024' },
      { title: 'Winter 2024', value: 'winter2024' },
      { title: 'Year-Round', value: 'yearround' },
    ]
  }
}
```

### 8. **Product Type**

```typescript
{
  name: 'productType',
  title: 'Product Type',
  type: 'string',
  description: 'Category of clothing',
  options: {
    list: [
      { title: 'T-Shirt', value: 'tshirt' },
      { title: 'Shirt', value: 'shirt' },
      { title: 'Blouse', value: 'blouse' },
      { title: 'Pants', value: 'pants' },
      { title: 'Jeans', value: 'jeans' },
      { title: 'Shorts', value: 'shorts' },
      { title: 'Skirt', value: 'skirt' },
      { title: 'Dress', value: 'dress' },
      { title: 'Jacket', value: 'jacket' },
      { title: 'Coat', value: 'coat' },
      { title: 'Sweater', value: 'sweater' },
      { title: 'Hoodie', value: 'hoodie' },
      { title: 'Accessory', value: 'accessory' },
      { title: 'Hat', value: 'hat' },
      { title: 'Shoes', value: 'shoes' },
    ]
  }
}
```

---

## Implementation Steps

### Step 1: Open Your Product Schema File

```bash
# Open in VS Code
code sanity/schemaTypes/productType.ts
```

### Step 2: Add Fields to Your Schema

Find the `fields` array in `productType.ts` and add the fields above. Here's a complete example structure:

```typescript
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Existing fields...
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    
    // NEW: Clothing-specific fields
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirt', value: 'tshirt' },
          { title: 'Shirt', value: 'shirt' },
          // ... more options
        ]
      }
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      // ... color options
    },
    {
      name: 'material',
      title: 'Material / Fabric',
      type: 'string',
      // ... material options
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // ... size fields
          ]
        }
      ]
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'object',
      fields: [
        // ... care instruction fields
      ]
    },
    // ... more fields as needed
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
```

### Step 3: Update Your TypeScript Types

After updating the schema, regenerate types:

```bash
pnpm run typegen
```

This will update `sanity.types.ts` with your new fields.

### Step 4: Update Frontend Components

Update your product components to use the new fields. For example, in `components/ProductsDetails.tsx`:

```typescript
// Add size selection
{product.sizes && (
  <div className="mt-4">
    <label>Select Size:</label>
    <select>
      {product.sizes.map((size) => (
        <option key={size.size} value={size.size}>
          {size.size} ({size.stock} in stock)
        </option>
      ))}
    </select>
  </div>
)}

// Display material
{product.material && (
  <p className="mt-2">
    <strong>Material:</strong> {product.material}
  </p>
)}

// Display color
{product.color && (
  <p className="mt-2">
    <strong>Color:</strong> {product.color}
  </p>
)}

// Display care instructions
{product.careInstructions && (
  <div className="mt-4 border-t pt-4">
    <h4 className="font-semibold">Care Instructions</h4>
    <ul>
      {product.careInstructions.washing && <li>Wash: {product.careInstructions.washing}</li>}
      {product.careInstructions.drying && <li>Dry: {product.careInstructions.drying}</li>}
      {product.careInstructions.ironing && <li>Iron: {product.careInstructions.ironing}</li>}
      {product.careInstructions.special && <li>{product.careInstructions.special}</li>}
    </ul>
  </div>
)}
```

### Step 5: Customize Categories

In Sanity Studio, create these clothing categories:
- T-Shirts & Tops
- Shirts & Blouses
- Pants & Jeans
- Shorts
- Dresses
- Skirts
- Jackets & Coats
- Sweaters & Hoodies
- Footwear
- Accessories
- Seasonal Sales

---

## Sample Product Data

Here's how to fill in a product in Sanity Studio:

```json
{
  "title": "Classic Navy Cotton T-Shirt",
  "description": "Premium quality, breathable cotton t-shirt perfect for everyday wear.",
  "productType": "tshirt",
  "color": "navy",
  "material": "cotton",
  "fit": "regular",
  "price": 2999,
  "category": "T-Shirts & Tops",
  "sizes": [
    { "size": "xs", "stock": 15, "sku": "CST-NAVY-XS" },
    { "size": "s", "stock": 25, "sku": "CST-NAVY-S" },
    { "size": "m", "stock": 30, "sku": "CST-NAVY-M" },
    { "size": "l", "stock": 20, "sku": "CST-NAVY-L" },
    { "size": "xl", "stock": 15, "sku": "CST-NAVY-XL" },
    { "size": "xxl", "stock": 10, "sku": "CST-NAVY-XXL" }
  ],
  "careInstructions": {
    "washing": "Machine wash cold with similar colors",
    "drying": "Tumble dry low, remove promptly",
    "ironing": "Iron on low if needed",
    "special": "Do not bleach"
  },
  "mainImage": { /* image reference */ },
  "images": [ /* array of image references */ ]
}
```

---

## GROQ Queries for Clothing

Once you have the schema set up, here are useful GROQ queries:

### Get all products for a size
```groq
*[_type == "product"] | {
  title,
  color,
  material,
  sizes[] {
    size,
    stock
  }
}
```

### Get products by color
```groq
*[_type == "product" && color == "blue"] {
  title,
  color,
  price,
  mainImage
}
```

### Get available sizes and stock
```groq
*[_type == "product" && _id == $productId] {
  title,
  sizes[] {
    size,
    stock,
    sku
  }
}
```

### Get care instructions
```groq
*[_type == "product" && _id == $productId] {
  title,
  careInstructions
}
```

---

## Next Steps

1. ✅ Update your schema with clothing fields
2. ✅ Run `pnpm run typegen` to update types
3. ✅ Restart your dev server: `pnpm dev`
4. ✅ Go to http://localhost:3000/studio
5. ✅ Create a test product with all fields
6. ✅ Update your frontend components to display new fields
7. ✅ Test the store with products

---

## Common Questions

**Q: Do I need to use all these fields?**
A: No! Start with the ones you need (size, color, material) and add more as needed.

**Q: How do I handle products with multiple colors?**
A: You can either create separate products per color, or add a `availableColors` array field.

**Q: Can I add custom fields?**
A: Yes! Edit the schema file and add any fields you need, then run `pnpm run typegen`.

**Q: How do I handle international sizes (UK, EU, etc.)?**
A: Add a `sizeSystem` field and adjust your size options accordingly.

---

## Additional Resources

- [Sanity Schema Documentation](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Type Generation](https://www.sanity.io/docs/sanity-typegen)

---

**Ready to add these fields? Start with the Implementation Steps above!**
