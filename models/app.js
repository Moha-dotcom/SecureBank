import { User } from './User.js';

import { connectDB } from '../config/db.js';



const db = await connectDB();
console.log(await db)