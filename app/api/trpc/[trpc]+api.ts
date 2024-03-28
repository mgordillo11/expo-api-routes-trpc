import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/api/context";
import { appRouter } from "@/server/api/root";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request, // Type assertion to match the expected type for fetchRequestHandler
    router: appRouter,
    createContext: () =>
      createContext({ req, res } as unknown as CreateNextContextOptions), // Type assertion to match the expected type for createContext
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
