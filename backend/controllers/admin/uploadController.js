const express = require('express');
const router = express.Router();

// Define a route for file upload
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  });