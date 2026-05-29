import type { Config } from "tailwindcss";

const sharedConfig: Omit<Config, "content"> = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default sharedConfig;
