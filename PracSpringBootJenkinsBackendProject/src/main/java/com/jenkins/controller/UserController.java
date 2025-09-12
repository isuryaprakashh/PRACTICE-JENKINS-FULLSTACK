package com.jenkins.controller;

import java.util.List;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.jenkins.model.User;
import com.jenkins.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController 
{
	@Autowired
	private UserService service;
	
	@GetMapping("/")
	public String home()
	{
		return "This is Home Page";
	}
	
	
	@PostMapping("/add")
	public String addUser(@RequestBody User u)
	{
		return service.addUser(u);
	}
	
	@DeleteMapping("/delete/{uid}")
	public String deleteUser(@PathVariable int uid)
	{
		return service.deleteUser(uid);
	}
	
	@GetMapping("/viewall")
	public List<User> displayUsers()
	{
		return service.displayUsers();
	}
	
	@PutMapping("/update/{id}")
	public String updateUser(@PathVariable int id,@RequestBody User u)
	{
		u.setId(id);
		return service.updateUser(u);
	}
	
	@GetMapping("display/{uid}")
	public ResponseEntity<?> displayUserById(@PathVariable int uid)
	{
		User u = service.displayUserbyId(uid);
		if(u!=null)
		{
			return ResponseEntity.ok(u);
		}
		else
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID Not Found");
		}
	}
	
}
