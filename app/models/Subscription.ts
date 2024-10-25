import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  stripeCustomerId: String,
  stripePriceId: String,
  stripeSubscriptionId: String,
  status: String,
  searchCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);