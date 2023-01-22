import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

// Singleton pattern
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIP_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;
