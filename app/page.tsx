"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, X, Star, Utensils, GlassWater, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Datos de productos (sin cambios)
const menuItems = [
    { id: 1, nombre: "Taco al pastor", precio: 15, imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.unileversolutions.com%2Frecipes-v2%2F236509.jpg&f=1&nofb=1&ipt=8e8511e68ad4978ec7b77299b94a7e44c3e2a259aa324f12fba12041008fb5bb", categoria: "tacos" },
    { id: 2, nombre: "Taco de bistec", precio: 18, imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftacoguy.com.au%2Fwp-content%2Fuploads%2F2021%2F08%2FTacos-de-bistec-main-e1628667202336-1.jpg&f=1&nofb=1&ipt=6ab0a065e8e0596629609d0bffae3ad7dcb902d2ae618d117137d8bfe18f2ef9", categoria: "tacos" },
    { id: 3, nombre: "Taco de barbacoa", precio: 20, imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.amigofoods.com%2Fwp-content%2Fuploads%2F2020%2F12%2Ftacos-de-barbacoa.jpg&f=1&nofb=1&ipt=9063a938b1431c7f3e44d87a0572d77bf80ebbfb9572e795d24f2fc48ad5eccb", categoria: "tacos" },
    { id: 4, nombre: "Taco vegetariano", precio: 12, imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", categoria: "tacos" },
    { id: 5, nombre: "Agua de Horchata", precio: 25, imagen: "https://stretchrecipes.com/wp-content/uploads/2025/03/9.-Horchata-Margarita.jpg", categoria: "bebidas" },
    { id: 6, nombre: "Coca-Cola", precio: 20, imagen: "https://images.getbento.com/accounts/cbf932b4583f16a6c84f37a989386a04/media/images/42513mediaIMG_0632.jpg?w=1200&fit=max&auto=compress,format&cs=origin", categoria: "bebidas" },
];

const categorias = ["Popular", "Tacos", "Bebidas"];
const categoriaIcono: { [key: string]: JSX.Element } = {
    Popular: <Star className="w-5 h-5 mr-2" />,
    Tacos: <Utensils className="w-5 h-5 mr-2" />,
    Bebidas: <GlassWater className="w-5 h-5 mr-2" />,
};

// --- Componente ProductCard ---
const ProductCard = ({ product, addToCart }: { product: any, addToCart: (product: any, options?: any) => void }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [cebolla, setCebolla] = useState(true);
    const [cilantro, setCilantro] = useState(true);

    const handleAddToCart = () => {
        addToCart(product, { cebolla, cilantro });
        setOpenDialog(false);
    };

    const isTaco = product.categoria === 'tacos';

    return (
        <Card className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800">
            <img src={product.imagen} alt={product.nombre} className="w-full h-40 object-cover" />
            <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex-grow">{product.nombre}</h3>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-red-600">${product.precio}</span>
                    {isTaco ? (
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 text-white"><ShoppingCart className="w-5 h-5 mr-2" /> Agregar</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                <DialogHeader>
                                    <DialogTitle>Personalizar {product.nombre}</DialogTitle>
                                    <DialogDescription className="text-gray-600 dark:text-gray-400">Selecciona los ingredientes para tu taco.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="cebolla" checked={cebolla} onCheckedChange={(checked) => setCebolla(!!checked)} />
                                        <label htmlFor="cebolla" className="text-sm font-medium">Cebolla</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="cilantro" checked={cilantro} onCheckedChange={(checked) => setCilantro(!!checked)} />
                                        <label htmlFor="cilantro" className="text-sm font-medium">Cilantro</label>
                                    </div>
                                </div>
                                <Button onClick={handleAddToCart} className="w-full bg-red-500 hover:bg-red-600 rounded-full py-2 text-white"><ShoppingCart className="w-5 h-5 mr-2" /> Agregar al Carrito</Button>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <Button onClick={() => addToCart(product)} className="bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 text-white"><ShoppingCart className="w-5 h-5 mr-2" /> Agregar</Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

// --- Componente CartItem ---
const CartItem = ({ item, updateQuantity, removeFromCart }: { item: any, updateQuantity: (uniqueId: string, newQuantity: number) => void, removeFromCart: (uniqueId: string) => void }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
            <img src={item.imagen} alt={item.nombre} className="w-16 h-16 rounded-md object-cover" />
            <div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{item.nombre}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">${item.precio.toFixed(2)}</p>
                {item.uniqueId.includes('_') && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cebolla: {item.cebolla ? "Sí" : "No"}, Cilantro: {item.cilantro ? "Sí" : "No"}
                    </p>
                )}
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)} className="w-8 h-8 p-0 rounded-full"><Minus className="w-4 h-4" /></Button>
            <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
            <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)} className="w-8 h-8 p-0 rounded-full"><Plus className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.uniqueId)} className="w-8 h-8 p-0 rounded-full text-red-500 hover:bg-red-100"><X className="w-4 h-4" /></Button>
        </div>
    </motion.div>
);

// --- Componente Principal ClienteApp ---
export default function ClienteApp() {
    const [cart, setCart] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product: any, options: any = {}) => {
        setCart(prevCart => {
            const isTaco = product.categoria === 'tacos';
            const uniqueId = isTaco ? `${product.id}_${options.cebolla}_${options.cilantro}` : `${product.id}`;
            const existingItem = prevCart.find(item => item.uniqueId === uniqueId);

            if (existingItem) {
                return prevCart.map(item =>
                    item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1, ...options, uniqueId }];
        });
    };

    const updateQuantity = (uniqueId: string, newQuantity: number) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.uniqueId !== uniqueId);
            }
            return prevCart.map(item =>
                item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const removeFromCart = (uniqueId: string) => {
        setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
    };

    const getPopularItems = () => menuItems.slice(0, 4);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <div className="container mx-auto p-4 md:p-6 space-y-6">
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <img src="https://logodownload.org/wp-content/uploads/2019/09/don-chuy-logo.png" alt="Taquería Don Chuy Logo" className="h-12" />
                    <div className="flex items-center gap-4">
                        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} variant="ghost" className="rounded-full w-10 h-10 p-0">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="relative rounded-full w-10 h-10 p-0">
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartItemCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs p-1">{cartItemCount}</Badge>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white dark:bg-gray-900">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Mi Carrito</DialogTitle>
                                    <DialogDescription>Revisa tu pedido antes de finalizar.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 max-h-80 overflow-y-auto p-1">
                                    <AnimatePresence>
                                        {cart.length > 0 ? cart.map(item => (
                                            <CartItem key={item.uniqueId} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                                        )) : <p className="text-center text-gray-500 py-8">Tu carrito está vacío.</p>}
                                    </AnimatePresence>
                                </div>
                                {cart.length > 0 && (
                                    <div className="flex justify-between items-center border-t pt-4 mt-4">
                                        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                                        <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full" onClick={() => alert("¡Pedido realizado!")}>Realizar Pedido</Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </header>

                <Tabs defaultValue="Popular" className="w-full">
                    <TabsList>
                        {categorias.map(cat => (
                            <TabsTrigger key={cat} value={cat}>
                                <div className="flex items-center">{categoriaIcono[cat]} {cat}</div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="Popular">
                        <div className="pt-4 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Los Más Populares</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {getPopularItems().map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Tacos">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                            {menuItems.filter(item => item.categoria === "tacos").map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="Bebidas">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                            {menuItems.filter(item => item.categoria === "bebidas").map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
