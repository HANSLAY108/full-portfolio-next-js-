import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message is too short"),
});

// Simple in-memory rate limiting (Note: will reset on redeploy/serverless spin down)
const rateLimit = new Map<string, number>();

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'anonymous';
        const now = Date.now();
        const lastAttempt = rateLimit.get(ip) || 0;

        if (now - lastAttempt < 60000) { // 1 minute limit per IP
            return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
        }

        const body = await request.json();
        const validated = contactSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { name, email, subject, message } = validated.data;

        // 1. Store in Database
        await prisma.contactMessage.create({
            data: { name, email, subject, message }
        });

        // 2. Send Email via Resend
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
                to: process.env.EMAIL_TO || 'tohhanslay@gmail.com',
                subject: `New Portfolio Contact Message: ${subject || 'No Subject'}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #160e3a;">
                        <h2 style="color: #7c5ef0;">New Message from Portfolio</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p style="font-size: 11px; color: #6b64a8;">Sent At: ${new Date().toLocaleString()}</p>
                    </div>
                `,
            });
        }

        rateLimit.set(ip, now);

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
