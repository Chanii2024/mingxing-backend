package com.mingxing.backend.service;

import com.mingxing.backend.dto.InquiryRequest;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private static final String ADMIN_EMAIL = "chanirub2003@gmail.com";

    public void sendInquiryEmails(InquiryRequest request) {
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            sendAdminEmail(request);
            sendCustomerEmail(request);
        });
    }

    private void sendAdminEmail(InquiryRequest request) {
        String content = generateEmailBody(
                "New Inquiry Received",
                String.format("<p><strong>From:</strong> %s (%s)</p><p><strong>Message:</strong><br/>%s</p>",
                        request.getName(), request.getEmail(), request.getMessage()),
                request.getCart()
        );
        sendEmail(ADMIN_EMAIL, "New Inquiry: " + request.getName(), content, request.getEmail());
        System.out.println("Admin email sent to " + ADMIN_EMAIL);
    }

    private void sendCustomerEmail(InquiryRequest request) {
        String content = generateEmailBody(
                "Thank You",
                String.format("<p>Dear %s,</p><p>We have received your inquiry. Our bespoke team will review your selection and get back to you shortly.</p>",
                        request.getName()),
                request.getCart()
        );
        sendEmail(request.getEmail(), "We received your inquiry - Mingxing", content, null);
        System.out.println("Customer email sent to " + request.getEmail());
    }

    private void sendEmail(String to, String subject, String htmlContent, String replyTo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("Mingxing <" + fromEmail + ">");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            
            if (replyTo != null && !replyTo.isEmpty()) {
                helper.setReplyTo(replyTo);
            }

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }

    private String generateEmailBody(String title, String messageHtml, List<InquiryRequest.CartItem> cart) {
        StringBuilder cartHtml = new StringBuilder();
        double total = 0;

        if (cart != null && !cart.isEmpty()) {
            cartHtml.append("<table width='100%' cellpadding='0' cellspacing='0' style='margin-top: 20px; border-collapse: collapse;'>");

            for (InquiryRequest.CartItem item : cart) {
                String color = (item.getColor() != null && !item.getColor().isEmpty()) ? item.getColor() : "white";
                String imageUrl = String.format("https://mingxing-10d5f.web.app/t-shirts/%s/T-%d.png",
                        color, item.getProductId() != null ? item.getProductId() : 1);

                cartHtml.append("<tr>")
                        .append("<td width='120' style='padding: 15px 0; border-bottom: 1px solid #EAEAEA; vertical-align: top;'>");

                if (item.getProductId() != null) {
                    cartHtml.append(String.format(
                        "<img src='%s' alt='%s' width='100' style='display: block; border-radius: 4px;' />",
                        imageUrl, item.getName()
                    ));
                }

                cartHtml.append("</td>")
                        .append("<td style='padding: 15px 0 15px 20px; border-bottom: 1px solid #EAEAEA; vertical-align: top;'>")
                        .append(String.format("<div style='font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #2D2D2D;'>%s</div>", item.getName()))
                        .append(String.format("<div style='font-family: sans-serif; font-size: 12px; color: #888; margin-top: 5px;'>Color: %s</div>", color))
                        .append(String.format("<div style='font-family: sans-serif; font-size: 12px; color: #888;'>Price: %s</div>", item.getPrice()))
                        .append(String.format("<div style='font-family: sans-serif; font-size: 12px; color: #888;'>Quantity: %d</div>", item.getQuantity()))
                        .append("</td>")
                        .append("</tr>");

                try {
                    double price = Double.parseDouble(item.getPrice().replace("$", "").trim());
                    total += price * item.getQuantity();
                } catch (Exception ignored) {}
            }

            cartHtml.append("</table>");
            cartHtml.append(String.format(
                "<div style='text-align: right; margin-top: 20px; font-family: sans-serif; font-size: 16px; font-weight: bold; color: #2D2D2D;'>Total Estimated: $%.2f</div>",
                total
            ));
        }

        return String.format("""
                <!DOCTYPE html>
                <html>
                <head></head>
                <body style="margin:0;padding:0;font-family:Helvetica,sans-serif;background-color:#FDFBF7;">
                    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
                        <div style="background-color:#FDFBF7;padding:40px 20px;text-align:center;border-bottom:3px solid #EBB3B2;">
                            <div style="font-family:Georgia,serif;font-size:24px;letter-spacing:0.2em;text-transform:uppercase;color:#2D2D2D;font-weight:bold;">Mingxing</div>
                        </div>
                        <div style="padding:40px 30px;color:#4A4A4A;line-height:1.6;">
                            <h2 style="font-family:Georgia,serif;font-weight:400;font-style:italic;color:#2D2D2D;margin-top:0;">%s</h2>
                            %s
                            <hr style="border:0;border-top:1px solid #EAEAEA;margin:30px 0;"/>
                            <div style="font-family:sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#EBB3B2;margin-bottom:20px;">Your Selection</div>
                            %s
                        </div>
                        <div style="background-color:#2D2D2D;color:#FDFBF7;padding:30px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">
                            &copy; 2026 Mingxing Collection. All Rights Reserved.
                        </div>
                    </div>
                </body>
                </html>
                """, title, messageHtml, cartHtml.toString());
    }
}
