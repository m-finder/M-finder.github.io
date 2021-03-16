---
title: SpringCloud入门七-使用Mybatis连接调用Mysql
date: 2018-05-25 09:04:48
tags: [Java,SpringCloud]
categories: 码不能停
---

#### 前言
这两天开始尝试用 spring cloud 来重构公司的应用，所以就一边摸索一边做个记录，预防以后再次踩坑。
![](/Spring-Cloud-Mysql/java.jpg)
<!--more-->

#### 注意事项
<font color=red>注解很重要！！！</font>
```
PS C:\www\mzpay-test\pay-main\src\main\java> tree /f
卷 OS 的文件夹 PATH 列表
卷序列号为 44A4-7E6B
C:.
└─com
    └─mzpay
        └─paymain
            │  PayMainApplication.java
            │
            ├─impl
            │      OrderServiceImpl.java
            │
            ├─mapper
            │      OrderMapper.java
            │      OrderMapper.xml
            │
            ├─model
            │      Order.java
            │
            └─service
                    OrderService.java
```
作为萌新真是踩坑踩到惨不忍睹！

#### 新建项目
新建项目，勾选需要的mysql,mybaties，jdbc等组件

##### 配置
填写配置文件：
```
server.port=8070
spring.application.name=paytest

#mysql 配置
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.1.51:3306/test_wu?characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=root123
```

pom.xml的build中添加以下代码:
```
<resources>
    <resource>
        <directory>src/main/java</directory>
        <includes>
            <include>**/*.properties</include>
            <include>**/*.xml</include>
        </includes>
        <filtering>false</filtering>
    </resource>
</resources>
```
<font color=red>注：一定要加，否则mapper的映射关系会丢失</font>

##### model
新建model包和model文件夹下的Order：
```
private int id;
private String shopNo;
private int channelId;
```

然后右键，选择Generate->getter and setter,生成相应代码。

##### mapper
新建mapper包和mapper文件夹下的OrderMapper.xml和OrderMapper.java两个文件，java文件类型为 interface:
```
@Repository
public interface OrderMapper {
    Order getOrderById(@Param("id")int id);
}
```

xml:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.mzpay.mapper.OrderMapper">
    <select id="getOrderById" parameterType="int" resultType="com.mzpay.model.Order">
        select * from tc_order where id = #{id}
    </select>
</mapper>
```

<font color=red>
注：resultType一定要写全包名。
application中还要再添加注解来加载mapper:'@MapperScan("com.mzpay.mapper.**")'，这个也是一定要加，否则一样会映射关系丢失
</font>

##### service
新建service包和service包下的OrderService：
```
public interface OrderService {
     Order getOrderById(int id);
}
```

##### impl
新建impl包和impl包下OrderServiceImpl：
```
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper OrderMapper;

    @Override
    public Order getOrderById(int id){
        return OrderMapper.getOrderById(id);
    }
}
```

##### controller
新建controller:
```
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping("/getorder")
    public Order getOrderById(int id){
        System.out.println("id is " + id);
        return orderService.getOrderById(id);
    }
}
```

<font color=red>注：如果控制器和application不是同层，还要在application中添加注解'@ComponentScan("xxx包目录")'，否则新建的controller是访问不到的。</font>

#### 结果
打开浏览器，访问 localhost:8070/getorder?id=104576553，结果如下：
![结果](/Spring-Cloud-Mysql/res.png)

ok，这算是把坑踩完了。
