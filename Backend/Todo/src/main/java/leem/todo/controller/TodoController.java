package leem.todo.controller;

import leem.todo.ENUMS.Priority;
import leem.todo.ENUMS.Status;
import leem.todo.model.Todo;
import leem.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
        return ResponseEntity.created(URI.create("/todos/" + todo.getId())).body(todoService.createTodo(todo));
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok().body(todoService.getAllTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable(value = "id") int id) {
        return ResponseEntity.ok().body(todoService.getTodoById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Todo>> getTodosByStatus(@PathVariable(value = "status") Status status) {
        return ResponseEntity.ok().body(todoService.getTodosByStatus(status));
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable(value = "priority") Priority priority) {
        return ResponseEntity.ok().body(todoService.getTodosByPriority(priority));
    }

    @GetMapping("/non-expired")
    public ResponseEntity<List<Todo>> getTodosByDue() {
        LocalDateTime today = LocalDateTime.now();
        return ResponseEntity.ok().body(todoService.findNonExpiredTodos(today));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Todo>> getOverdueTodos() {
        LocalDateTime today = LocalDateTime.now();
        return ResponseEntity.ok().body(todoService.getOverdueTodos(today));
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Todo>> getTodosByTag(@PathVariable(value = "tag") String tag) {
        return ResponseEntity.ok().body(todoService.getTodosByTag(tag));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTodoById(@RequestParam(value = "id") int id) {
       return ResponseEntity.ok().body(todoService.deleteTodo(id));
    }

    @PutMapping
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo) {
        return ResponseEntity.ok().body(todoService.updateTodoById(todo.getId(), todo));
    }
}
