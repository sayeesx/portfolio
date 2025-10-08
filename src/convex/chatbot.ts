"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = action({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    try {
      const response = await fetch("https://chatbot-4cn8.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();
      return {
        success: true,
        response: data.response || data.message || "Sorry, I couldn't process that request.",
      };
    } catch (error) {
      return {
        success: false,
        response: "Sorry, the chatbot server is currently unavailable. Please try again later.",
      };
    }
  },
});

export const checkHealth = action({
  args: {},
  handler: async (ctx) => {
    try {
      const response = await fetch("https://chatbot-4cn8.onrender.com/api/health", {
        method: "GET",
      });

      if (!response.ok) {
        return { online: false };
      }

      const data = await response.json();
      return {
        online: data.status === "healthy" || data.bot_initialized === true,
      };
    } catch (error) {
      return { online: false };
    }
  },
});
