import mongoose from 'mongoose';

const AnonymousSearchSchema = new mongoose.Schema({
  ip: String,
  searchCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AnonymousSearch || mongoose.model('AnonymousSearch', AnonymousSearchSchema);