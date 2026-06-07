    import { useState } from "react";

    import {
    ShoppingCart,
    Search,
    Package,
    TrendingUp,
    Boxes,
    Plus,
    X,
    Trash2,
    } from "lucide-react";

    const products = [
    {
        id: 1,
        name: "HP EliteBook 840",
        category: "Laptops",
        price: 5200,
        stock: 12,
        image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    },

    {
        id: 2,
        name: "iPhone 14 Pro",
        category: "Phones",
        price: 9800,
        stock: 7,
        image:
        "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=1200&auto=format&fit=crop",
    },

    {
        id: 3,
        name: "Samsung Smart TV",
        category: "Electronics",
        price: 6700,
        stock: 5,
        image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
    },

    {
        id: 4,
        name: "PlayStation 5",
        category: "Gaming",
        price: 8500,
        stock: 4,
        image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
    },

    {
        id: 5,
        name: "AirPods Pro",
        category: "Accessories",
        price: 1800,
        stock: 20,
        image:
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1200&auto=format&fit=crop",
    },

    {
        id: 6,
        name: "MacBook Pro M3",
        category: "Laptops",
        price: 14500,
        stock: 3,
        image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    },
    ];

    export default function InventoryFlow() {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item, index) => index !== id));
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleMoMoPayment = () => {
        if (cart.length === 0) {
        alert("Your cart is empty");
        return;
        }

        alert(`MoMo Payment Successful!

    Amount Paid: GH₵ ${total}

    This is a demo payment system.
    No real charges will be made.

    Thank you for shopping with InventoryFlow.`);

        setCart([]);
        setCartOpen(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white">

        {/* CART SIDEBAR */}

        {cartOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md">

            <div className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-white dark:bg-[#09090b] border-l border-zinc-300 dark:border-zinc-800 p-8 overflow-y-auto">

                <div className="flex items-center justify-between mb-10">

                <div>
                    <h2 className="text-4xl font-medium tracking-tight">
                    Cart
                    </h2>

                    <p className="text-zinc-500 mt-2">
                    {cart.length} Items
                    </p>
                </div>

                <button
                    onClick={() => setCartOpen(false)}
                    className="bg-zinc-200 dark:bg-zinc-800 p-3 rounded-2xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                    <X />
                </button>

                </div>

                {/* EMPTY CART */}

                {cart.length === 0 && (
                <div className="text-center py-20">

                    <ShoppingCart
                    size={70}
                    className="mx-auto text-zinc-400 dark:text-zinc-700"
                    />

                    <h3 className="text-3xl font-medium tracking-tight mt-6">
                    Cart Empty
                    </h3>

                    <p className="text-zinc-500 mt-3">
                    Add products to continue
                    </p>

                </div>
                )}

                {/* CART ITEMS */}

                <div className="space-y-6">

                {cart.map((item, index) => (
                    <div
                    key={index}
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-5 flex gap-4"
                    >

                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-2xl"
                    />

                    <div className="flex-1">

                        <h3 className="text-xl font-medium tracking-tight">
                        {item.name}
                        </h3>

                        <p className="text-yellow-500 dark:text-yellow-400 mt-2">
                        GH₵ {item.price}
                        </p>

                        <button
                        onClick={() => removeFromCart(index)}
                        className="mt-4 text-red-400 flex items-center gap-2 hover:text-red-300 transition"
                        >
                        <Trash2 size={16} />
                        Remove
                        </button>

                    </div>

                    </div>
                ))}

                </div>

                {/* TOTAL */}

                {cart.length > 0 && (
                <div className="mt-10 border-t border-zinc-300 dark:border-zinc-800 pt-8">

                    <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-medium tracking-tight">
                        Total
                    </h3>

                    <h3 className="text-3xl font-medium tracking-tight text-yellow-500 dark:text-yellow-400">
                        GH₵ {total}
                    </h3>

                    </div>

                    <button
                    onClick={handleMoMoPayment}
                    className="w-full mt-8 bg-green-500 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/20 text-black py-5 rounded-2xl font-semibold text-lg transition-all duration-300"
                    >
                    Proceed To Payment
                    </button>

                </div>
                )}

            </div>

            </div>
        )}

        {/* HEADER */}

        <header className="border-b border-zinc-300 dark:border-zinc-800 sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#09090b]/80">

            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-medium tracking-tight">
                InventoryFlow
                </h1>

                <p className="text-zinc-500 text-sm mt-1">
                Smart Inventory Management
                </p>

            </div>

            {/* SEARCH */}

            <div className="relative hidden md:block">

                <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl pl-12 pr-5 py-3 w-[320px] outline-none focus:border-yellow-500 transition"
                />

            </div>

            {/* CART BUTTON */}

            <button
                onClick={() => setCartOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 hover:shadow-2xl hover:shadow-yellow-500/20 text-black px-5 py-3 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300"
            >

                <ShoppingCart size={20} />

                Cart ({cart.length})

            </button>

            </div>

        </header>

        {/* ANALYTICS */}

        <section className="px-6 py-16 border-b border-zinc-300 dark:border-zinc-800">

            <div className="max-w-7xl mx-auto">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">

                <div>

                <p className="text-3xl font-medium tracking-tight">
                    Inventory Analytics
                </p>

                <h2 className="text-5xl font-medium tracking-tight leading-tight mt-4">
                    Manage Products
                    <br />
                    Like A Modern Startup
                </h2>

                </div>

                <button
                onClick={() =>
                    alert(
                    "Cannot add any products right now.\n\nThis is just a demo inventory system."
                    )
                }
                className="bg-yellow-500 hover:bg-yellow-600 hover:shadow-2xl hover:shadow-yellow-500/20 text-black px-8 py-5 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300"
                >

                <Plus size={20} />

                Add New Product

                </button>

            </div>

            {/* STATS */}

            <div className="grid md:grid-cols-4 gap-6 mt-16">

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">

                <Package size={35} className="text-yellow-400" />

                <h3 className="text-4xl font-medium tracking-tight mt-6">
                    128
                </h3>

                <p className="text-zinc-500 mt-2">
                    Products
                </p>

                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">

                <TrendingUp size={35} className="text-green-400" />

                <h3 className="text-4xl font-medium tracking-tight mt-6">
                    32%
                </h3>

                <p className="text-zinc-500 mt-2">
                    Growth
                </p>

                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">

                <div className="text-blue-400 text-4xl font-bold">
                    ₵
                </div>

                <h3 className="text-4xl font-medium tracking-tight mt-6">
                    GH₵ 54K
                </h3>

                <p className="text-zinc-500 mt-2">
                    Revenue
                </p>

                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-8 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">

                <Boxes size={35} className="text-purple-400" />

                <h3 className="text-4xl font-medium tracking-tight mt-6">
                    17
                </h3>

                <p className="text-zinc-500 mt-2">
                    Categories
                </p>

                </div>

            </div>

            </div>

        </section>

        {/* PRODUCTS */}

        <section className="px-6 py-20">

            <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-12">

                <div>

                <p className="text-yellow-500 dark:text-yellow-400 font-semibold mb-3">
                    Product Inventory
                </p>

                <h2 className="text-3xl font-medium tracking-tight">
                    Products
                </h2>

                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-5 py-3 rounded-2xl text-zinc-600 dark:text-zinc-400">
                {filteredProducts.length} Products
                </div>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[32px] overflow-hidden hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all hover:-translate-y-2 duration-500"
                >

                    <div className="h-72 overflow-hidden">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />

                    </div>

                    <div className="p-8">

                    <div className="flex items-center justify-between">

                        <span className="bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm text-yellow-500 dark:text-yellow-400">
                        {product.category}
                        </span>

                        <span className="text-green-400 text-sm">
                        {product.stock} In Stock
                        </span>

                    </div>

                    <h3 className="text-3xl font-medium tracking-tight mt-6">
                        {product.name}
                    </h3>

                    <p className="text-2xl text-yellow-500 dark:text-yellow-400 font-semibold mt-4">
                        GH₵ {product.price}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 hover:shadow-2xl hover:shadow-yellow-500/20 text-black py-4 rounded-2xl font-semibold transition-all duration-300"
                    >
                        Add To Cart
                    </button>

                    </div>

                </div>
                ))}

            </div>

            </div>

        </section>

        {/* CHECKOUT */}

        <section className="px-6 pb-24">

            <div className="max-w-7xl mx-auto">

            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[40px] p-10 hover:border-yellow-500/20 transition duration-500">

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                <div>

                    <p className="text-yellow-500 dark:text-yellow-400 font-semibold mb-3">
                    Shopping Cart
                    </p>

                    <h2 className="text-5xl font-medium tracking-tight leading-tight">
                    Checkout
                    </h2>

                    <p className="text-zinc-500 mt-4 max-w-md leading-relaxed">
                    Complete your purchase securely using our integrated
                    Mobile Money payment experience.
                    </p>

                </div>

                <div>

                    <p className="text-zinc-500 mb-2">
                    Total Amount
                    </p>

                    <h2 className="text-5xl font-medium tracking-tight text-yellow-500 dark:text-yellow-400">
                    GH₵ {total}
                    </h2>

                </div>

                </div>

                <button
                onClick={handleMoMoPayment}
                className="w-full mt-10 bg-green-500 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/20 text-black py-5 rounded-2xl font-semibold text-xl transition-all duration-300"
                >
                Proceed To MoMo Payment
                </button>

            </div>

            </div>

        </section>

        </div>
    );
    }