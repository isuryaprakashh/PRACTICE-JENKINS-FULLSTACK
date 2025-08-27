package com.jenkins.service;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jenkins.model.User;
import com.jenkins.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService 
{
	@Autowired
	private UserRepository repository;
	
	public String addUser(User user) {
		repository.save(user);
		return "User Added Successfully";
	}

//	@Override
//	public String updateUser(User user) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public String deleteUser(int uid) {
		Optional<User> obj = repository.findById(uid);
		if(obj.isPresent())
		{
			User u = obj.get();
			repository.delete(u);
			return "User Deleted Successfully";
			
		}
		return "User ID Not Found";
	}

	@Override
	public List<User> displayUsers() {
		
		return repository.findAll();
	}

	@Override
	public User displayUserbyId(int uid) {
		
		return repository.findById(uid).orElse(null);
	}
	
}
