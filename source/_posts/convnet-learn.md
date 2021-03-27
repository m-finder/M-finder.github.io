---
title: 卷积神经网络学习
date: 2019-04-18 23:59:59
tags: [keras, python]
categories: 码不能停
---


卷积神经网络，计算机视觉应用几乎都在使用的一种深度学习模型。

一般用于训练数据集较小的问题，比如图像分类。


![](/images/cover.gif)
<!-- more -->
#### 简介
卷积神经网络是一种多层神经网络，主要由输入层，卷积层，激励函数，池化层和全连接层组成，可以通过一系列方法，成功将数据量庞大的图片识别问题不断降维，最终使其能够被训练。

###### 输入层
即数据的输入。

通过传入参数 `input_shape=(28, 28, 1)` 来设置网络接收张量的形状。

###### 卷积层
使用卷积核来进行特征提取和特征映射。

当我们输入的图像是 28 * 28 * 1 ，定义一个 3 * 3 的卷积核来对图像进行卷积操作（可以理解为一个滑动窗口，把卷积核与对应的图像像素做乘积然后求和），得到了 3 * 3 的卷积结果。

这个过程我们可以理解为我们使用一个过滤器（卷积核）来过滤图像的各个小区域，从而得到这些小区域的特征值。

![](/images/conv.gif)

###### 激励层
激励层主要对卷积层的输出进行一个非线性映射，因为卷积层的计算还是一种线性计算。

使用的激励函数一般是 ReLu。

卷积层和激励层一般合并在一起成为“卷积层”。

###### 池化层
其实就是下采样。一般在卷积层后边，通过池化来压缩卷积层输出的特征向量，使特征图变小，简化网络计算复杂度，同时改善结果。

###### 全连接层
在这里的作用由提取特征变成了分类。

#### 实例化网络
实例化一个简单的卷积神经网络模型。
```python
from keras import layers
from keras import models

model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))

print(model.summary())
```

运行结果如下：
```log
_________________________________________________________________
Layer (type)                 Output Shape              Param #
=================================================================
conv2d_1 (Conv2D)            (None, 26, 26, 32)        320
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 13, 13, 32)        0
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 11, 11, 64)        18496
_________________________________________________________________
max_pooling2d_2 (MaxPooling2 (None, 5, 5, 64)          0
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 3, 3, 64)          36928
=================================================================
Total params: 55,744
Trainable params: 55,744
Non-trainable params: 0
_________________________________________________________________
None
```


首先是网络层设置，这里是 5 层神经网络。

添加第一个卷积层，滤波器数量是 32，卷积窗口大小是 3 * 3，strides 指卷积沿高度和宽度的步幅，默认（1, 1），padding 是指卷积窗口滑动的方式，两个参数：默认 VALID 和 SAME，SAME 采用的是补全，即宽度不够时先补 0 再滑动，VALID 则直接丢弃多余的元素，激励函数选择 relu。因为是第一层，所以需要说明输入数据的 shape。


第一层 pooling（池化，下采样），将数据分辨率长宽各降低一半。

然后再继续添加，接下来把最后输出张量 （3， 3， 64）展平输入到一个全连接层。

#### 添加全连接层分类器
```python
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))
```
继续打印,查看模型结构：

```log
flatten_1 (Flatten)          (None, 576)               0
_________________________________________________________________
dense_1 (Dense)              (None, 64)                36928
_________________________________________________________________
dense_2 (Dense)              (None, 10)                650
```
可以看到数据再丢入分类器之前被展平成了一维 (None, 576)


#### 训练网络

```python
from keras.datasets import mnist
from keras.utils import to_categorical
(train_images, train_labels), (test_images, test_labels) = mnist.load_data()
train_images = train_images.reshape((60000, 28, 28, 1))
train_images = train_images.astype('float32') / 255
test_images = test_images.reshape((10000, 28, 28, 1))
test_images = test_images.astype('float32') / 255
train_labels = to_categorical(train_labels)
test_labels = to_categorical(test_labels)

model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=5, batch_size=64)

test_loss, test_acc = model.evaluate(test_images, test_labels)

print(test_acc)
```

先通过张量变形格式化数据， 然后配置学习过程，开始训练。

![](/images/keras-res.png)
最后打印结果可以看到精度为 0.9913 ，比之前的神经网络精度高了很多。
