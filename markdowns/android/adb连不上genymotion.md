> android Q 的adb无法识别默认的5555端口，需要手动连接

1. 打开genymotion shell, 输入devices list，查看genymotion 虚拟机IP
2. 手动连接, adb connect ip:5555
3. adb devices就能看到了