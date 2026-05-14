package com.digeshwar.foodiesapi.service;

import com.digeshwar.foodiesapi.entity.CartEntity;
import com.digeshwar.foodiesapi.io.CartRequest;
import com.digeshwar.foodiesapi.io.CartResponse;
import com.digeshwar.foodiesapi.repository.CartRespository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRespository cartRespository;
    private final UserService userService;
    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRespository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));
        Map<String, Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cart.setItems(cartItems);
        cart = cartRespository.save(cart);
        return convertToResponse(cart);
    }


    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRespository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(null, loggedInUserId, new HashMap<>()));
        return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUserId();
        cartRespository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRespository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found"));
        Map<String, Integer> cartItems = entity.getItems();
        if (cartItems.containsKey(cartRequest.getFoodId())) {
            int currentQty = cartItems.get(cartRequest.getFoodId());
            if (currentQty > 0) {
                cartItems.put(cartRequest.getFoodId(), currentQty - 1);
            } else {
                cartItems.remove(cartRequest.getFoodId());
            }
            entity = cartRespository.save(entity);
        }
        return convertToResponse(entity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity) {
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }


    @Override
    public CartResponse removeWholeItemFromCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRespository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Map<String, Integer> cartItems = entity.getItems();

        String foodId = request.getFoodId();

        if (cartItems.containsKey(foodId)) {
            cartItems.remove(foodId);  // 🟢 Remove entire item
        }

        entity.setItems(cartItems);  // update entity with modified items
        entity = cartRespository.save(entity);  // Save updated cart

        return convertToResponse(entity);
    }


}
