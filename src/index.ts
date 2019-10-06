import dotenv from 'dotenv';
import { runServer } from './server';

dotenv.config();

const port = process.env.PORT || 8000;

runServer(port);
