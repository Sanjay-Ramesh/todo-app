package com.practice.demoversion.controller;

import com.practice.demoversion.models.User;
import com.practice.demoversion.repository.UserRepository;
import com.practice.demoversion.service.TodoService;
import com.practice.demoversion.models.Todo;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todo")

public class TodoController {
    @Autowired
    private TodoService todoService;

    @Autowired
    private UserRepository userRepository;

    /*Request Body is used for password like stuffs which does not show
     publicly like RequestParam*/
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Todo Retrieved Successfully"),
            @ApiResponse(responseCode = "404", description = "Not found")
    })
    @GetMapping("/{id}")
    ResponseEntity<Todo> getTodoById(@PathVariable long id) {
        try {
            Todo getTodo = todoService.getTodoById(id);
            return new ResponseEntity<>(getTodo, HttpStatus.OK);
        } catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    ResponseEntity<Todo> createUser(@RequestBody Todo todo){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        todo.setUser(user);
        return new ResponseEntity<>(todoService.createTodo(todo), HttpStatus.CREATED);
    }

    @GetMapping
    ResponseEntity<List<Todo>> getAllTodos() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return new ResponseEntity<List<Todo>>(todoService.getAllTodos(user), HttpStatus.OK);
    }

    @GetMapping("/page")
    ResponseEntity<Page<Todo>> getPage(@RequestParam int page, @RequestParam int size) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return new ResponseEntity<>(todoService.getAllTodosByPage(page, size, user), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<Todo> updateTodo(@RequestBody Todo todo){
        return new ResponseEntity<>(todoService.updateTodo(todo), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteTodoById(@PathVariable long id){
            todoService.deleteTodoById(id);
    }

    @DeleteMapping
    void deleteTodo(@RequestBody Todo todo){
        todoService.deleteTodo(todo);
    }

}
