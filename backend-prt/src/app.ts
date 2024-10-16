


// import cors from 'cors';
// import multer from 'multer';
// import path from 'path';
// import express, { Request, Response } from 'express';
// import { Client } from 'pg';
// import * as cloudinary from 'cloudinary';

// // Initialize the Express app
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: 'doq5fa0x8',   // Replace with your Cloudinary cloud name
//     api_key: '788363172224487', // Replace with your Cloudinary API key
//     api_secret: '1kM319V0UAvghlfXrL5ITrzUwdk' // Replace with your Cloudinary API secret
// });

// // PostgreSQL client setup
// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'blogging_db',
//     password: '123456789',
//     port: 5434,
// });

// client.connect();

// // Middleware for parsing JSON and URL-encoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://localhost:5173' })); // Adjusted to allow frontend requests

// // Configure multer disk storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for the images
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         const fileName = file.fieldname + '-' + uniqueSuffix + ext;
//         cb(null, fileName); // Set the new file name with date
//     }
// });

// const upload = multer({ storage: storage });

// // POST route to upload an image and save the blog
// app.post('/blog', upload.single('image'), async (req: express.Request, res: express.Response) => {
//     const { title, post, category } = req.body;

//     // Validate the required fields
//     if (!title || !post || !category) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     if (!req.file) {
//         return res.status(400).json({ error: 'Image file is required.' });
//     }

//     const imagePath = req.file.path; // Path to the uploaded file

//     try {
//         // Upload image to Cloudinary
//         const cloudinaryResult = await cloudinary.v2.uploader.upload(imagePath);

//         // Save the blog data along with the Cloudinary image URL
//         const result = await client.query(
//             'INSERT INTO blogs (title, image, post, category, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//             [title, cloudinaryResult.secure_url, post, category, new Date().toISOString()]
//         );
        
//         res.json({ data: result.rows[0] });
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Database error', details: (err as Error).message });
//     }
// });

// // GET route to retrieve all blogs
// app.get('/blog/all', async (req: Request, res: Response) => {
//     try {
//         const result = await client.query('SELECT * FROM blogs ORDER BY created_at DESC');
//         res.json({ data: result.rows });
//     } catch (err) {
//         console.error('Error executing query', (err as Error).stack);
//         res.status(500).json({ error: 'Database error', details: (err as Error).message });
//     }
// });



// // Express example
// router.get('/blog/:id', async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const blog = await BlogModel.findByPk(id);  // Find blog by primary key (ID)
//       if (!blog) {
//         return res.status(404).json({ message: 'Blog not found' });
//       }
//       res.json({ data: [blog] });
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       res.status(500).json({ message: 'Server error', error });
//     }
//   });
  
  

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import * as cloudinary from 'cloudinary';
 // Adjust the path as necessary
import { Client } from 'pg';

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: 'doq5fa0x8',
    api_key: '788363172224487',
    api_secret: '1kM319V0UAvghlfXrL5ITrzUwdk'
});

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'blogging_db',
    password: '123456789',
    port: 5434,
});

client.connect();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

// Define router
const router = express.Router();

// POST route to upload an image and save the blog
router.post('/blog', upload.single('image'), async (req: Request, res: Response) => {
    const { title, post, category } = req.body;

    if (!title || !post || !category) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required.' });
    }

    const imagePath = req.file.path;

    try {
        const cloudinaryResult = await cloudinary.v2.uploader.upload(imagePath);
        const result = await client.query(
            'INSERT INTO blogs (title, image, post, category, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, cloudinaryResult.secure_url, post, category, new Date().toISOString()]
        );

        res.json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Database error', details: (err as Error).message });
    }
});

// GET route to retrieve all blogs
router.get('/blog/all', async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM blogs ORDER BY created_at DESC');
        res.json({ data: result.rows });
    } catch (err) {
        console.error('Error executing query', (err as Error).stack);
        res.status(500).json({ error: 'Database error', details: (err as Error).message });
    }
});

// GET route to retrieve a blog by ID
router.get('/blog/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await client.query('SELECT * FROM blogs WHERE id = $1', [id]);
        const blog = result.rows[0]; // Get the first row
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ data: blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Use the router in the app
app.use(router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
