package com.mingxing.backend.service;

import com.mingxing.backend.dto.InquiryRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    private static final String RESEND_API_URL = "https://api.resend.com/emails";
    private static final String FROM_EMAIL = "Mingxing <onboarding@resend.dev>";
    private static final String ADMIN_EMAIL = "chanirub2003@gmail.com";

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendInquiryEmails(InquiryRequest request) {
        sendAdminEmail(request);
        sendCustomerEmail(request);
    }

    private void sendAdminEmail(InquiryRequest request) {
        String content = generateEmailBody(
                "New Inquiry Received",
                String.format("<p><strong>From:</strong> %s (%s)</p><p><strong>Message:</strong><br/>%s</p>",
                        request.getName(), request.getEmail(), request.getMessage()),
                request.getCart()
        );
        sendEmail(ADMIN_EMAIL, "New Inquiry: " + request.getName(), content);
        System.out.println("Admin email sent to " + ADMIN_EMAIL);
    }

    private void sendCustomerEmail(InquiryRequest request) {
        String content = generateEmailBody(
                "Thank You",
                String.format("<p>Dear %s,</p><p>We have received your inquiry. Our bespoke team will review your selection and get back to you shortly.</p>",
                        request.getName()),
                request.getCart()
        );
        sendEmail(request.getEmail(), "We received your inquiry - Mingxing", content);
        System.out.println("Customer email sent to " + request.getEmail());
    }

    private void sendEmail(String to, String subject, String htmlContent) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("from", FROM_EMAIL);
            body.put("to", List.of(to));
            body.put("subject", subject);
            body.put("html", htmlContent);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    RESEND_API_URL, HttpMethod.POST, entity, String.class);
            System.out.println("Resend response [" + to + "]: " + response.getStatusCode() + " " + response.getBody());
        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
            throw new RuntimeException("Email send failed: " + e.getMessage());
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
