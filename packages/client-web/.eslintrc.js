module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["*/*/modules/*/*"],
            message: "Import from modules/ instead.",
          },
        ],
      },
    ],
  },
};
