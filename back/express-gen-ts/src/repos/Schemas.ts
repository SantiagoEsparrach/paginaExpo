import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    tirado: Date,
});

export default {
    materialSchema,
} as const;