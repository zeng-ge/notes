## ContentResolver

### URI
> 读取内容提供者的数据需要根据URI来定位数据
```
由三部分组成：
1) content//
2) app包名+.provider
3) 表名
content//com.example.session.provider/books

var uri:URI = Uri.parse("content//com.example.session.provider/books")

getContentResolver(uri, projection, selection, selectionArgs, orderBy)
```

### 权限申请
> 读取一些数据时是要申请权限的，比如联系人, android 6.0之前只需要在manifest.xml里面配置权限，6.0之后，除了在manifest.mxl里配置，还需要动态申请权限（对于危险权限）

9组危险权限（它们都对象着几个读写权限，申请一个实际上是申请一组）：
1. 日历                 calendar
2. 联系人               contacts
3. 位置                 location
4. 文件存储             storage
5. 传感器               sensor
6. microphone (录音)    microphone
7. 短信                 sms
8. 打电话               phone
9. 摄象头               camera


## ContentProvider
```
在manifest.xml配上authorities(uri的中间部分):
<provider
    android:authorities="com.example.session.student.provider"
    android:name=".providers.StudentProvider" //类名
    android:exported="true"
    android:enabled="true"></provider>

获取resolver并查询：
getContentResolver().query("content//com.example.session.student.provider/Student")

继承ContentProvider，实现增、删、改查、及oncreate、getType 6个方法
package com.example.session.providers

class StudentProvider : ContentProvider() {
    lateinit var db: SQLiteUtils;
    override fun onCreate(): Boolean {
        db = SQLiteUtils(context, "student.db", null, 1)
        return true
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? {
        db.writableDatabase.insert("Student", null, values)
        return uri
    }

    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<String>?): Int {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<String>?): Int {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun query(uri: Uri, projection: Array<String>?, selection: String?, selectionArgs: Array<String>?, sortOrder: String?): Cursor? {
        return db.readableDatabase.query("Student", null, null, null, null, null, null)
    }

    override fun getType(uri: Uri): String? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
```