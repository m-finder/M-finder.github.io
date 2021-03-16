---
title: Java 爬坑手册
date: 2017-09-11 09:34:08
tags: Java
categories: 码不能停
---

初学 java 时的爬坑记录。

![java](/Java-setting/java.jpg)
<!--more-->
### 环境搭建

下载 JDK
百度下就有下载地址 ， 但是最好还是根据自己的电脑系统位数下载对应版本 。

### 配置系统变量

变量名：JAVA_HOME
变量值：C:\Program Files (x86)\Java\jdk1.8.0_91 // 要根据自己的实际路径配置
变量名：CLASSPATH
变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar; //记得前面有个"." 
变量名：Path
变量值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

CLASSPATH 和 Path 需要填写上边 java_home 的实际路径 ， 即 %JAVA_HOME% 的实际路径。

### 编辑器

NetBeans 8.2 or IntelliJ IDEA 2017.2.3

IDEA 激活listen地址 : [http://intellij.mandroid.cn/ ](http://intellij.mandroid.cn/ )

NetBeans 8.2 无法创建 javaweb 项目 

在 NetBeans 安装目录下 , 例如 : C:\Program Files\NetBeans 8.2\etc 文件夹下

netbeans.conf 文件中 , 搜索 jdkhome , 然后修改为当前安装的 jdk 路径 , 保存 , 重启编辑器即可。

### 服务器

tomcat or jetty

netbeans 安装时可以指定服务器

需要注意的是 tomcat 的配置文件会有两个，因此改配置时需要改编辑器文件夹下的文件才能生效

jetty 用于 IDEA，单独安装 ，在运行的小箭头后边可以添加使用

运行测试  -- 以 netbeans 为例
新建项目 -- > 选择 java web , 然后填写项目信息 ， 然后选择 服务器和框架 
![新建项目](/Java-setting/2017-09-11-06-47-49-59b6319546a9d.png)
![勾选框架](/Java-setting/2017-09-11-06-47-57-59b6319d00ec4.png)

在 src / java 下新建包 net.controller ,然后新建类 HelloWorld 

```java
package net.controller;

import java.util.List;
import javax.annotation.Resource;
import net.model.Users;
import net.service.UsersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorld {

    @Resource
    private UsersService usersService;
    
    @RequestMapping(value = "hello")
    public ModelAndView hello() {
        ModelAndView modelAndView = new ModelAndView();
        List user= usersService.findAll();
        Users name = usersService.findById(1);
        modelAndView.getModel().put("name", name);
        modelAndView.addObject("userlist", user);
        
        Boolean dele = usersService.deleteUserById(2);
        modelAndView.getModel().put("delete", dele);
        return modelAndView;
    }
}
```

然后在 dispatcher-servlet 里添加
```
<context:component-scan base-package="net.controller,net.model,net.mapper,net.service"> //动态装载
    <mvc:annotation-driven> //mvc支持
    
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver">
        <property name="url" value="jdbc:mysql://localhost:3306/mblog">
        <property name="username" value="root">
        <property name="password" value="root">
    </property></property></property></property></bean>
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"></property>
        <property name="configLocation" value="/WEB-INF/mybatis-config.xml">
    </property></bean>
    
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="net.mapper"></property>
        <property name="sqlSessionFactory" ref="sqlSessionFactory"></property>
    </bean>
```
### 连接数据库

新建 -- 通过数据库生成实体类
![生成实体类](/Java-setting/2017-09-12-01-32-30-59b7392e52218.png)

需要配置一下数据库连接
![数据库连接](/Java-setting/2017-09-12-01-32-47-59b7393fcc99e.png)
![数据库连接](/Java-setting/2017-09-12-01-32-54-59b7394666f0a.png)
![数据库连接](/Java-setting/2017-09-12-01-33-59-59b739876ffd1.png)

###  新建mapper

在net包下边新建mapper包，然后新建 UsersMapper.java 和 usersMapper.xml 

UserMapper.java:
```
package net.mapper;

import java.util.List;
import net.model.Users;

public interface UsersMapper {

    Users findById(int id);

    List findAll();
    
    Boolean deleteUserById(int id);
    
    Boolean updateUserById(Users User);
}
```

usersMapper.xml :
```
<!--?xml version="1.0" encoding="UTF-8"?-->   
<mapper namespace="net.mapper.UsersMapper">
   
    <select id="findById" parametertype="int" resulttype="Users">
        select * from users where id = #{id}
    </select>
    
    <select id="findAll" resulttype="Users">
        select * from users
    </select>
    
    <delete id="deleteUserById" parametertype="int">
        delete from users where id = #{id}
    </delete>

    <update id="updateUserById" parametertype="User">  
        update users set name=#{name} where id=#{id}
    </update>  
    
</mapper>
```


### 新建service
新建UsersService.java 和 UsersServiceImpl.java

UsersService.java：
```
package net.service;

import java.util.List;
import net.model.Users;

public interface UsersService {
    public Users findById(int id);
    
    public List findAll();
    
    public Boolean deleteUserById(int id);
    
    public Boolean updateUserById(Users User);
}
```

UsersServiceImpl.java:
```
package net.service;

import java.util.List;
import net.mapper.UsersMapper;
import net.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements UsersService{

    @Autowired
    private UsersMapper usersMapper;
    
    @Override
    public Users findById(int id) {
        return usersMapper.findById(id);
    }

    @Override
    public List findAll() {
        return usersMapper.findAll();
    }

    @Override
    public Boolean deleteUserById(int id) {
        return usersMapper.deleteUserById(id);
    }

    @Override
    public Boolean updateUserById(Users User) {
        return usersMapper.updateUserById(User);
    }
    
}
```

再新建配置文件 mybatis-config.xml ：
```
<!--?xml version="1.0" encoding="UTF-8"?-->  
  
<configuration>  
  
    <typealiases>  
        <typealias alias="Users" type="net.model.Users">  
    </typealias></typealiases>  
    <mappers>  
        <mapper resource="net/mapper/usersMapper.xml">  
    </mapper></mappers>  
  
</configuration>   
```

然后hello.jsp 中调用数据 ：
```
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome to Spring Web MVC project</title>
<p>Hello! ${name}.</p>
<p>${delete}</p>
<h1>Hello ${name.getName()}!</h1>
<c:foreach items="${userlist}" var="node">
    <c:out value="${node.getName()}"></c:out><br>
</c:foreach>
 ```

2017/9/14 14：21 --  更新张截图，最后成功时所引入的包
![包](/Java-爬坑手册/2017-09-14-06-22-41-59ba2031b01c2.png)

如果出现 Could not get JDBC Connection; nested exception is com.mysql.jdbc.exceptions 这个报错
请检查你的 mysql 是否能够正常连接