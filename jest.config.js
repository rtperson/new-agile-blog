module.exports = {
    roots: ["./src/server"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
