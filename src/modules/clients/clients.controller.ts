import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "@/db";
import { clientTable } from "@/db/schema/client";
import { eq } from "drizzle-orm";

export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "User authentication required" });
      return;
    }

    const clientData = req.body;

    const [newClient] = await db
      .insert(clientTable)
      .values({ ...clientData, user_id })
      .returning({ id: clientTable.id, name: clientTable.name, email: clientTable.email });

    res.status(StatusCodes.CREATED).json({
      message: "Client created successfully",
      client: newClient,
    });
  } catch (error) {
    console.error("Error creating client:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create client",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "User authentication required" });
      return;
    }

    const clientId = req.params.id;
    if (!(clientId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No client ID" });
      return;
    }

    const updateData = req.body;

    const [updatedClient] = await db
      .update(clientTable)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(clientTable.id, clientId))
      .returning({ id: clientTable.id, name: clientTable.name, email: clientTable.email });

    if (!updatedClient) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Client not found" });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Error updating client:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update client",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = req.params.id;

    if (!(clientId)) {
      res.status(400).json({ error: "No client ID" });
    }

    const existingClient = await db
      .select()
      .from(clientTable)
      .where(eq(clientTable.id, String(clientId)));

    if (!existingClient.length) {
      res.status(404).json({ error: "Client not found" });
    }

    await db.delete(clientTable).where(eq(clientTable.id, String(clientId)));

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

