import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import axios from "axios";

interface Variant {
  id: string;
  product_id: string;
  title: string;
  price: string;
  inventory_quantity: number;
}
interface ProductImage {
  id: string;
  product_id: string;
  src: string;
}
export interface Product {
  price: unknown;
  id: string;
  title: string;
  variants: Variant[];
  image: ProductImage;
  discount: number;
  discountType: "percentage" | "fixed";
  isDiscountEditing: boolean;
}

interface ProductPickerProps {
  onProductSelect: (selectedProducts: Product[]) => void;
  open: boolean;
  onClose: () => void;
}

const ProductPicker: React.FC<ProductPickerProps> = ({
  onProductSelect,
  open,
  onClose,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({});
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, boolean>
  >({});

  const apiKey = "72njgfa948d9aS7gs5";
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "77",
        title: "Fog Linen Chambray Towel - Beige Stripe",
        variants: [
          {
            id: "1",
            product_id: "77",
            title: "XS / Silver",
            price: "49",
            inventory_quantity: 0,
          },
          {
            id: "2",
            product_id: "77",
            title: "S / Silver",
            price: "49",
            inventory_quantity: 0,
          },
          {
            id: "3",
            product_id: "77",
            title: "M / Silver",
            price: "49",
            inventory_quantity: 0,
          },
        ],
        image: {
          id: "266",
          product_id: "77",
          src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
        },
        discount: 0,
        discountType: "percentage",
        price: undefined,
        isDiscountEditing: false, // Add this field
      },
      {
        id: "80",
        title: "Orbit Terrarium - Large",
        variants: [
          {
            id: "64",
            product_id: "80",
            title: "Default Title",
            price: "109",
            inventory_quantity: 0,
          },
        ],
        image: {
          id: "272",
          product_id: "80",
          src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
        },
        discount: 0,
        discountType: "percentage",
        price: undefined,
        isDiscountEditing: false, // Add this field
      },
    ];
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("/task/products/search", {
    //       headers: {
    //         "x-api-key": apiKey,
    //       },
    //       params: {
    //         page: 2,
    //       },
    //     });
    //     if (response.status === 200) {
    //       console.log(response.data, "api data");
    //       setProducts(response.data);
    //     } else {
    //       setProducts(sampleProducts);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     setProducts(sampleProducts);
    //   }
    // };
    // fetchData();
    setProducts(sampleProducts);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleVariantSelect = (variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantId]: !prev[variantId],
    }));
  };

  const handleSubmit = () => {
    const selectedProducts = products?.filter((product) =>
      product.variants.some((variant) => selectedVariants[variant.id])
    );
    onProductSelect(selectedProducts);
    onClose();
  };

  const filteredProducts = products?.filter(
    (product) =>
      product?.title.toLowerCase().includes(searchTerm) ||
      product?.variants.some((variant) =>
        variant?.title.toLowerCase().includes(searchTerm)
      )
  );

  const selectedCount = Object.values(selectedVariants)?.filter(Boolean).length;

  return (
    <Dialog onClose={onClose} maxWidth="md" fullWidth open={open}>
      <DialogTitle>Select Products</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Search product"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          margin="normal"
        />
        <List>
          {filteredProducts.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    checked={product.variants.every(
                      (v) => selectedVariants[v.id]
                    )}
                    indeterminate={
                      product.variants.some((v) => selectedVariants[v.id]) &&
                      !product.variants.every((v) => selectedVariants[v.id])
                    }
                    onChange={() =>
                      product.variants.forEach((v) => handleVariantSelect(v.id))
                    }
                  />
                </ListItemIcon>
                {/* Use MUI's Avatar component for the image */}
                <Avatar
                  variant="square"
                  src={product.image.src}
                  alt={product.title}
                  sx={{ width: 50, height: 50, marginRight: 2 }} // Customize the size and margin
                />
                <ListItemText
                  primary={product.title}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />{" "}
              </ListItem>

              <List component="div" disablePadding>
                {product.variants.map((variant: any) => (
                  <ListItem key={variant.id} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        checked={!!selectedVariants[variant.id]}
                        onChange={() => handleVariantSelect(variant.id)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={variant.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {variant.inventory_quantity} available
                          </Typography>
                          {" — $" + variant.price}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2 }}>
          {selectedCount} {selectedCount === 1 ? "product" : "products"}{" "}
          selected
        </Box>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPicker;
