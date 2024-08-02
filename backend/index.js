const express=require("express");
const cors=require('cors');
const path = require("path");
const mainrouter=require('./routes/index')
const app=express();
app.use(express.json());
app.use(cors());
app.use('/api/v1',mainrouter)
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(3000);