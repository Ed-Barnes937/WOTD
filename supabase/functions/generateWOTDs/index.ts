import { createClient } from "jsr:@supabase/supabase-js@2";
import OpenAI from "https://deno.land/x/openai@v4.55.4/mod.ts";
import { zodResponseFormat } from "https://deno.land/x/openai@v4.55.4/helpers/zod.ts";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const WordEntrySchema = z.object({
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  word: z.string().describe("The word being generated"),
  definition: z.string().describe("The definition of the generated word"),
  example_sentence: z
    .string()
    .describe("A short example sentence using the generated word"),
  synonyms: z
    .array(z.string())
    .describe("Three synonyms for the generated word"),
});

const WordResponseSchema = z.object({
  words: z.array(WordEntrySchema),
});

const difficultyPersonas = [
  "beginner: a beginner English speaker, typically a toddler",
  "intermediate: an intermediate English speaker, typically a pre-teen",
  "advanced: an advanced English speaker, typically young teenager",
  "expert: an expert English speaker, typically young adult onwards, aged 16+",
];

Deno.serve(async () => {
  try {
    const response = await openai.beta.chat.completions.parse({
      messages: [
        {
          role: "system",
          content:
            "You are an erudite assistant that generates a challenging word of the day for each of the given English speaking proficiency levels. Each word should be at the edge of what you'd expect a person of that level and age to know and should be returned in the given structure",
        },
        {
          role: "user",
          content: `${difficultyPersonas.join("\n")}`,
        },
      ],
      model: "gpt-4o-mini-2024-07-18",
      response_format: zodResponseFormat(WordResponseSchema, "generate_words"),
    });

    const message = response.choices[0].message;

    if (!message.parsed) {
      console.error("Parsing error:", content.error);
      return new Response(
        JSON.stringify({
          error: "Failed to parse OpenAI response",
          details: content.error.issues,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const wordResponse = message.parsed;

    const { words } = wordResponse;

    const insertPromises = words.map(({ synonyms, ...rest }) =>
      supabase.from("words").insert({ ...rest, alternatives: synonyms })
    );

    const results = await Promise.allSettled(insertPromises);

    const failedInserts = results.filter(
      (result) => result.status === "rejected"
    );

    if (failedInserts.length > 0) {
      console.error("Insertion errors:", failedInserts);
      return new Response(
        JSON.stringify({
          error: "Some words failed to insert",
          failedCount: failedInserts.length,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Words generated successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: "Unexpected error occurred",
        message: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
