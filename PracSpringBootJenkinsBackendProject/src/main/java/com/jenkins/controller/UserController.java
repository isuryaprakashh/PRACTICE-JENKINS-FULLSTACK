package com.jenkins.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping
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
	
	@GetMapping("/display")
	public List<User> displayUsers()
	{
		return service.displayUsers();
	}
	
}
