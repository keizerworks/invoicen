import { Request, Response } from 'express';
import { userTable } from '@/db/schema/user';
import { organizationTable } from '@/db/schema/organization';
import {
  postUpdateUserProfileBody,
  postUpdateUserOrganizationBody,
} from './user.schema';
import { eq } from 'drizzle-orm/sql';
import db from '@/db';


export async function getUserOrganization(req: Request, res: Response): Promise<void> { 
    try {
        const user_id = (req as any).user?.id;
        if (!user_id) {
         res.status(401).json({ message: 'User authentication required' });
        }

        const organization = await db
            .select({
                id: organizationTable.id,
                name: organizationTable.name,
                slug: organizationTable.slug,
                logo_url: organizationTable.logo_url,
                tax_id: organizationTable.tax_id,
                address: organizationTable.address,
                phone: organizationTable.phone,
            })
            .from(organizationTable)
            .where(eq(organizationTable.user_id, user_id))
            .then((rows) => rows[0]);

        if (!organization) {
             res.status(404).json({ message: 'No organization found' });
        }

         res.status(200).json({ organization });
    } catch (error) {
        console.error('Error getting organization:', error);
         res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getUserProfile(req: Request, res: Response): Promise<void> { 
    try {
        const user_id = (req as any).user?.id;
        if (!user_id) {
             res.status(401).json({ message: 'User authentication required' });
        }

        const user = await db
            .select({
                id: userTable.id,
                name: userTable.name,
                email: userTable.email,
            })
            .from(userTable)
            .where(eq(userTable.id, user_id))
            .then((rows) => rows[0]); // Extract the first result

        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }

         res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user profile:', error);
         res.status(500).json({ message: 'Internal server error' });
    }
}

export async function userProfileUpdate(
  req: Request<{}, {}, postUpdateUserProfileBody>,
  res: Response
) {
  try {
    const { name } = req.body;
    const user_id = req.user?.id;
    if (!user_id) {
      res.status(401).json({ message: 'User authentication required' });
      return;
    }
    const [updatedUser] = await db
      .update(userTable)
      .set({ name, updated_at: new Date() })
      .where(eq(userTable.id, user_id))
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
      });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
}

export async function userOrganizationUpdate(
  req: Request<{ id: string }, {}, postUpdateUserOrganizationBody>,
  res: Response
) {
  try {
    const updateData = req.body;
    const organization_id = req.params?.id;
    const [updatedOrganization] = await db
      .update(organizationTable)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(organizationTable.id, organization_id))
      .returning({
        id: organizationTable.id,
        name: organizationTable.name,
        logo_url: organizationTable.logo_url,
        tax_id: organizationTable.tax_id,
        address: organizationTable.address,
        phone: organizationTable.phone,
      });

    if (!updatedOrganization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    res.status(200).json({
      message: 'Organization updated successfully',
      organization: updatedOrganization,
    });
  } catch (error) {
    console.error('Error updating organization:', error);
  }
}
