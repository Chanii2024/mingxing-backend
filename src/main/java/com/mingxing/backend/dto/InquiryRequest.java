package com.mingxing.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class InquiryRequest {
    private String name;
    private String email;
    private String message;
    private List<CartItem> cart;

    @Data
    public static class CartItem {
        private String name;
        private String price;
        private int quantity;
        private Integer productId;
        private String color;
    }

}
