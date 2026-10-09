import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/screens/main/Home/home.types";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                if (existingItem.quantity < action.payload.stock) {
                    existingItem.quantity += 1;
                }
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        }
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
