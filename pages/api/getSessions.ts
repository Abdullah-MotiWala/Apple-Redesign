import { Stripe as StripType } from "@stripe/stripe-js";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripe: StripType = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = req.query.session_id as string;

  const session = (await stripe.checkout.sessions.listLineItems(
    sessionId
  )) as any;

  res.status(200).json({ session });
}