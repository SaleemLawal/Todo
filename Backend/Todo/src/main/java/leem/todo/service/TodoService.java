package leem.todo.service;

import jakarta.transaction.Transactional;
import leem.todo.ENUMS.Priority;
import leem.todo.ENUMS.Status;
import leem.todo.model.Todo;
import leem.todo.repository.TodoRepo;
import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
// @Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TodoService {
    public final TodoRepo todoRepo;

    public Todo createTodo(Todo todo) {
        return todoRepo.save(todo);
    }

    public Todo getTodoById(int id) {
        return todoRepo.findById(id)
                .orElse(null);
    }

    public List<Todo> getAllTodos(){
        return todoRepo.findAll().stream()
                .sorted(Comparator.comparing(Todo::getPriority))
                .collect(Collectors.toList()).reversed();
    }

    public List<Todo> getTodosByStatus(Status status){
        return todoRepo.findByStatus(status);
    }
    public Todo updateTodoById(int id, Todo todo) {
        Optional<Todo> optionalTodo = todoRepo.findById(id);

        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();

            existingTodo.setName(todo.getName());
            existingTodo.setDescription(todo.getDescription());

            existingTodo.setPriority(todo.getPriority());
            existingTodo.setStatus(todo.getStatus());

            existingTodo.setDueDate(todo.getDueDate());

            existingTodo.setCompleted(todo.getCompleted());

            todoRepo.save(existingTodo);
            return existingTodo;
        }else{
            return null;
        }
    }

    public String deleteTodo(int id) {
        todoRepo.deleteById(id);
        return "Deleted Todo with id" + id;
    }
    public List<Todo> getTodosByPriority(Priority priority){
        return todoRepo.findByPriority(priority).stream()
                .sorted(Comparator.comparing(Todo::getPriority))
                .collect(Collectors.toList()).reversed();
    }

    public List<Todo> findNonExpiredTodos(LocalDateTime date){
            return todoRepo.findNonExpiredTodos(date).stream()
                    .sorted(Comparator.comparing(Todo::getPriority))
                    .collect(Collectors.toList()).reversed();
    }

    public List<Todo> getOverdueTodos(LocalDateTime date){
            return todoRepo.getOverdueTodos(date).stream()
                    .sorted(Comparator.comparing(Todo::getPriority))
                    .collect(Collectors.toList()).reversed();
    }

    public List<Todo> getTodosByTag(String tag) {
        return todoRepo.findByTag(tag);
    }
}
