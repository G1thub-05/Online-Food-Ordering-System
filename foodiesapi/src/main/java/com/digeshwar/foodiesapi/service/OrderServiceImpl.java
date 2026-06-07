package com.digeshwar.foodiesapi.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.digeshwar.foodiesapi.entity.OrderEntity;
import com.digeshwar.foodiesapi.io.OrderRequest;
import com.digeshwar.foodiesapi.io.OrderResponse;
import com.digeshwar.foodiesapi.repository.CartRespository;
import com.digeshwar.foodiesapi.repository.OrderRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import java.math.BigDecimal;
import java.math.RoundingMode;
import com.digeshwar.foodiesapi.entity.FoodEntity;
import com.digeshwar.foodiesapi.repository.FoodRepository;


@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CartRespository cartRespository;

    @Autowired
    private FoodRepository foodRepository;

    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;
    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {
        OrderEntity newOrder = convertToEntity(request);
        newOrder = orderRepository.save(newOrder);


        //create razorpay payment order
        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();


        // Use BigDecimal for accurate amount conversion
        System.out.println("💰 Amount received in backend: " + newOrder.getAmount());
        BigDecimal rupees = BigDecimal.valueOf(newOrder.getAmount()); // e.g., 499.99
        BigDecimal paise = rupees.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP); // 49999
        orderRequest.put("amount", paise.intValue()); // must be integer
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
        //newOrder.setAmount(razorpayOrder.get("amount"));
        String loggedInUserId = userService.findByUserId();
        newOrder.setUserId(loggedInUserId);
        newOrder = orderRepository.save(newOrder);
        OrderResponse responseJson = convertToResponse(newOrder);
        System.out.println("🔁 Returning Razorpay order: " + responseJson);
        return convertToResponse(newOrder);
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        OrderEntity existingOrder = orderRepository
                .findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setPaymentStatus(status);
        existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
        existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));

        if ("paid".equalsIgnoreCase(status)) {
            existingOrder.setOrderStatus("Food Preparing");
            cartRespository.deleteByUserId(existingOrder.getUserId());
        }
        orderRepository.save(existingOrder);
    }

    @Override
    public List<OrderResponse> getUserOrders() {
        String loggedInUserId = userService.findByUserId();
//        List<OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
        List<OrderEntity> list = orderRepository.findByUserIdAndPaymentStatus(loggedInUserId, "paid");
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }


    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {
        List<OrderEntity> list = orderRepository.findAll();
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        // Allowed statuses (must match frontend dropdown)
        List<String> allowedStatuses = List.of(
                "Food Preparing",
                "Out for delivery",
                "Delivered",
                "Cancelled"
        );

        // Validate input status
        if (!allowedStatuses.contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status +
                    ". Allowed statuses are: " + allowedStatuses);
        }

        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Prevent updating a cancelled order
        if ("Cancelled".equalsIgnoreCase(entity.getOrderStatus())) {
            throw new IllegalStateException("Cannot update a cancelled order.");
        }

        entity.setOrderStatus(status);
        orderRepository.save(entity);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .id(newOrder.getId())
                .amount(newOrder.getAmount())
                .userAddress(newOrder.getUserAddress())
                .userId(newOrder.getUserId())
                .razorpayOrderId(newOrder.getRazorpayOrderId())
                .paymentStatus(newOrder.getPaymentStatus())
                .orderStatus(newOrder.getOrderStatus())
                .email(newOrder.getEmail())
                .phoneNumber(newOrder.getPhoneNumber())
                .orderedItems(newOrder.getOrderedItems())
                .build();
    }
    private OrderEntity convertToEntity(OrderRequest request) {

        double totalAmount = 0;
        for (var item : request.getOrderedItems()) {
            FoodEntity food = foodRepository.findById(item.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found"));
            totalAmount += food.getPrice() * item.getQuantity();
        }

        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(totalAmount)
                .orderedItems(request.getOrderedItems())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
//                .orderStatus(request.getOrderStatus())
                .orderStatus("Pending Payment")
                .paymentStatus("unpaid")
                .build();
    }
}
