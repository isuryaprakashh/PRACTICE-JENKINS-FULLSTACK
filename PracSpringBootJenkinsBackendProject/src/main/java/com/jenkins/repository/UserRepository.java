package com.jenkins.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jenkins.model.User;

public interface UserRepository extends JpaRepository<User, Integer>
{
	
}
