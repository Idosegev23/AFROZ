const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, message, source } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create nodemailer transporter
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `יצירת קשר חדשה מאתר AFROZ - ${name}`,
            html: `
                <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3CAEA3; border-bottom: 2px solid #3CAEA3; padding-bottom: 10px;">
                        יצירת קשר חדשה מאתר AFROZ
                    </h2>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2C3E50; margin-top: 0;">פרטי המתעניין:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>שם:</strong> ${name}</li>
                            <li style="margin-bottom: 10px;"><strong>טלפון:</strong> ${phone}</li>
                            <li style="margin-bottom: 10px;"><strong>אימייל:</strong> ${email}</li>
                            <li style="margin-bottom: 10px;"><strong>מקור:</strong> ${source || 'טופס באתר'}</li>
                        </ul>
                    </div>
                    
                    ${message ? `
                        <div style="background: #fff; border-right: 4px solid #3CAEA3; padding: 15px; margin: 20px 0;">
                            <h3 style="color: #2C3E50; margin-top: 0;">הודעה:</h3>
                            <p style="line-height: 1.6; color: #555;">${message}</p>
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                        <p style="margin: 0; color: #2C8C83; font-weight: bold;">
                            ⏰ זמן קבלת הפנייה: ${new Date().toLocaleString('he-IL')}
                        </p>
                        <p style="margin: 10px 0 0 0; color: #666;">
                            💡 מומלץ ליצור קשר עם הלקוח בהקדם האפשרי
                        </p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully to:', process.env.EMAIL_USER);
        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
} 