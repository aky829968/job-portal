import express from "express";
import cookieParser from "cookie-parser";

const app = exxpress();

const port = 3000;

app.listen(port, () => {
  console.log(`Server started in ${port}`);
});
