package com.practice.demoversion.service;

import com.practice.demoversion.models.User;
import com.practice.demoversion.repository.TodoRepository;
import com.practice.demoversion.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Runtime Error"));
    }

    public List<Todo> getAllTodos(User user) {
        return todoRepository.findByUser(user);
    }

   public Page<Todo> getAllTodosByPage(int page, int size, User user) {
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findByUser(user, pageable);
    }



    public Todo updateTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteTodoById(Long id){
        todoRepository.delete(getTodoById(id));
    }

    public void deleteTodo(Todo todo){
        todoRepository.delete(todo);
    }
}