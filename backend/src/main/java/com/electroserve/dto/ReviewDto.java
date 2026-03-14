package com.electroserve.dto;

public class ReviewDto {
    private Long electricianId;
    private Integer rating;
    private String comment;

    public Long getElectricianId() { return electricianId; }
    public void setElectricianId(Long electricianId) { this.electricianId = electricianId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
