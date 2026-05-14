package com.digeshwar.foodiesapi.controller;




import com.digeshwar.foodiesapi.entity.OrderEntity;
import com.digeshwar.foodiesapi.repository.OrderRepository;

import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.http.ResponseEntity;



import com.razorpay.RazorpayException;
import com.digeshwar.foodiesapi.io.OrderRequest;
import com.digeshwar.foodiesapi.io.OrderResponse;
import com.digeshwar.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;
        private final OrderRepository orderRepository;  // ✅ Injected correctly

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws RazorpayException {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }

    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String, String> paymentData) {
        orderService.verifyPayment(paymentData, "Paid");
    }

    @GetMapping
    public List<OrderResponse> getOrders() {
        return orderService.getUserOrders();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) {
        orderService.removeOrder(orderId);
    }

    //admin panel
    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers() {
        return orderService.getOrdersOfAllUsers();
    }

    //admin panel
//    @PatchMapping("/status/{orderId}")
//    public void updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
//        orderService.updateOrderStatus(orderId, status);
//    }

    @PatchMapping("/status/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        try {
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Order status updated successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }





    // @GetMapping("/razorpay/{razorpayOrderId}")
    // public OrderResponse getOrderByRazorpayOrderId(@PathVariable String razorpayOrderId) {
    //     return orderService.getOrderByRazorpayOrderId(razorpayOrderId);
    // }


 @PatchMapping("/{orderId}/cancel")
 public ResponseEntity<String> cancelOrder(@PathVariable String orderId) {
     try {
         System.out.println(orderId);
         Optional<OrderEntity> orderOptional = orderRepository.findById(orderId);
         if (orderOptional.isPresent()) {
             OrderEntity order = orderOptional.get();

             if ("Delivered".equalsIgnoreCase(order.getOrderStatus())) {
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body("Cannot cancel a delivered order.");
             }

             order.setOrderStatus("Cancelled");
             orderRepository.save(order);

             return ResponseEntity.ok("Order cancelled successfully.");
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
         }
     } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                 .body("Error: " + e.getMessage());
     }
 }

}
