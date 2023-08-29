import nodemailer from "nodemailer";
import mongoDb from "@/dbConfig/dbConfig";
import user from "@/models/user";
import bcryptjs from "bcryptjs";

mongoDb();

export const sendEmail = async function (email, emailType, userId) {
  const hashedToken = await bcryptjs.hash(userId.toString(), 10);
  try {
    if (emailType === "VERIFY") {
      const verifiedUser = await user.findByIdAndUpdate(userId, {
        verifiedToken: hashedToken,
        verifiedTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const verifiedUser = await user.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = await nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SANDBOX_USER,
        pass: process.env.SANDBOX_PASSWORD,
      },
    });

    const mailOptions = {
      from: "venkateshsundarasan@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "please verify your gmail"
          : "please reset the password",
      html: ` <p>
            Click
            <a href="${
              process.env.DOMAIN
            }/verifytoken?token=${hashedToken}">here</a>
            to ${
              emailType === "VERIFY"
                ? "please verify your gmail"
                : "please reset the password"
            }
          </p>`,
    };

    await transport.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
