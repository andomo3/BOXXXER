// import { create } from 'zustand';
// import Constants from 'expo-constants';

// // --- Type Definitions ---
// // In a real app, this 'Item' type should live in a dedicated file like 'app/types/packing.ts'.
// // We are defining it here for now to get started quickly.
// export interface Item {
//   id: string;
//   name: string;
//   qty: number;
//   l: number; // length
//   w: number; // width
//   h: number; // height
//   fragile?: boolean;
// }

// // --- Store Shape (State and Actions) ---
// // This interface defines what our global store will hold.
// // It includes both the data (state) and the functions to manipulate it (actions).
// interface AppState {
//   // State
//   apiUrl: string;
//   items: Item[];

//   // Actions
//   addItem: (newItem: Item) => void;
//   removeItem: (itemId: string) => void;
//   updateItem: (updatedItem: Item) => void;
//   clearItems: () => void;
// }

// // --- Store Implementation ---
// // We use the 'create' function from Zustand to build our store.
// export const useAppStore = create<AppState>((set) => ({
//   // --- INITIAL STATE ---
//   // The API URL is read from the app's configuration, with a fallback.
//   apiUrl: Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8000',
//   // The list of items starts empty.
//   items: [],

//   // --- ACTIONS ---
//   // Actions are functions that receive the current state and return a new state.
//   // Zustand handles the re-rendering of components that use this state.

//   /**
//    * Adds a new item to the list.
//    * @param {Item} newItem - The item object to add.
//    */
//   addItem: (newItem) =>
//     set((state) => ({
//       items: [...state.items, newItem],
//     })),

//   /**
//    * Removes an item from the list by its ID.
//    * @param {string} itemId - The ID of the item to remove.
//    */
//   removeItem: (itemId) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.id !== itemId),
//     })),

//   /**
//    * Updates an existing item in the list.
//    * It finds the item by its ID and replaces it with the updated version.
//    * @param {Item} updatedItem - The item with updated properties.
//    */
//   updateItem: (updatedItem) =>
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === updatedItem.id ? updatedItem : item
//       ),
//     })),

//   /**
//    * Clears all items from the list, resetting it to an empty array.
//    */
//   clearItems: () => set({ items: [] }),
// }));
