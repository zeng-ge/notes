1. android.intent.action.GET_CONTENT // Intent.GET_CONTENT 选择文件
```kotlin
val intent:Intent = Intent(Intent.ACTION_GET_CONTENT)
intent.setType("image/*")，设置文件类型为图片
startActivityForResult(intent, 100)
```
2. MediaStore.ACTION_IMAGE_CAPTURE //android.media.action.IMAGE_CAPTURE 拍照

