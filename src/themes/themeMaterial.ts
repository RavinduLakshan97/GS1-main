export const getThemeMaterial = (mode: "light" | "dark") => ({
  button: {
    defaultProps: {
      color: mode === "dark" ? "blue-gray" : "light-blue",
    },
  },
  navbar: {
    styles: {
      base: {
        background: mode === "dark" ? "bg-gray-900" : "bg-white",
        text: mode === "dark" ? "text-white" : "text-gray-900",
      },
    },
  },
  typography: {
    defaultProps: {
      color: mode === "dark" ? "white" : "gray-900",
    },
  },
});
