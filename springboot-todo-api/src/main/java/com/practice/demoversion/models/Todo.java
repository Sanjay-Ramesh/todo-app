package com.practice.demoversion.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    @NotNull
    @Schema(name = "title", example = "Todo Title")
    private String title;
    @NotBlank
    @NotNull
    @Size(min = 5, max = 100)
    private String description;
    private Boolean isCompleted;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}