const express = require("express");
const app = express();
const PORT = 3000;

const cache = {};

const MAX_CACHE_SIZE = 10;

app.use(express.json());

// to add cache data:
app.post("/cache", (req, res) => {
  const { key, value } = req.body;

  if (!key || value == undefined) {
    return res.status(400).json({ error: `key and the value are required` });
  }

  if (Object.keys(cache).length >= MAX_CACHE_SIZE) {
    return res
      .status(400)
      .json({ error: `cache is full. cannot store more items` });
  }

  cache[key] = value;
  res.status(200).json({ message: `cache is updated successfully` });
});

// to get cache data:
app.get("/cache/:key", (req, res) => {
  const { key } = req.params;

  if (cache[key]) {
    return res.status(200).json({ key, value: cache[key] });
  } else {
    return res.status(404).json({ error: "key is not found" });
  }
});

// to delete cache data:
app.delete("/cache/:key", (req, res) => {
  const { key } = req.params;

  if (cache[key]) {
    delete cache[key];
    return res.status(200).json({ message: `${key} is deleted succussfully` });
  } else {
    return res.status(400).json({ message: `${key} is not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
