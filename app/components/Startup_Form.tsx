"use client";

import React, { useState, useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formschema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/action";

async function createIdea(prevState: any, formData: FormData, pitch: string) {
  return { status: "SUCCESS" };
}

export const Startup_Form = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pitch, setPitch] = useState("");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formschema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch);
      await createIdea(prevState, formData, pitch);
      setToast({ message: "Submitted successfully!", type: "success" });

      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      setPitch("");

      setTimeout(() => setToast({ message: "", type: "" }), 3000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
      return { status: "SUCCESS", error: "" };
    } catch (error: any) {
      setToast({
        message: error.message || "Something went wrong",
        type: "error",
      });

      setTimeout(() => setToast({ message: "", type: "" }), 3000);

      return { status: "ERROR", error: error.message };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    status: "INITIAL",
    error: "",
  });

  return (
    <>
      {/* ---- Toast Message ---- */}
      {toast.message && (
        <div
          className={`p-3 mb-4 rounded-lg text-white font-semibold transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Startup Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder="Enter your startup title"
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 
            focus:border-pink-600 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Description
          </label>
          <input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            required
            placeholder="Enter description"
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 
            focus:border-pink-600 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            required
            placeholder="Enter category"
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 
            focus:border-pink-600 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Image URL
          </label>
          <input
            id="link"
            name="link"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="Enter image URL"
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 
            focus:border-pink-600 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Pitch (Markdown Editor) */}
        <div data-color-mode="light">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Pitch
          </label>
          <MDEditor value={pitch} onChange={(value) => setPitch(value || "")} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg 
          hover:bg-pink-700 transition"
        >
          {isPending ? "Submitting..." : "Submit Idea"}
        </button>
      </form>
    </>
  );
};
