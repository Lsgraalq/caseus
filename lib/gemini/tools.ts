import { calculateQuote, BriefState } from "../pricing";
import { createClient } from "../supabase/server";

export const geminiTools = [
  {
    functionDeclarations: [
      {
        name: "update_project_brief",
        description: "Updates the project brief with the current video options (duration, colorgrading, sfx, etc.), calculates the new price, and saves it. Always call this when the user changes requirements.",
        parameters: {
          type: "OBJECT",
          properties: {
            durationSeconds: { type: "INTEGER", description: "Estimated video duration in seconds" },
            deepColor: { type: "BOOLEAN", description: "True if deep colorgrading is requested" },
            advancedSfx: { type: "BOOLEAN", description: "True if advanced SFX is requested" },
            projectFiles: { type: "BOOLEAN", description: "True if DaVinci project files are requested" },
            expressDelivery: { type: "BOOLEAN", description: "True if express delivery is requested" },
          },
          required: ["durationSeconds", "deepColor", "advancedSfx", "projectFiles", "expressDelivery"],
        },
      },
      {
        name: "inspect_drive_link",
        description: "Inspects a provided drive link (Google Drive, Dropbox, etc.) to detect if the footage is RAW/Log format.",
        parameters: {
          type: "OBJECT",
          properties: {
            url: { type: "STRING", description: "URL to inspect" },
          },
          required: ["url"],
        },
      },
      {
        name: "register_b2b_client",
        description: "Registers a B2B client with their details and generates PDF documents (Contract/Invoice).",
        parameters: {
          type: "OBJECT",
          properties: {
            companyName: { type: "STRING", description: "Name of the company" },
            vatNumber: { type: "STRING", description: "VAT ID" },
            email: { type: "STRING", description: "Billing email" },
          },
          required: ["companyName", "email"],
        },
      },
    ],
  },
  {
    functionDeclarations: [
      {
        name: "register_account",
        description: "Registers a new user account with email and password using Supabase Auth. Use this when the user wants to save their progress and create an account.",
        parameters: {
          type: "OBJECT",
          properties: {
            email: { type: "STRING", description: "The user's email address" },
            password: { type: "STRING", description: "The user's password" },
          },
          required: ["email", "password"],
        },
      }
    ]
  }
];

export async function handleToolCall(
  name: string,
  args: any,
  projectId: string
) {
  const supabase = await createClient();

  switch (name) {
    case "update_project_brief": {
      const state: BriefState = {
        durationSeconds: args.durationSeconds,
        deepColor: args.deepColor,
        advancedSfx: args.advancedSfx,
        projectFiles: args.projectFiles,
        expressDelivery: args.expressDelivery,
      };

      const quote = calculateQuote(state);

      const upsells: string[] = [];
      if (args.deepColor) upsells.push("Глубокий покрас");
      if (args.advancedSfx) upsells.push("Саунд-дизайн");
      if (args.projectFiles) upsells.push("Исходники (DaVinci)");
      if (args.expressDelivery) upsells.push("Экспресс-доставка");

      const priceString = `${quote.durationString} — ${quote.totalPrice} €`;

      // Update in Supabase
      const { error } = await supabase
        .from("project_briefs")
        .update({
          duration_and_price: priceString,
          upsells: upsells,
          notes: JSON.stringify(quote.breakdown),
          // Additional metadata can be saved here
        })
        .eq("project_id", projectId);

      if (error) {
        console.error("Error updating brief in DB:", error);
        return { error: "Failed to update project brief" };
      }

      return {
        success: true,
        quote,
        updatedBrief: {
          durationAndPrice: priceString,
          upsells,
          autoDiscountMessage: quote.discountMessage
        }
      };
    }
    
    case "inspect_drive_link": {
      // Mock logic for drive inspection
      const isRaw = args.url.includes("raw") || Math.random() > 0.5;
      return {
        success: true,
        containsRawFootage: isRaw,
        message: isRaw 
          ? "Обнаружены RAW/Log файлы. Рекомендуется добавить 'Глубокий покрас'."
          : "Обычные файлы. Особый покрас может не требоваться."
      };
    }
    
    case "register_b2b_client": {
      // Mock registration
      return {
        success: true,
        company: args.companyName,
        message: "Клиент зарегистрирован. PDF документы сгенерированы и готовы к подписанию."
      };
    }

    case "register_account": {
      const { email, password } = args;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            project_id: projectId
          }
        }
      });

      if (error) {
        console.error("Error signing up user:", error);
        return { error: "Failed to register account: " + error.message };
      }

      // Here we might optionally link the anonymous project to the new user ID if we wait for them to confirm,
      // but if email confirmation is required, the user_id is created but the session isn't active yet.
      // We can update the project to set user_id now.
      if (data.user?.id) {
        await supabase
          .from("projects")
          .update({ user_id: data.user.id })
          .eq("id", projectId);
      }

      return {
        success: true,
        message: "Account registered successfully. Please check your email to confirm the account."
      };
    }

    default:
      return { error: "Unknown tool call" };
  }
}
