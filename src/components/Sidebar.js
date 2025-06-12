import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/orders") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/products") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              to="/customers"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/customers") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              to="/analytics"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/analytics") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 