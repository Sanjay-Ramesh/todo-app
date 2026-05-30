package com.practice.demoversion.repository;

import com.practice.demoversion.models.Todo;
import com.practice.demoversion.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);
    Page<Todo> findByUser(User user, Pageable pageable);
}
