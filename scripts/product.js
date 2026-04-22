export let products = [];

export async function loaddata() {
    try {
        const res = await fetch("backend/products.json");

        if (!res.ok) {
            throw new Error("Failed to load products");
        }

        products = await res.json();
    } catch (error) {
        console.error("Error loading products:", error);
    }
}