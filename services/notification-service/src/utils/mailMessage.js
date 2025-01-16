exports.signUpTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Signing Up</title>
    <style>
        /* Reset styles */
        body, p {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        /* Content */
        .content {
            padding-bottom: 20px;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding-top: 20px;
        }

        .footer p {
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Signing Up</h1>
        </div>

        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for signing up with our service. We are thrilled to have you on board!</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        </div>

        <div class="footer">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
