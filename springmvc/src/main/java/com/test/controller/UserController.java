package com.test.controller;

import com.test.entity.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.test.dao.UserDao;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {


    @RequestMapping(value = "/test")
    public ModelAndView user() {
        System.out.println("打印出来");
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("welcome");
        modelAndView.addObject("msg", "hello");

        //List方法
        List<String> list = new ArrayList<String>();
        list.add("a");
        list.add("b");
        list.add("c");
        modelAndView.addObject("booklist", list);


        //map方法

        Map<String, String> map = new HashMap<String, String>();
        map.put("list", "asds");
        map.put("wocao", "哦哦哦啊");
        modelAndView.addObject("map", map);
        return modelAndView;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addStudent(@ModelAttribute("users") UserEntity userEntity, ModelMap modelMap) {
        modelMap.addAttribute("uid", userEntity.getUid());
        modelMap.addAttribute("username", userEntity.getUsername());
        return "asd";
    }

    }





//    @RequestMapping("/user")
//    @ResponseBody
//    public void getUser() {
//        UserDao dao = new UserDao();
//         dao.testGetAllDate();
//        UserEntity userEntity = new UserEntity();
//        userEntity.getUsername();
//    }
//}
