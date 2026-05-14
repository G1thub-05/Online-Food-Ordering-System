//package in.bushansirgur.foodiesapi.service;
//
//import in.bushansirgur.foodiesapi.entity.FoodEntity;
//import in.bushansirgur.foodiesapi.io.FoodRequest;
//import in.bushansirgur.foodiesapi.io.FoodResponse;
//import in.bushansirgur.foodiesapi.repository.FoodRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.server.ResponseStatusException;
//
//// AWS
//import software.amazon.awssdk.core.sync.RequestBody;
//import software.amazon.awssdk.services.s3.S3Client;
//import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
//import software.amazon.awssdk.services.s3.model.PutObjectRequest;
//import software.amazon.awssdk.services.s3.model.PutObjectResponse;

//import java.io.IOException;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//public class FoodServiceImpl implements FoodService{
//
//    @Autowired
//    private S3Client s3Client;
//    @Autowired
//    private FoodRepository foodRepository;
//
//    @Value("${aws.s3.bucketname}")
//    private String bucketName;
//
//    @Override
//    public String uploadFile(MultipartFile file) {
//        String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
//        String key = UUID.randomUUID().toString()+"."+filenameExtension;
//        try {
//            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(key)
//                    .acl("public-read")
//                    .contentType(file.getContentType())
//                    .build();
//            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
//
//            if (response.sdkHttpResponse().isSuccessful()) {
//                return "https://"+bucketName+".s3.amazonaws.com/"+key;
//            } else {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
//            }
//        }catch (IOException ex) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while uploading the file");
//        }
//    }
//
//    @Override
//    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
//        FoodEntity newFoodEntity = convertToEntity(request);
//        String imageUrl = uploadFile(file);
//        newFoodEntity.setImageUrl(imageUrl);
//        newFoodEntity = foodRepository.save(newFoodEntity);
//        return convertToResponse(newFoodEntity);
//    }
//
//    @Override
//    public List<FoodResponse> readFoods() {
//        List<FoodEntity> databaseEntries = foodRepository.findAll();
//        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
//    }
//
//    @Override
//    public FoodResponse readFood(String id) {
//        FoodEntity existingFood = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found for the id:"+id));
//        return convertToResponse(existingFood);
//    }
//
//    @Override
//    public boolean deleteFile(String filename) {
//        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
//                .bucket(bucketName)
//                .key(filename)
//                .build();
//        s3Client.deleteObject(deleteObjectRequest);
//        return true;
//    }
//
//    @Override
//    public void deleteFood(String id) {
//        FoodResponse response = readFood(id);
//        String imageUrl = response.getImageUrl();
//        String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
//        boolean isFileDelete = deleteFile(filename);
//        if (isFileDelete) {
//            foodRepository.deleteById(response.getId());
//        }
//    }
//
//    private FoodEntity convertToEntity(FoodRequest request) {
//        return FoodEntity.builder()
//                .name(request.getName())
//                .description(request.getDescription())
//                .category(request.getCategory())
//                .price(request.getPrice())
//                .build();
//
//    }
//
//    private FoodResponse convertToResponse(FoodEntity entity) {
//        return FoodResponse.builder()
//                .id(entity.getId())
//                .name(entity.getName())
//                .description(entity.getDescription())
//                .category(entity.getCategory())
//                .price(entity.getPrice())
//                .imageUrl(entity.getImageUrl())
//                .build();
//    }
//}



package com.digeshwar.foodiesapi.service;
// Cloudinary
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.util.Map;

import com.digeshwar.foodiesapi.entity.FoodEntity;
import com.digeshwar.foodiesapi.io.FoodRequest;
import com.digeshwar.foodiesapi.io.FoodResponse;
import com.digeshwar.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {

        try {

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
//                    ObjectUtils.emptyMap()
                    ObjectUtils.asMap(
                            "folder", "OnlineFoodOrderingSystem"
                    )
            );

            return uploadResult.get("secure_url").toString();

        } catch (IOException ex) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "File upload failed"
            );
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);

        String imageUrl = uploadFile(file);

        newFoodEntity.setImageUrl(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {

        List<FoodEntity> databaseEntries = foodRepository.findAll();

        return databaseEntries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {

        FoodEntity existingFood = foodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Food not found for id: " + id));

        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String imageUrl) {

        try {

            String publicId = imageUrl.substring(
                    imageUrl.lastIndexOf("/") + 1,
                    imageUrl.lastIndexOf(".")
            );

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.emptyMap()
            );

            return true;

        } catch (Exception ex) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "File delete failed"
            );
        }
    }

    @Override
    public void deleteFood(String id) {

        FoodResponse response = readFood(id);

        deleteFile(response.getImageUrl());

        foodRepository.deleteById(response.getId());
    }

    private FoodEntity convertToEntity(FoodRequest request) {

        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {

        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}