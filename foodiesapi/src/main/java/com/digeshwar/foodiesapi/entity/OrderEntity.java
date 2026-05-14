package com.digeshwar.foodiesapi.entity;

import com.digeshwar.foodiesapi.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {
    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderedItems;
    private double amount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String razorpaySignature;
    private String razorpayPaymentId;
    private String orderStatus;

    public void setOrderStatus(String orderStatus) {
         this.orderStatus = orderStatus;
     }

     public String getOrderStatus() {
         return orderStatus;
     }
}
