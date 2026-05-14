package com.digeshwar.foodiesapi.service;

import com.digeshwar.foodiesapi.io.CartRequest;
import com.digeshwar.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();
    CartResponse removeWholeItemFromCart(CartRequest request);


    CartResponse removeFromCart(CartRequest cartRequest);


}

