"use client";

import { FormEvent, useState } from "react";

import { submitContact } from "@/lib/api";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitContact({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("success");
      setMessage("Thank you! Your enquiry has been submitted.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="section-label mb-4">Enquiry / Contact</h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-[15px] border border-black bg-gray-100 p-4 md:grid-cols-2 md:p-6"
        >
          <label className="flex flex-col gap-1 text-xs md:text-sm">
            Name
            <input
              name="name"
              required
              className="rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-modha-green"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs md:text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              className="rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-modha-green"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs md:text-sm">
            Phone
            <input
              name="phone"
              type="tel"
              className="rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-modha-green"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs md:text-sm md:col-span-2">
            Message
            <textarea
              name="message"
              required
              rows={4}
              className="rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-modha-green"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-[15px] bg-modha-green px-6 py-2.5 text-sm text-white transition hover:bg-modha-green-dark disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Submit Enquiry"}
            </button>
            {message && (
              <p
                className={`mt-2 text-xs md:text-sm ${
                  status === "success" ? "text-modha-green" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
