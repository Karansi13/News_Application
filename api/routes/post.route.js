// import express from 'express';
// import { verifyToken } from '../utils/verifyUser.js';
// import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';

// const router = express.Router();

// router.post('/create', verifyToken, create)
// router.get('/getposts', getposts)
// router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
// router.put('/updatepost/:postId/:userId', verifyToken, updatepost)



// export default router;

import express from 'express';
import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', verifyToken, upload.fields([{ name: 'image' }, { name: 'video' }]), create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, upload.fields([{ name: 'image' }, { name: 'video' }]), updatepost);


export default router;
