import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    id: Number,
    nombre: Number,
    tirado: Date,
});

export default {
    materialSchema,
} as const;