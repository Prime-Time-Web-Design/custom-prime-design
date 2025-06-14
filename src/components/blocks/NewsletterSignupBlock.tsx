import React, { useState } from "react";
import type { PageBlocksNewsletterSignupBlock } from "../../../tina/__generated__/types";

interface NewsletterSignupBlockProps {
  data: PageBlocksNewsletterSignupBlock;
  className?: string;
}

export const NewsletterSignupBlock: React.FC<NewsletterSignupBlockProps> = ({
  data,
  className,
}) => {
  const {
    title = "Sign up for our email newsletter",
    description = "Sign up for free and stay up to date on research advancements, mental health tips, mental health in the news, and expertise on managing mental health.",
  } = data;

  // Using hardcoded colors to match the image exactly
  const backgroundColor = "bg-accent"; // Deep navy background
  const textColor = "text-text";
  const buttonBgColor = "bg-bg-contrast-light"; // Light purple button
  const buttonTextColor = "text-[#252042]"; // Dark text on button

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would integrate with your newsletter service
      // Example: await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setEmail("");
    } catch {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${backgroundColor} ${textColor} py-8 md:py-16 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 space-y-3 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-sm md:text-base opacity-90">{description}</p>
          </div>

          {/* Right side - Signup form */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            {isSubmitted ? (
              <div className="text-center p-6 bg-opacity-10 bg-white rounded-lg">
                <div className="text-xl font-bold mb-2">Thank you!</div>
                <p>You have been successfully subscribed to our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div className="flex flex-row w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-grow rounded-l-lg px-4 py-3 text-text
                              focus:outline-none focus:outline-2 focus:outline-bg-contrast-light bg-bg border-2 border-t-bg-contrast-light border-l-bg-contrast-light border-b-bg-contrast-light"
                    aria-label="Email address"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${buttonBgColor} ${buttonTextColor} rounded-r-lg 
                                px-6 py-4 font-medium transition-colors hover:bg-opacity-90 
                                focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-purple-300`}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                {error && <p className="text-red-300 text-sm">{error}</p>}
                <p className="text-xs opacity-80">
                  You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupBlock;
