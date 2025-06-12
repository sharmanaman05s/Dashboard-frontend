import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Products() {
  // Sample data
  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: "$299.99",
      stock: 15,
      category: "Electronics",
      image: "https://placehold.co/300x200"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: "$49.99",
      stock: 30,
      category: "Accessories",
      image: "https://placehold.co/300x200"
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: "$129.99",
      stock: 20,
      category: "Electronics",
      image: "https://placehold.co/300x200"
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-[300px]"
          />
          <Button>Add Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4">{product.name}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{product.price}</span>
                <span className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products; 