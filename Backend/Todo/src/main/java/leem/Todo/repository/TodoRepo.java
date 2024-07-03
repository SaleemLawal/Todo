package leem.Todo.repository;

import leem.Todo.ENUMS.Priority;
import leem.Todo.ENUMS.Status;
import leem.Todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodoRepo extends JpaRepository<Todo, Integer> {
    @Query("select u from Todo u where u.status = :status")
    List<Todo> findByStatus(@Param("status") Status status);

    @Query("select u from Todo u where u.priority = :priority")
    List<Todo> findByPriority(@Param("priority") Priority priority);

    @Query("select u from Todo u where u.dueDate > :currDate")
    List<Todo> findNonExpiredTodos(LocalDateTime currDate);

    @Query("select u from Todo u where u.dueDate <= :specifiedDate")
    List<Todo> getOverdueTodos(@Param("specifiedDate") LocalDateTime specifiedDate);

    @Query("SELECT t FROM Todo t JOIN t.tags tag WHERE tag = :tag")
    List<Todo> findByTag(@Param("tag") String tag);
}
