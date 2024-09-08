// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   IconButton,
//   Card,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import ProductPicker from "../components/ProductPicker/ProductPicker";

// interface Variant {
//   id: string | number;
//   product_id: string | number;
//   title: string;
//   price: string;
//   inventory_quantity?: number;
// }

// interface Product {
//   id: string | number;
//   title: string;
//   variants: Variant[];
//   image: {
//     id: string | number;
//     product_id: string | number;
//     src: string;
//   };
//   discount?: number;
//   discountType?: "percentage" | "fixed";
//   isDiscountEditing: boolean;
// }

// const AddProductsPage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
//   const [expandedProducts, setExpandedProducts] = useState<
//     Record<string, boolean>
//   >({});
//   const [discountEditingProduct, setDiscountEditingProduct] = useState<
//     string | number | null
//   >(null);
//   const handleAddProduct = () => {
//     setIsProductPickerOpen(true);
//   };

//   const handleProductSelect = (selectedProducts: Product[]) => {
//     setProducts([...products, ...selectedProducts]);
//     setIsProductPickerOpen(false);
//   };
//   // const toggleDiscountEditing = (productId: string | number) => {
//   //   setDiscountEditingProduct((prevId) =>
//   //     prevId === productId ? null : productId
//   //   );
//   // };.
//   const toggleDiscountEditing = (productId: string | number) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId
//           ? { ...product, isDiscountEditing: !product.isDiscountEditing }
//           : product
//       )
//     );
//   };

//   const handleDiscountChange = (
//     productId: string | number,
//     discount: number,
//     discountType: "percentage" | "fixed"
//   ) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId
//           ? { ...product, discount, discountType }
//           : product
//       )
//     );
//   };

//   const handleRemoveProduct = (productId: string | number) => {
//     setProducts(products.filter((product) => product.id !== productId));
//   };
//   const handleRemoveVariant = (
//     productId: string | number,
//     variantId: string | number
//   ) => {
//     setProducts(
//       products.map((product) => {
//         if (product.id === productId) {
//           return {
//             ...product,
//             variants: product.variants.filter(
//               (variant) => variant.id !== variantId
//             ),
//           };
//         }
//         return product;
//       })
//     );
//   };

//   const toggleProductExpansion = (productId: string | number) => {
//     setExpandedProducts((prev) => ({ ...prev, [productId]: !prev[productId] }));
//   };

//   const onDragEnd = (result: any) => {
//     const { destination, source, type } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     if (type === "product") {
//       const newProducts = Array.from(products);
//       const [reorderedProduct] = newProducts.splice(source.index, 1);
//       newProducts.splice(destination.index, 0, reorderedProduct);
//       setProducts(newProducts);
//     } else if (type === "variant") {
//       const productId = source.droppableId.split("-")[1];
//       const product = products.find((p) => p.id.toString() === productId);
//       if (product) {
//         const newVariants = Array.from(product.variants);
//         const [reorderedVariant] = newVariants.splice(source.index, 1);
//         newVariants.splice(destination.index, 0, reorderedVariant);
//         setProducts(
//           products.map((p) =>
//             p.id.toString() === productId ? { ...p, variants: newVariants } : p
//           )
//         );
//       }
//     }
//   };

//   return (
//     <Card sx={{ width: "70%" }}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Add Products
//         </Typography>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="id" type="product">
//             {(provided) => (
//               <Box {...provided.droppableProps} ref={provided.innerRef}>
//                 {products.map((product, index) => (
//                   <Draggable
//                     key={product.id.toString()}
//                     draggableId={product.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <Box
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         sx={{
//                           mb: 2,
//                           border: "1px solid #ccc",
//                           p: 2,
//                           borderRadius: 2,
//                         }}
//                       >
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", mb: 1 }}
//                         >
//                           <Box {...provided.dragHandleProps}>
//                             <DragIndicatorIcon />
//                           </Box>
//                           <Typography sx={{ flexGrow: 1 }}>
//                             {index + 1}. {product.title}
//                           </Typography>
//                           {product.isDiscountEditing ? (
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 mt: 1,
//                                 mb: 1,
//                               }}
//                             >
//                               <TextField
//                                 value={product.discount || 0}
//                                 onChange={(e) =>
//                                   handleDiscountChange(
//                                     product.id,
//                                     Number(e.target.value),
//                                     product.discountType || "percentage"
//                                   )
//                                 }
//                                 type="number"
//                                 sx={{ width: 80, mr: 1 }}
//                               />
//                               <Select
//                                 value={product.discountType || "percentage"}
//                                 onChange={(e) =>
//                                   handleDiscountChange(
//                                     product.id,
//                                     product.discount || 0,
//                                     e.target.value as "percentage" | "fixed"
//                                   )
//                                 }
//                                 sx={{ width: 100, mr: 1 }}
//                               >
//                                 <MenuItem value="percentage">% Off</MenuItem>
//                                 <MenuItem value="fixed">Flat</MenuItem>
//                               </Select>
//                             </Box>
//                           ) : (
//                             <Button
//                               variant="outlined"
//                               onClick={() => toggleDiscountEditing(product.id)}
//                               sx={{ mr: 1 }}
//                             >
//                               Discount
//                             </Button>
//                           )}

//                           <IconButton
//                             onClick={() => handleRemoveProduct(product.id)}
//                           >
//                             <CancelIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => toggleProductExpansion(product.id)}
//                           >
//                             {expandedProducts[product.id] ? (
//                               <ExpandLessIcon />
//                             ) : (
//                               <ExpandMoreIcon />
//                             )}
//                           </IconButton>
//                         </Box>
//                         {expandedProducts[product.id] && (
//                           <Droppable
//                             droppableId={`variants-${product.id}`}
//                             type="variant"
//                           >
//                             {(provided) => (
//                               <Box
//                                 {...provided.droppableProps}
//                                 ref={provided.innerRef}
//                                 sx={{ ml: 4 }}
//                               >
//                                 {product.variants.map(
//                                   (variant, variantIndex) => (
//                                     <Draggable
//                                       key={variant.id.toString()}
//                                       draggableId={variant.id.toString()}
//                                       index={variantIndex}
//                                     >
//                                       {(provided) => (
//                                         <Box
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           sx={{
//                                             display: "flex",
//                                             alignItems: "center",
//                                             mb: 1,
//                                           }}
//                                         >
//                                           <DragIndicatorIcon sx={{ mr: 1 }} />
//                                           <Typography sx={{ flexGrow: 1 }}>
//                                             {variant.title}
//                                           </Typography>
//                                           <Typography sx={{ flexGrow: 1 }}>
//                                             {variant.price}
//                                           </Typography>
//                                           <IconButton
//                                             onClick={() =>
//                                               handleRemoveVariant(
//                                                 product.id,
//                                                 variant.id
//                                               )
//                                             }
//                                           >
//                                             <CancelIcon />
//                                           </IconButton>
//                                         </Box>
//                                       )}
//                                     </Draggable>
//                                   )
//                                 )}
//                                 {provided.placeholder}
//                               </Box>
//                             )}
//                           </Droppable>
//                         )}
//                       </Box>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </Box>
//             )}
//           </Droppable>
//         </DragDropContext>
//         <Button
//           color="success"
//           variant="outlined"
//           onClick={handleAddProduct}
//           sx={{ mt: 2 }}
//         >
//           Add Product
//         </Button>
//         <ProductPicker
//           open={isProductPickerOpen}
//           onClose={() => setIsProductPickerOpen(false)}
//           onProductSelect={handleProductSelect}
//         />
//       </Box>
//     </Card>
//   );
// };

// export default AddProductsPage;
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Card,
  Grid2,
} from "@mui/material";
import { message } from "antd"; // Import Ant Design message component
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ProductPicker from "../components/ProductPicker/ProductPicker";

interface Variant {
  id: string | number;
  product_id: string | number;
  title: string;
  price: string;
  inventory_quantity?: number;
}

interface Product {
  id: string | number;
  title: string;
  variants: Variant[];
  image: {
    id: string | number;
    product_id: string | number;
    src: string;
  };
  discount?: number;
  discountType?: "percentage" | "fixed";
  isDiscountEditing: boolean;
}

const AddProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<
    Record<string, boolean>
  >({});
  const [discountEditingProduct, setDiscountEditingProduct] = useState<
    string | number | null
  >(null);

  const handleAddProduct = () => {
    setIsProductPickerOpen(true);
  };

  const handleProductSelect = (selectedProducts: Product[]) => {
    // Check for duplicates
    const duplicateProduct = selectedProducts.some((selectedProduct) =>
      products.some(
        (existingProduct) => existingProduct.id === selectedProduct.id
      )
    );

    if (duplicateProduct) {
      // Show Ant Design message if the product already exists
      message.error("Product already exists!");
      return; // Exit without adding duplicate products
    }

    // Add new products
    setProducts([...products, ...selectedProducts]);
    setIsProductPickerOpen(false);
  };

  const toggleDiscountEditing = (productId: string | number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isDiscountEditing: !product.isDiscountEditing }
          : product
      )
    );
  };

  const handleDiscountChange = (
    productId: string | number,
    discount: number,
    discountType: "percentage" | "fixed"
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, discount, discountType }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId: string | number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleRemoveVariant = (
    productId: string | number,
    variantId: string | number
  ) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            variants: product.variants.filter(
              (variant) => variant.id !== variantId
            ),
          };
        }
        return product;
      })
    );
  };

  const toggleProductExpansion = (productId: string | number) => {
    setExpandedProducts((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "product") {
      const newProducts = Array.from(products);
      const [reorderedProduct] = newProducts.splice(source.index, 1);
      newProducts.splice(destination.index, 0, reorderedProduct);
      setProducts(newProducts);
    } else if (type === "variant") {
      const productId = source.droppableId.split("-")[1];
      const product = products.find((p) => p.id.toString() === productId);
      if (product) {
        const newVariants = Array.from(product.variants);
        const [reorderedVariant] = newVariants.splice(source.index, 1);
        newVariants.splice(destination.index, 0, reorderedVariant);
        setProducts(
          products.map((p) =>
            p.id.toString() === productId ? { ...p, variants: newVariants } : p
          )
        );
      }
    }
  };

  return (
    <Card sx={{ width: "70%" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Products
        </Typography>
        <Box sx={{ p: 3 }}>
          <Grid2 container spacing={3} justifyContent={"space-between"}>
            {" "}
            <Typography variant="h6" fontWeight={"bold"} gutterBottom>
              Products
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} gutterBottom justifyContent={"end"}>
              Discount
            </Typography>
          </Grid2>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="id" type="product">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {products.map((product, index) => (
                  <Draggable
                    key={product.id.toString()}
                    draggableId={product.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          mb: 2,
                          border: "1px solid #ccc",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Box {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                          </Box>
                          <Typography sx={{ flexGrow: 1 }}>
                            {index + 1}. {product.title}
                          </Typography>
                          {product.isDiscountEditing ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                                mb: 1,
                              }}
                            >
                              <TextField
                                value={product.discount || 0}
                                onChange={(e) =>
                                  handleDiscountChange(
                                    product.id,
                                    Number(e.target.value),
                                    product.discountType || "percentage"
                                  )
                                }
                                type="number"
                                sx={{ width: 80, mr: 1 }}
                              />
                              <Select
                                value={product.discountType || "percentage"}
                                onChange={(e) =>
                                  handleDiscountChange(
                                    product.id,
                                    product.discount || 0,
                                    e.target.value as "percentage" | "fixed"
                                  )
                                }
                                sx={{ width: 100, mr: 1 }}
                              >
                                <MenuItem value="percentage">% Off</MenuItem>
                                <MenuItem value="fixed">Flat</MenuItem>
                              </Select>
                            </Box>
                          ) : (
                            <Button
                              variant="outlined"
                              onClick={() => toggleDiscountEditing(product.id)}
                              sx={{ mr: 1 }}
                            >
                              Discount
                            </Button>
                          )}

                          <IconButton
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <CancelIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleProductExpansion(product.id)}
                          >
                            {expandedProducts[product.id] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>
                        {expandedProducts[product.id] && (
                          <Droppable
                            droppableId={`variants-${product.id}`}
                            type="variant"
                          >
                            {(provided) => (
                              <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{ ml: 4 }}
                              >
                                {product.variants.map(
                                  (variant, variantIndex) => (
                                    <Draggable
                                      key={variant.id.toString()}
                                      draggableId={variant.id.toString()}
                                      index={variantIndex}
                                    >
                                      {(provided) => (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1,
                                          }}
                                        >
                                          <DragIndicatorIcon sx={{ mr: 1 }} />
                                          <Typography sx={{ flexGrow: 1 }}>
                                            {variant.title}
                                          </Typography>
                                          <Typography sx={{ flexGrow: 1 }}>
                                            {variant.price}
                                          </Typography>
                                          <IconButton
                                            onClick={() =>
                                              handleRemoveVariant(
                                                product.id,
                                                variant.id
                                              )
                                            }
                                          >
                                            <CancelIcon />
                                          </IconButton>
                                        </Box>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                              </Box>
                            )}
                          </Droppable>
                        )}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          color="success"
          variant="outlined"
          onClick={handleAddProduct}
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
        <ProductPicker
          open={isProductPickerOpen}
          onClose={() => setIsProductPickerOpen(false)}
          onProductSelect={handleProductSelect}
        />
      </Box>
    </Card>
  );
};

export default AddProductsPage;
