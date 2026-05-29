import type { Config } from "tailwindcss";
import sharedConfig from "@kodo/config/tailwind.config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
    content: [
        "./src/app/**/*.tsx",
        "./src/components/**/*.tsx",
        "../../packages/ui/src/**/*.tsx",
    ],
    presets: [sharedConfig],
};

export default config;
