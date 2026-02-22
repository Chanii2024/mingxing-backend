package com.mingxing.backend.service;

import com.mingxing.backend.dto.InquiryRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String adminEmail;

    // Path to the assets folder, relative to the backend working directory
    // Backend runs from: c:\Work - Chanii\Projects\Mingxing Cute\backend
    // Assets are at:     c:\Work - Chanii\Projects\Mingxing Cute\src\assets
    private static final String ASSETS_PATH = "../src/assets/";

    public void sendInquiryEmails(InquiryRequest request) throws MessagingException {
        sendAdminEmail(request);
        sendCustomerEmail(request);
    }

    private void sendAdminEmail(InquiryRequest request) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(adminEmail);
        helper.setTo(adminEmail);
        helper.setSubject("New Inquiry: " + request.getName());

        String content = generateEmailBody(
                "New Inquiry Received",
                String.format("<p><strong>From:</strong> %s (%s)</p><p><strong>Message:</strong><br/>%s</p>",
                        request.getName(), request.getEmail(), request.getMessage()),
                request.getCart()
        );

        helper.setText(content, true);
        try { attachImages(helper, request.getCart()); } catch (Exception e) {
            System.err.println("Image attach skipped (admin): " + e.getMessage());
        }
        javaMailSender.send(message);
        System.out.println("Admin email sent to " + adminEmail);
    }

    private void sendCustomerEmail(InquiryRequest request) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(adminEmail);
        helper.setTo(request.getEmail());
        helper.setSubject("We received your inquiry - Mingxing");

        String content = generateEmailBody(
                "Thank You",
                String.format("<p>Dear %s,</p><p>We have received your inquiry. Our bespoke team will review your selection and get back to you shortly.</p>",
                        request.getName()),
                request.getCart()
        );

        helper.setText(content, true);
        try { attachImages(helper, request.getCart()); } catch (Exception e) {
            System.err.println("Image attach skipped (customer): " + e.getMessage());
        }
        javaMailSender.send(message);
        System.out.println("Customer email sent to " + request.getEmail());
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

    private void attachImages(MimeMessageHelper helper, List<InquiryRequest.CartItem> cart) {
        if (cart == null) return;

        for (InquiryRequest.CartItem item : cart) {
            if (item.getProductId() == null) continue;

            String contentId = "img-product-" + item.getProductId();
            String fileName = "T-" + item.getProductId() + ".png";

            // Determine directory based on color if available, default to White or generic
            String subDir = "";
            if ("black".equalsIgnoreCase(item.getColor())) {
                subDir = "T-Shirt-Black/";
            } else if ("white".equalsIgnoreCase(item.getColor())) {
                subDir = "T-Shirt-White/";
            }

            File imageFile = new File(ASSETS_PATH + subDir + fileName);

            // Fallback checks
            if (!imageFile.exists()) {
                imageFile = new File(ASSETS_PATH + "T-Shirt-White/" + fileName);
            }
            if (!imageFile.exists()) {
                imageFile = new File(ASSETS_PATH + "T-Shirt-Black/" + fileName);
            }
            if (!imageFile.exists()) {
                imageFile = new File(ASSETS_PATH + "Honoring the Craft/" + fileName);
            }
            if (!imageFile.exists()) {
                imageFile = new File(ASSETS_PATH + fileName);
            }

            if (imageFile.exists()) {
                try {
                    byte[] compressedBytes = compressImage(imageFile, 200, 0.8f);
                    org.springframework.core.io.ByteArrayResource imageResource =
                        new org.springframework.core.io.ByteArrayResource(compressedBytes);
                    helper.addInline(contentId, imageResource, "image/jpeg");
                    System.out.println("Embedded " + fileName + " (" + (compressedBytes.length / 1024) + "KB compressed)");
                } catch (Exception e) {
                    System.err.println("FAILED to embed " + fileName + ": " + e.getMessage());
                }
            } else {
                System.err.println("File NOT FOUND: " + imageFile.getAbsolutePath());
            }
        }
    }

    /**
     * Resize and compress an image to JPEG.
     * @param file     The source image file
     * @param maxWidth Target max width in pixels
     * @param quality  JPEG quality (0.0 - 1.0)
     */
    private byte[] compressImage(File file, int maxWidth, float quality) throws Exception {
        java.awt.image.BufferedImage original = javax.imageio.ImageIO.read(file);

        // Calculate new dimensions maintaining aspect ratio
        int origWidth = original.getWidth();
        int origHeight = original.getHeight();
        int newWidth = Math.min(origWidth, maxWidth);
        int newHeight = (int) ((double) origHeight / origWidth * newWidth);

        // Resize
        java.awt.image.BufferedImage resized = new java.awt.image.BufferedImage(newWidth, newHeight, java.awt.image.BufferedImage.TYPE_INT_RGB);
        java.awt.Graphics2D g = resized.createGraphics();
        g.setRenderingHint(java.awt.RenderingHints.KEY_INTERPOLATION, java.awt.RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(java.awt.RenderingHints.KEY_RENDERING, java.awt.RenderingHints.VALUE_RENDER_QUALITY);
        g.setColor(java.awt.Color.WHITE); // Fill background for PNG transparency
        g.fillRect(0, 0, newWidth, newHeight);
        g.drawImage(original, 0, 0, newWidth, newHeight, null);
        g.dispose();

        // Compress to JPEG
        java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
        javax.imageio.stream.ImageOutputStream ios = javax.imageio.ImageIO.createImageOutputStream(baos);
        javax.imageio.ImageWriter writer = javax.imageio.ImageIO.getImageWritersByFormatName("jpeg").next();
        writer.setOutput(ios);

        javax.imageio.plugins.jpeg.JPEGImageWriteParam params = new javax.imageio.plugins.jpeg.JPEGImageWriteParam(null);
        params.setCompressionMode(javax.imageio.ImageWriteParam.MODE_EXPLICIT);
        params.setCompressionQuality(quality);

        writer.write(null, new javax.imageio.IIOImage(resized, null, null), params);
        writer.dispose();
        ios.close();

        return baos.toByteArray();
    }
}
