"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
        user: "k.achoyan@geeklab.am",
        pass: "3745509XXXXachoyand8^",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export async function sendMail({ email, subject, text, html }) {

    const DEFAULT_RECEIVER = "your-email@example.com"; // Change this!

    if (!email) {
        console.error("Recipient email (sendTo) is missing!");
        return null;
    }

    try {
        await transporter.verify();
    } catch (error) {
        console.error("SMTP Connection Failed", error);
        return null;
    }

    try {
        const info = await transporter.sendMail({
            from: '"Your Name" <k.achoyan@geeklab.am>', // Change to match SMTP user
            to: email || DEFAULT_RECEIVER,
            subject: subject,
            text: text,
            html: html || "",
        });

        console.log("Email Sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Email Sending Failed", error);
        return null;
    }
}
