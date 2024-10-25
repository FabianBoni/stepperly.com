import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../lib/mongodb";
import Subscription from "../models/Subscription";

export async function checkSubscriptionStatus(request: NextRequest) {
  const { userId } = getAuth(request);
  
  if (!userId) {
    return false;
  }

  await connectDB();
  const subscription = await Subscription.findOne({ 
    userId,
    status: "active"
  });

  return !!subscription;
}