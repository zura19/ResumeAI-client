import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
      <h3 className="mb-2 font-semibold text-foreground">
        Need a custom plan?
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Contact our sales team to discuss custom pricing, volume discounts, or
        enterprise features tailored to your organization.
      </p>
      <Link
        to="/contact"
        className="text-sm font-medium text-primary hover:underline"
      >
        Contact Sales →
      </Link>
    </div>
  );
}
