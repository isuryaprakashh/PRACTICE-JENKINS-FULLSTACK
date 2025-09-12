package com.jenkins.service;

import java.util.List;

import com.jenkins.model.User;

public interface UserService 
{
	public String addUser(User user);
	public String updateUser(User user);
	public String deleteUser(int uid);
	public List<User> displayUsers();
	public User displayUserbyId(int uid);
}
