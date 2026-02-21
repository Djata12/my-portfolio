    import React, { useState } from 'react';
    import { Package, AlertTriangle, TrendingUp, Search, Plus, MoreVertical, Filter, AlertCircle } from 'lucide-react';

    const InventoryDashboard = () => {
    // 1. ORIGINAL DATA
    const initialProducts = [
        { id: 1, name: "Samsung Galaxy S23", category: "Electronics", stock: 12, price: 8500, status: "In Stock" },
        { id: 2, name: "Organic Shea Butter (5kg)", category: "Cosmetics", stock: 3, price: 450, status: "Low Stock" },
        { id: 3, name: "Bolga Straw Hat", category: "Fashion", stock: 0, price: 120, status: "Out of Stock" },
        { id: 4, name: "Dell Latitude 7490", category: "Computing", stock: 8, price: 4200, status: "In Stock" },
        { id: 5, name: "Local Rice (50kg)", category: "Food", stock: 25, price: 650, status: "In Stock" },
    ];

    // 2. REACT STATE: This tracks what the user is typing
    const [searchTerm, setSearchTerm] = useState("");
    
    const [showAlert, setShowAlert] = useState(false);
    const handleAddClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        };

    // 3. FILTER LOGIC: This runs every time 'searchTerm' changes
    const filteredProducts = initialProducts.filter((product) => {
        const searchLower = searchTerm.toLowerCase();
        return (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
            <p className="text-gray-500">Managing stock for Benjamin's Accra Storefront</p>
            </div>
            <button 
                onClick={handleAddClick}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
            <Plus size={20} /> Add New Product
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard icon={<Package className="text-blue-600" />} label="Total Products" value={initialProducts.length} />
            <StatCard icon={<AlertTriangle className="text-amber-500" />} label="Low Stock Alerts" value="1" />
            <StatCard icon={<TrendingUp className="text-emerald-500" />} label="Monthly Sales" value="GHS 24,500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between">
            
            {/* 4. THE SEARCH INPUT: Connected to React State */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                type="text" 
                placeholder="Search by product name or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Updates state on every keystroke
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
            </div>

            <div className="text-sm text-gray-500 flex items-center">
                Showing {filteredProducts.length} results
            </div>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Price (GHS)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {/* 5. DYNAMIC RENDERING: Mapping over the FILTERED list */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-gray-600">{item.category}</td>
                        <td className="px-6 py-4 text-gray-600">{item.stock}</td>
                        <td className="px-6 py-4 text-gray-600">{item.price.toLocaleString()}</td>
                        <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                        <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                        No products found matching "{searchTerm}"
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        {showAlert && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <AlertCircle className="text-amber-400" size={20} />
            <span className="font-medium text-sm">Demo Mode: Database write access is restricted.</span>
            </div>
        )}
        </div>
    );
    };
    


    const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
    );

    const StatusBadge = ({ status }) => {
    const styles = {
        "In Stock": "bg-emerald-100 text-emerald-700",
        "Low Stock": "bg-amber-100 text-amber-700",
        "Out of Stock": "bg-rose-100 text-rose-700",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {status}
        </span>
    );
    };

    export default InventoryDashboard;